import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"


export default async function payoutCheckHandler(req: any, res: any) {
    const session = await getServerSession(req,res,authOptions)
    let url = `${process.env.SANDBOX_API_URL}/payouts`
    let apiKey = process.env.SANDBOX_API_KEY
    if (session?.user?.email) {
        url = `${process.env.PROD_API_URL}/payouts`
        apiKey = process.env.PROD_API_KEY
    }
    if (req.method !== 'GET') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const { payoutId } = req.query;
    const backoff = [0.5,1,15,30,60,120];
    let r = {
        payoutId: payoutId,
        status: '',
        message: 'An error occurred while processing the payout request'
    }
    for ( let i=0; i<backoff.length; i++) {
        await sleep(backoff[i]);
        const response = await fetch(`${url}/${payoutId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
            }
        });
        const payoutResponse = await response.json();
        if (response.status != 200) {
            return res.status(response.status).json(payoutResponse);
        } else {
            switch (payoutResponse[0].status) {
                case "COMPLETED":
                    r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: 'Payout request completed successfully'
                    }
                    return res.status(response.status).json(r);
                    break;
                case "SUBMITTED":
                     r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: 'An error occurred while processing the payout request'
                    }
                    break;
                case "FAILED":
                    r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: payoutResponse[0].failureReason.failureMessage
                    }
                    return res.status(response.status).json(r);
                    break;
                case "ENQUEUED":
                    r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
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
