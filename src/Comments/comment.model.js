'use strict';
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    CommentText: {
        type: String,
        required: [true, 'El texto del comentario es obligatorio']
    },
    PubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    AuthorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Comment", commentSchema);