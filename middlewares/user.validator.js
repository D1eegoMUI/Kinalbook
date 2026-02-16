import { body, param } from 'express-validator';
import { checkValidators } from './check.validators.js';

export const validateCreateUser = [
    body('UserName')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es requerido')
        .isLength({ max: 50 }).withMessage('El nombre no puede exceder 50 caracteres'),
    
    body('UserEmail')
        .trim()
        .notEmpty().withMessage('El correo es requerido')
        .isEmail().withMessage('Formato de correo inválido'),
    
    body('UserPassword')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    checkValidators,
];

export const validateUpdateUser = [
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    body('UserName').optional().trim().notEmpty(),
    body('UserEmail').optional().trim().isEmail(),
    checkValidators,
];