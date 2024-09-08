import mongoose from "mongoose";
import Score from "./Score.js";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    scores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Score",
        }
    ],
    profilePhotoUrl:{
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;
