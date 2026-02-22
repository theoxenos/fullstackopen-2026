import express from 'express';
import User from '../models/user.js';
import Blog from '../models/blog.js';

const testingRouter = express.Router();

testingRouter.post('/reset', async (req, res) => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    res.status(204).end();
});

export default testingRouter;
