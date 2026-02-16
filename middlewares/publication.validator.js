import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreatePublication = [
    body('PubTitle')
        .trim()
        .notEmpty().withMessage('El título es requerido'),
    body('PubCategory')
        .isMongoId().withMessage('ID de categoría no válido'),
    body('PubContent')
        .notEmpty().withMessage('El contenido no puede estar vacío'),
    body('PubAuthor')
        .isMongoId().withMessage('ID de autor no válido'),
    checkValidators
];

export const validateUpdatePublication = [
    param('id').isMongoId().withMessage('ID de publicación no válido'),
    body('PubAuthor').isMongoId().withMessage('ID de autor requerido para validar propiedad'),
    checkValidators
];