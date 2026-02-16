import { Router } from 'express';
import { getUsers, createUser, changeUserStatus } from './user.controller.js';
import { validateCreateUser, validateUpdateUser } from '../../middlewares/user-validator.js';

const router = Router();

router.get('/', getUsers);

router.post('/', validateCreateUser, createUser);

router.put('/:id/status', validateUpdateUser, changeUserStatus);

export default router;