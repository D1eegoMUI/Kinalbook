'use strict';

import { Router } from 'express';
import { createComment, updateComment, deleteComment, getComments } from './commet.controller.js';

import { validateCreateComment, validateUpdateComment, validateDeleteComment } from '../../middlewares/comment.validator.js';

const router = Router();

router.get('/', getComments);

router.post('/', validateCreateComment, createComment);

router.put('/:id', validateUpdateComment, updateComment);

router.delete('/:id', validateDeleteComment, deleteComment);

export default router;