import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    title: String,
    content: String,
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export default mongoose.model('Journal', journalSchema);