import Publication from './publication.model.js';
import Category from '../Category/category.model.js';

export const getPublications = async (req, res) => {
    try {
        const publications = await Publication.find()
            .populate('PubCategory', 'CategoryName') // Trae el nombre de la categoría
            .populate('PubAuthor', 'UserName');      // Trae el nombre del autor

        res.status(200).json({
            success: true,
            publications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener publicaciones', error: error.message });
    }
};

export const createPublication = async (req, res) => {
    try {
        const data = req.body;
        // Validar que la categoría exista (Tu estilo de validación manual)
        const categoryExists = await Category.findById(data.PubCategory);
        if (!categoryExists) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });

        const publication = new Publication(data);
        await publication.save();

        res.status(201).json({ success: true, message: 'Publicación creada', data: publication });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { PubAuthor, ...data } = req.body; // PubAuthor viene del "login" o token

        const pub = await Publication.findById(id);
        if (!pub) return res.status(404).json({ success: false, message: 'No existe la publicación' });

        // REQUISITO LAB: Validar que sea el mismo autor
        if (pub.PubAuthor.toString() !== PubAuthor) {
            return res.status(403).json({ success: false, message: 'No tienes permiso para editar esta publicación' });
        }

        const updatedPub = await Publication.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ success: true, data: updatedPub });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};