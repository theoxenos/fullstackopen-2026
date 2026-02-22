import supertest from 'supertest';
import {
    after, beforeEach, describe, test,
} from 'node:test';
import mongoose from 'mongoose';
import assert from 'node:assert';
import bcrypt from 'bcrypt';
import app from '../app.js';
import User from '../models/user.js';
import helper from './users_test_helper.js';

const api = supertest(app);

describe('Database already has some users', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const testUser = { ...helper.singleUserForTesting };

        testUser.passwordHash = await bcrypt.hash(testUser.password, 10);
        delete testUser.password;

        await User.insertOne(testUser);
    });

    test('Invalid request: missing password', async () => {
        const newUser = {
            name: 'Eurydice',
            username: 'user',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        assert(result.body.error.includes('Password must be at least 3 characters long'));

        const users = await helper.getUsersFromDb();
        const user = users.find((u) => u.name === newUser.name && u.username === newUser.username);

        assert(!user);
    });

    test('Invalid request: missing username', async () => {
        const newUser = {
            name: 'Eurydice',
            password: 'password',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        assert(result.body.error.includes('Username must be at least 3 characters long'));

        const users = await helper.getUsersFromDb();
        const user = users.find((u) => u.name === newUser.name);

        assert(!user);
    });

    test('Invalid request: password too short', async () => {
        const newUser = {
            name: 'Eurydice',
            username: 'user2',
            password: 'pw',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        assert(result.body.error.includes('Password must be at least 3 characters long'));

        const users = await helper.getUsersFromDb();
        const user = users.find((u) => u.username === newUser.username);

        assert(!user);
    });

    test('Invalid request: username too short', async () => {
        const newUser = {
            name: 'Eurydice',
            username: 'us',
            password: 'password',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        assert(result.body.error.includes('Username must be at least 3 characters long'));

        const users = await helper.getUsersFromDb();
        const user = users.find((u) => u.username === newUser.username);

        assert(!user);
    });

    test('Adding existing user returns 400', async () => {
        const usersBefore = await helper.getUsersFromDb();

        const result = await api.post('/api/users').send(helper.singleUserForTesting).expect(400);
        assert(result.body.error.includes('expected `username` to be unique'));

        const usersAfter = await helper.getUsersFromDb();
        const filteredUsers = usersAfter.filter(
            (u) => u.username === helper.singleUserForTesting.username,
        );

        assert.strictEqual(usersAfter.length, usersBefore.length);
        assert.strictEqual(filteredUsers.length, 1);
    });
});

after(async () => {
    await mongoose.disconnect();
});
