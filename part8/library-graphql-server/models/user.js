import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    favouriteGenre: String,
})

schema.plugin(uniqueValidator)

export default mongoose.model('User', schema);