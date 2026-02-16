import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateCategory = [
    body('CategoryName')
        .trim()
        .notEmpty().withMessage('El nombre es requerido'),
    body('CategoryDescription')
        .trim()
        .notEmpty().withMessage('La descripción es requerida'),
    checkValidators,
];

export const validateUpdateCategory = [
    param('id').isMongoId().withMessage('ID no válido'),
    body('CategoryName').optional().trim(),
    checkValidators,
];