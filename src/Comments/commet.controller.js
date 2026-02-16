import Comment from './comment.model';

export const createComment = async (req, res) => {
    try {
        const { CommentText, PubId, AuthorId } = req.body;

        // 1. Validar que la publicación exista (No puedes comentar en el vacío)
        const publicationExists = await Publication.findById(PubId);
        if (!publicationExists) {
            return res.status(404).json({
                success: false,
                message: 'No puedes comentar: La publicación no existe'
            });
        }

        // 2. Validar que el autor exista (Opcional si usas JWT, pero recomendado en tu estilo)
        const userExists = await User.findById(AuthorId);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'Usuario inválido'
            });
        }

        // 3. Crear el comentario
        const comment = new Comment({
            CommentText,
            PubId,
            AuthorId
        });

        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario publicado exitosamente',
            data: comment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el comentario',
            error: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { AuthorId } = req.body; 

        // 1. Buscar el comentario primero
        const comment = await Comment.findById(id);
        
        if (!comment) {
            return res.status(404).json({ 
                success: false, 
                message: 'Comentario no encontrado' 
            });
        }

        // 2. REQUISITO LAB: Validar que el que borra sea el autor
        // Usamos toString() porque los IDs en Mongo son objetos de tipo ObjectId
        if (comment.AuthorId.toString() !== AuthorId) {
            return res.status(403).json({ 
                success: false, 
                message: 'Operación denegada: No puedes borrar un comentario ajeno' 
            });
        }

        // 3. Eliminación física (el lab permite eliminar sus propios comentarios)
        await Comment.findByIdAndDelete(id);

        res.status(200).json({ 
            success: true, 
            message: 'Comentario eliminado exitosamente',
            data: { id } // Buena práctica devolver el ID eliminado
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al intentar eliminar el comentario',
            error: error.message 
        });
    }
};

// Te sugiero agregar el método UPDATE siguiendo la misma lógica:
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { AuthorId, CommentText } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        // Validar propiedad
        if (comment.AuthorId.toString() !== AuthorId) {
            return res.status(403).json({ success: false, message: 'No puedes editar comentarios de otros' });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            id, 
            { CommentText }, 
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};