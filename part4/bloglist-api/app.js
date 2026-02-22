import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './controllers/blogs.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/testing.js';
import userRouter from './controllers/users.js';
import { MONGODB_URI } from './utils/config.js';

const app = express();
app.use(express.json());

try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
}

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter);
}

export default app;
