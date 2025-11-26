// Controller accepts a FeedbackService instance via DI
async function fetchAllFeedback(req, res, service) {
    const response = await service.getAll();
    res.status(response.status).json(response.data);
}

async function fetchFeedbackByCustomer(req, res, service) {
    const response = await service.getByCustomer(req.params.customerId);
    res.status(response.status).json(response.data);
}

async function fetchFeedbackForOrder(req, res, service) {
    const response = await service.getByOrder(req.params.orderId);
    res.status(response.status).json(response.data);
}

async function addFeedback(req, res, service) {
    const customerId = String(req.body.customer_id).trim();
    console.log("Received Customer ID:", customerId);

    const feedbackData = {
        customerId: customerId,
        orderNo: req.body.order_no,
        rating: req.body.rating,
        message: req.body.feedback_message
    };
    console.log("Customer ID:", feedbackData.customerId);

    const response = await service.create(feedbackData);
    res.status(response.status).json(response.data);
}

async function removeFeedback(req, res, service) {
    const response = await service.delete(req.params.id);
    res.status(response.status).json(response.data);
}

module.exports = {
    fetchAllFeedback,
    fetchFeedbackByCustomer,
    fetchFeedbackForOrder,
    addFeedback,
    removeFeedback,
};
