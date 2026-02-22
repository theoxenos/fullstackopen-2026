import supertest from 'supertest';
import {
    after, beforeEach, describe, test,
} from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../app.js';
import blog from '../models/blog.js';
import helper from './test_helper.js';
import usersHelper from './users_test_helper.js';
import User from '../models/user.js';

const api = supertest(app);

describe('When there\'s any blogs already in db', () => {
    beforeEach(async () => {
        await blog.deleteMany({});
        await blog.insertMany(helper.initialBlogs);
    });

    test('blogs are returned as json', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('all blogs are returned as json', async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test('blog has id instead of _id', async () => {
        const blogs = await api.get('/api/blogs');
        const blogObject = blogs.body[0];
        assert.ok(blogObject.id);
        assert.strictEqual(blogObject._id, undefined);
    });
});

describe('Creating new blog', () => {
    let token;

    const getAuthorizedPost = () => api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`);

    beforeEach(async () => {
        await blog.deleteMany({});
        await User.deleteMany({});

        const { password, ...user } = usersHelper.singleUserForTesting;
        const passwordHash = await bcrypt.hash(password, 10);
        await User.create({ ...user, passwordHash });

        const res = await api
            .post('/api/login')
            .send(usersHelper.singleUserForTesting);
        token = res.body.token;
    });

    test('posting a blog works', async () => {
        const res = await getAuthorizedPost().send({ ...helper.singleBlogForTesting });

        assert.strictEqual(res.status, 201);
        assert.strictEqual(res.body.title, helper.singleBlogForTesting.title);
        assert.strictEqual(res.body.author, helper.singleBlogForTesting.author);
        assert.strictEqual(res.body.url, helper.singleBlogForTesting.url);
        assert.strictEqual(res.body.likes, helper.singleBlogForTesting.likes);

        const beforePostBlogsAmount = 0;
        const currentBlogsAmount = await helper.blogsFromDb();
        assert.equal(beforePostBlogsAmount + 1, currentBlogsAmount.length);
    });

    test('posting a new blog without token returns 401', async () => {
        const blogsBefore = await helper.blogsFromDb();

        await api.post('/api/blogs').send({ ...helper.singleBlogForTesting }).expect(401);

        const blogsAfter = await helper.blogsFromDb();

        assert.deepStrictEqual(blogsBefore, blogsAfter);
    });

    test('missing likes property defaults to 0', async () => {
        const newBlog = { ...helper.singleBlogForTesting };
        delete newBlog.likes;

        const res = await getAuthorizedPost()
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /json/);

        assert.equal(res.body.likes, 0);
    });

    test('Bad request when blogpost request is incomplete', async () => {
        const newBlog = { ...helper.singleBlogForTesting };
        delete newBlog.url;

        await getAuthorizedPost().send(newBlog).expect(400);

        delete newBlog.title;

        await getAuthorizedPost().send(newBlog).expect(400);
    });
});

describe('Deleting blogs', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const usersToInsert = usersHelper.multipleUsersForTesting.map((u) => {
            const {
                password,
                ...user
            } = u;

            const passwordHash = bcrypt.hashSync(password, 10);

            return {
                ...user,
                passwordHash,
            };
        });
        const users = await User.insertMany(usersToInsert);

        await blog.deleteMany({});
        const blogsToInsert = helper.initialBlogs.map((b) => ({
            ...b,
            user: users[Math.floor(Math.random() * users.length)]._id,
        }));
        await blog.insertMany(blogsToInsert);
    });

    test('blogs are deleted', async () => {
        const blogsBeforeDelete = await helper.blogsFromDb();
        const blogToDelete = blogsBeforeDelete[0];
        const blogUser = await User.findById(blogToDelete.user.id);
        const user = usersHelper.multipleUsersForTesting.find(
            (u) => u.username === blogUser.username,
        );
        const { token } = (await api.post('/api/login').send(user)).body;

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);

        const blogsAfterDelete = await helper.blogsFromDb();
        assert(!blogsAfterDelete.find((n) => n.id === blogToDelete.id
            && n.title === blogToDelete.title
            && n.author === blogToDelete.author));

        assert.strictEqual(blogsBeforeDelete.length - 1, blogsAfterDelete.length);
    });

    test('delete request with non existing id gives 404', async () => {
        const nonExistingId = await helper.nonExistingId();
        const blogsBeforeDelete = await helper.blogsFromDb();

        const { token } = (await api.post('/api/login').send(usersHelper.singleUserForTesting)).body;

        await api.delete(`/api/blogs/${nonExistingId}`).set('Authorization', `Bearer ${token}`).expect(404);

        const blogsAfterDelete = await helper.blogsFromDb();
        assert.strictEqual(blogsAfterDelete.length, blogsBeforeDelete.length);
    });
});

describe('Update blogs', () => {
    beforeEach(async () => {
        await blog.deleteMany({});
        await blog.insertMany(helper.initialBlogs);
    });

    test('non existing id returns 404', async () => {
        const nonExistingId = await helper.nonExistingId();

        await api.put(`/api/blogs/${nonExistingId}`).expect(404);
    });

    test('blog is updated', async () => {
        const blogToUpdate = {
            ...helper.singleBlogForTesting,
            id: (await helper.blogsFromDb())[0].id,
        };

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200).expect('Content-Type', /json/);

        const updatedBlog = (await helper.blogsFromDb()).find((b) => b.id === blogToUpdate.id);

        assert.deepStrictEqual(blogToUpdate, updatedBlog);
    });

    test('only likes are updated', async () => {
        const blogFromDb = {
            ...(await helper.blogsFromDb())[0],
            likes: helper.singleBlogForTesting.likes,
        };
        const blogToUpdate = {
            ...helper.singleBlogForTesting,
            id: blogFromDb.id,
        };

        const res = await api.patch(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200).expect('Content-Type', /json/);

        assert.deepStrictEqual(blogFromDb, res.body);
    });
});

after(async () => {
    await mongoose.disconnect();
});
