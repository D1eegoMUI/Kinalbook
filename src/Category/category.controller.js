import Category from './category.model.js';

export const getCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, CategoryStatus } = req.query;
        const filter = {};
        if (CategoryStatus) filter.CategoryStatus = CategoryStatus;

        const categories = await Category.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ CategoryName: 1 });

        const total = await Category.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: categories,
            pagination: {
                totalRecords: total,
                totalPages: Math.ceil(total / limit),
                currentPage: parseInt(page)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = new Category(data);
        await category.save();

        res.status(201).json({
            success: true,
            message: 'Categoría creada exitosamente',
            data: category
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const changeCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) return res.status(404).json({ success: false, message: 'Categoría no encontrada' });

        category.CategoryStatus = category.CategoryStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        await category.save();

        res.status(200).json({ success: true, message: `Estado: ${category.CategoryStatus}`, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};