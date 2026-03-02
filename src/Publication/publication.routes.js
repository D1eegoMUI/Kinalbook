import { Router } from 'express';
import { createPublication, getPublications, updatePublication } from './publication.controller.js';
import { validateCreatePublication, validateUpdatePublication } from '../../middlewares/publication.validator.js';

const router = Router();

router.get('/', getPublications);

router.post('/', validateCreatePublication, createPublication);

router.put('/:id', validateUpdatePublication, updatePublication);

export default router;