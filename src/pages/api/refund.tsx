import {NextApiRequest} from "next";
import uuid4 from "uuid4";
import {RefundRequest} from "../../../type";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
interface Refund extends NextApiRequest {
    body: {
        refundId: string,
        depositId: string,
        amount: string
    }
}

export default async function refundHandler(req: Refund, res: any) {
    const session = await getServerSession(req,res,authOptions)
    let url = `${process.env.SANDBOX_API_URL}/refunds`
    let apiKey = process.env.SANDBOX_API_KEY
    if (session?.user?.email) {
        url = `${process.env.PROD_API_URL}/refunds`
        apiKey = process.env.PROD_API_KEY
    }
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

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify(refundRequest)
    });
    const refundResponse = await response.json();
    return res.status(response.status).json(refundResponse);
}
