import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    author: String,
    url: {
        type: String,
        required: true,
    },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        const {
            // eslint-disable-next-line no-unused-vars
            _id, __v, user, ...cleanBlog
        } = returnedObject;

        let cleanUser = null;
        if (user) {
            // eslint-disable-next-line no-unused-vars
            const { blogs, ...userWithoutBlogs } = user;
            cleanUser = userWithoutBlogs;
        }

        const result = {
            ...cleanBlog,
            id: returnedObject._id.toString(),
        };

        if (cleanUser) {
            result.user = cleanUser;
        }

        return result;
    },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
