'use strict';

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: [true, 'El nombre de la categoría es requerido'],
        unique: true,
        trim: true,
        maxlength: [50, 'El nombre no puede exceder 50 caracteres']
    },
    CategoryDescription: {
        type: String,
        required: [true, 'La descripción es requerida'],
        maxlength: [100, 'La descripción no puede exceder 100 caracteres']
    },
    CategoryStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    }
}, { 
    timestamps: true, 
    versionKey: false 
});

categorySchema.index({ CategoryName: 1 });

export default mongoose.model("Category", categorySchema);