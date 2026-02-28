import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

export default mongoose.model('Todo', todoSchema);