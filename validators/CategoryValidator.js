function validateCreateCategory(data) {
    const errors = [];
    if (!data.name) errors.push("Category name is required");
    return errors;
}

function validateUpdateCategory(data) {
    const errors = [];
    if (!data.name) errors.push("Category name is required");
    return errors;
}

module.exports = { validateCreateCategory, validateUpdateCategory };
