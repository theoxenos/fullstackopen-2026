import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import User from '../models/user.js';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!(user && isPasswordCorrect)) {
        return res.status(401).json({ error: 'wrong credentials' });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

    return res.json({ token, username: user.username, name: user.name });
});

// eslint-disable-next-line no-unused-vars
loginRouter.use((err, req, res, _next) => {
    if (err.name === 'Error' && err.message.includes('secretOrPrivateKey must have a value')) {
        return res.status(500).json({ error: err.message });
    }
});

export default loginRouter;
