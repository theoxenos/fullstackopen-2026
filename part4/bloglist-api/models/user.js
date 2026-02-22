import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        const {
            // eslint-disable-next-line no-unused-vars
            _id, __v, passwordHash, ...cleanDoc
        } = ret;

        return {
            ...cleanDoc,
            id: _id.toString(),
            blogs: ret.blogs.map((blog) => {
                const {
                    // eslint-disable-next-line no-unused-vars
                    user,
                    ...cleanBlog
                } = blog;
                return cleanBlog;
            }),
        };
    },
});

const User = mongoose.model('User', userSchema);

export default User;
