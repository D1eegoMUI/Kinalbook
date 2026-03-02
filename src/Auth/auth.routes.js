import { Router } from 'express';
import { getUsers, login, register, updateUserProfile } from './auth.controller.js';
// Si tienes los validadores de perfil, impórtalos aquí

const router = Router();

router.get('/', getUsers);
// Ruta para registrarse (Crear cuenta)
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

router.put('/update-profile/:id', updateUserProfile);

export default router;