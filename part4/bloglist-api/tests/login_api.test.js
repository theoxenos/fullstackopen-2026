import supertest from 'supertest';
import {
    after, beforeEach, describe, test,
} from 'node:test';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import assert from 'node:assert';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import usersHelper from './users_test_helper.js';
import User from '../models/user.js';

const api = supertest(app);

describe('Database has users', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const { password, ...user } = usersHelper.singleUserForTesting;
        const passwordHash = await bcrypt.hash(password, 10);
        await User.create({ ...user, passwordHash });
    });

    test('login succeeds with correct credentials', async () => {
        const response = await api
            .post('/api/login')
            .send(usersHelper.singleUserForTesting)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const { token, username, name } = response.body;

        assert(jwt.verify(token, process.env.SECRET));

        assert.deepStrictEqual(name, usersHelper.singleUserForTesting.name);
        assert.deepStrictEqual(username, usersHelper.singleUserForTesting.username);
    });

    test('login fails with wrong credentials', async () => {
        const wrongCredentials = {
            username: usersHelper.singleUserForTesting.username,
            password: 'wrongpassword',
        };

        await api
            .post('/api/login')
            .send(wrongCredentials)
            .expect(401);
    });
});

after(async () => {
    await mongoose.disconnect();
});
