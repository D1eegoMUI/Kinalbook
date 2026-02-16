'use strict';

import { Router } from 'express';
import { getCategories, createCategory, changeCategoryStatus } from './category.controller.js';

import { validateCreateCategory, validateUpdateCategory } from '../../middlewares/category.validator.js';

const router = Router();

router.get('/', getCategories);

router.post('/', validateCreateCategory, createCategory);

router.put(
    '/:id/status',
    validateUpdateCategory, // Valida que el ID sea un MongoId
    changeCategoryStatus
);

export default router;