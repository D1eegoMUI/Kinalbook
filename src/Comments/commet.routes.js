'use strict';

import { Router } from 'express';
import { createComment, updateComment, deleteComment } from './commet.controller.js';

import { validateCreateComment, validateUpdateComment, validateDeleteComment } from '../../middlewares/comment.validator.js';

const router = Router();

router.post('/', validateCreateComment, createComment);

router.put('/:id', validateUpdateComment, updateComment);

router.delete('/:id', validateDeleteComment, deleteComment);

export default router;