import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Score = mongoose.model("Score", scoreSchema);

export default Score;
