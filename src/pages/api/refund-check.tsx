import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"

export default async function refundCheckHandler(req: any, res: any) {
    const session = await getServerSession(req,res,authOptions)
    let url = `${process.env.SANDBOX_API_URL}/refunds`
    let apiKey = process.env.SANDBOX_API_KEY
    if (session?.user?.email) {
        url = `${process.env.PROD_API_URL}/refunds`
        apiKey = process.env.PROD_API_KEY
    }
    if (req.method !== 'GET') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const { refundId } = req.query;
    const backoff = [0.5,1,15,30,60,120];
    let r = {
        refundId: refundId,
        status: '',
        message: 'An error occurred while processing the deposit request'
    }
    for ( let i=0; i<backoff.length; i++) {
        await sleep(backoff[i]);
        const response = await fetch(`${url}/${refundId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
            }
        });
        const refundResponse = await response.json();
        if (response.status != 200) {
            return res.status(response.status).json(refundResponse);
        } else {
            switch (refundResponse[0].status) {
                case "COMPLETED":
                    r = {
                        refundId: refundResponse[0].refundId,
                        status: refundResponse[0].status,
                        message: 'Refund request completed successfully'
                    }
                    return res.status(response.status).json(r);
                    break;
                case "SUBMITTED":
                     r = {
                        refundId: refundResponse[0].refundId,
                        status: refundResponse[0].status,
                        message: 'An error occurred while processing the deposit request'
                    }
                    break;
                case "FAILED":
                    r = {
                        refundId: refundResponse[0].refundId,
                        status: refundResponse[0].status,
                        message: refundResponse[0].failureReason.failureMessage
                    }
                    return res.status(response.status).json(r);
                    break;
                case "ENQUEUED":
                    r = {
                        refundId: refundResponse[0].refundId,
                        status: refundResponse[0].status,
                        message: 'Transaction enqueued request'
                    }
                    return res.status(response.status).json(r);
                    break;
            }
        }
    }
    return res.status(400).json(r);
}

 const sleep = async (seconds: number) => {
    await new Promise(resolve => setTimeout(resolve, seconds*1000));
}
