'use strict';
import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
    PubTitle: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    PubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Referencia al módulo que ya hiciste
        required: [true, 'La categoría es obligatoria']
    },
    PubContent: {
        type: String,
        required: [true, 'El contenido no puede estar vacío']
    },
    PubAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al autor
        required: true
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Publication", publicationSchema);