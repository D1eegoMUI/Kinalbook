import User from '../User/user.model.js';

// REGISTER (Crear cuenta)
export const register = async (req, res) => {
    try {
        const data = req.body;

        // Crear instancia del usuario con los datos que vienen (incluyendo password)
        const user = new User(data);

        // Guardar en DB
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// LOGIN (Iniciar sesión)
export const login = async (req, res) => {
    try {
        // 1. Recibir correo y contraseña del body
        const { UserEmail, UserPassword } = req.body;

        // 2. Buscar si existe un usuario con ese correo
        const user = await User.findOne({ UserEmail });

        // Si no existe el usuario
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Credenciales inválidas: El correo no existe'
            });
        }

        // 3. Verificar si la contraseña coincide (Comparación directa)
        if (user.UserPassword !== UserPassword) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas: Contraseña incorrecta'
            });
        }

        // 4. Si todo coincide, responder con éxito
        res.status(200).json({
            success: true,
            message: 'Bienvenido al sistema',
            userDetails: {
                id: user._id,
                name: user.UserName,
                email: user.UserEmail,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};

// EDITAR PERFIL
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword, ...newData } = req.body;

        // 1. Buscar al usuario
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // 2. Si intenta cambiar la contraseña, validar la anterior (REQUISITO DEL LAB)
        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Para cambiar la contraseña debes ingresar la anterior'
                });
            }

            if (user.UserPassword !== oldPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña anterior no coincide'
                });
            }
            // Si coincide, actualizamos con la nueva
            user.UserPassword = newPassword;
        }

        // 3. Actualizar otros campos (Nombre de usuario, correo, etc.)
        // Usamos findByIdAndUpdate para aplicar runValidators
        const updatedUser = await User.findByIdAndUpdate(id, { 
            ...newData, 
            UserPassword: user.UserPassword 
        }, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el perfil',
            error: error.message
        });
    }
};