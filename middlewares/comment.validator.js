'use strict';
import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

// Validación para CREAR un comentario
export const validateCreateComment = [
    body('CommentText')
        .trim()
        .notEmpty().withMessage('El texto del comentario es obligatorio')
        .isLength({ max: 500 }).withMessage('El comentario no puede exceder los 500 caracteres'),

    body('PubId')
        .notEmpty().withMessage('El ID de la publicación es obligatorio')
        .isMongoId().withMessage('ID de publicación no válido'),

    body('AuthorId')
        .notEmpty().withMessage('El ID del autor es obligatorio')
        .isMongoId().withMessage('ID de autor no válido'),

    checkValidators
];

// Validación para ACTUALIZAR un comentario
export const validateUpdateComment = [
    param('id')
        .isMongoId().withMessage('ID de comentario no válido'),

    body('CommentText')
        .optional()
        .trim()
        .notEmpty().withMessage('El texto no puede estar vacío si se va a actualizar'),

    body('AuthorId')
        .notEmpty().withMessage('El ID del autor es obligatorio para validar propiedad')
        .isMongoId().withMessage('ID de autor no válido'),

    checkValidators
];

// Validación para ELIMINAR un comentario
export const validateDeleteComment = [
    param('id')
        .isMongoId().withMessage('ID de comentario no válido'),

    body('AuthorId')
        .notEmpty().withMessage('El ID del autor es necesario para verificar si es el dueño')
        .isMongoId().withMessage('ID de autor no válido'),

    checkValidators
];