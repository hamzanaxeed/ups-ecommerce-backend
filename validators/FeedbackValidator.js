function validateCreateFeedback(data) {
    const errors = [];
    if (!data.customerId) errors.push("Customer ID required");
    if (!data.orderNo) errors.push("Order number required");
    if (!data.rating) errors.push("Rating required");
    if (!data.message) errors.push("Feedback message required");
    return errors;
}

module.exports = { validateCreateFeedback };
