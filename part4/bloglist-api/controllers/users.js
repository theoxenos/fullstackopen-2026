import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs');
    res.json(users);
});

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).send({ error: 'Username must be at least 3 characters long' });
    }

    if (!password || password.length < 3) {
        return res.status(400).send({ error: 'Password must be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
        username,
        name,
        passwordHash,
    });

    res.status(201).json(user);
});

// eslint-disable-next-line no-unused-vars
userRouter.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message });
    }
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' });
    }
});

export default userRouter;
