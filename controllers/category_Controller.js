// Controller functions accept service as DI param

async function fetchCategories(req, res, categoryService) {
    const response = await categoryService.getAll();
    res.status(response.status).json(response.data);
}

async function fetchCategoryById(req, res, categoryService) {
    const response = await categoryService.getById(req.params.id);
    res.status(response.status).json(response.data);
}

async function createCategory(req, res, categoryService) {
    const response = await categoryService.create(req.body);
    res.status(response.status).json(response.data);
}

async function modifyCategory(req, res, categoryService) {
    const response = await categoryService.update(req.params.id, req.body);
    res.status(response.status).json(response.data);
}

async function removeCategory(req, res, categoryService) {
    const response = await categoryService.delete(req.params.id);
    res.status(response.status).json(response.data);
}

module.exports = { fetchCategories, fetchCategoryById, createCategory, modifyCategory, removeCategory };
