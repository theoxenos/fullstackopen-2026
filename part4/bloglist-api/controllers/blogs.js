import { Router } from 'express';
import Blog from '../models/blog.js';
import authMiddleware from '../middleware/auth.js';

const blogRouter = Router();

blogRouter.get('/', async (request, response) => {
    response.json(await Blog.find({}).populate('user'));
});

blogRouter.get('/:id', async (request, response) => {
    response.json(await Blog.findById(request.params.id).populate('user'));
});

blogRouter.post('/', authMiddleware.tokenExtractor, authMiddleware.userExtractor, async (request, response) => {
    const { author, url, title } = request.body;
    const { user } = request;

    const blogFromDatabase = await Blog.create({
        author,
        url,
        title,
        likes: request.body.likes ? request.body.likes : 0,
        user: user._id,
    });

    user.blogs = [...user.blogs, blogFromDatabase._id];
    await user.save();

    return response.status(201).json(await blogFromDatabase.populate('user'));
});

blogRouter.delete('/:id', authMiddleware.tokenExtractor, authMiddleware.userExtractor, async (request, response) => {
    const { _id: userId } = request.user;

    const deletedBlog = await Blog.findById(request.params.id);

    if (!deletedBlog) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    // More explicit comparison
    const blogUserId = deletedBlog.user.toString();
    const tokenUserId = userId.toString();

    if (blogUserId !== tokenUserId) {
        return response.status(401).json({ error: 'Not authorized to delete this blog' });
    }

    await deletedBlog.deleteOne();
    return response.json(await deletedBlog.populate('user'));
});

blogRouter.put('/:id', async (request, response) => {
    const { id } = request.params;

    const updatedNote = await Blog
        .findByIdAndUpdate(id, request.body, { new: true });

    if (updatedNote) {
        response.json(await updatedNote.populate('user'));
    } else {
        response.status(404).json({ error: `Blog with id ${id} not found` });
    }
});

blogRouter.patch('/:id', async (request, response) => {
    const { id } = request.params;
    const likes = request.body.likes ? request.body.likes : 0;

    const updatedNote = await Blog.findByIdAndUpdate(id, { likes }, { new: true });

    if (updatedNote) {
        response.json(await updatedNote.populate('user'));
    } else {
        response.status(404).json({ error: `Blog with id ${id} not found` });
    }
});

// eslint-disable-next-line no-unused-vars
blogRouter.use((error, req, res, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'Malformatted ID' });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).send({ error: 'invalid token' });
    }
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return res.status(400).send({ error: 'expected `url` to be unique' });
    }

    return res.status(500).send({ error: error.message });
});

export default blogRouter;
