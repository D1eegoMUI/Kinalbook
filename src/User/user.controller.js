import User from './user.model.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, UserStatus } = req.query;
        const filter = {};
        if (UserStatus) filter.UserStatus = UserStatus;

        const users = await User.find(filter)
            .select('-UserPassword') // Excluir password por seguridad
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { UserPassword, ...data } = req.body;

        // Encriptación simple antes de guardar
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(UserPassword, salt);

        const user = new User({ ...data, UserPassword: encryptedPassword });
        await user.save();

        const userSafe = user.toObject();
        delete userSafe.UserPassword;

        res.status(201).json({ success: true, message: 'Usuario creado', data: userSafe });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
};

export const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        user.UserStatus = user.UserStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        await user.save();

        res.status(200).json({ success: true, message: `Estado cambiado a ${user.UserStatus}`, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};