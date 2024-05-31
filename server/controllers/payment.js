
import { createPayment, insertPayment } from './paymentRepository.js';



export  async function payment (req, res) {
    try {
        const paymentData = req.body;
        const paymentResult = await createPayment(paymentData);
        const paymentId = await insertPayment(paymentData, paymentResult.status, req.session.userId);
        const paymentInfo = {
            id: paymentId.id,
            amount: paymentResult.amount,
            description: paymentResult.description,
            status: paymentResult.status,
        };
        res.json(paymentInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


