'use strict';

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true,
        trim: true,
        maxlength: [50, 'El nombre no puede exceder 50 caracteres']
    },
    UserEmail: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
    },
    UserPassword: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    UserStatus: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
}, { 
    timestamps: true, 
    versionKey: false 
});

// Índice para optimizar búsquedas por nombre y correo
userSchema.index({ UserName: 1, UserEmail: 1 });

export default mongoose.model("User", userSchema);