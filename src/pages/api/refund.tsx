import {NextApiRequest} from "next";
import uuid4 from "uuid4";
interface Refund extends NextApiRequest {
    body: {
        refundId: string,
        depositId: string,
        amount: string
    }
}

export default async function refundHandler(req: Refund, res: any) {
    if (req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const {refundId, depositId, amount} = req.body;

    // Lets submit the deposit request to the API
    const refundRequest: RefundRequest = {
        refundId: refundId,
        depositId: depositId,
        amount: amount
    }

    const response = await fetch(`${process.env.API_URL}/refunds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.API_KEY,
        },
        body: JSON.stringify(refundRequest)
    });
    const refundResponse = await response.json();
    return res.status(response.status).json(refundResponse);
}
