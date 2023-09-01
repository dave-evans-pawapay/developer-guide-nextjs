import {NextApiRequest} from "next";
import uuid4 from "uuid4";
interface Payout extends NextApiRequest {
    body: {
        payoutId: string,
        msisdn: string,
        amount: string,
        country: string,
        currency: string,
        correspondent: string
        description: string
    }
}

export default async function depositHandler(req: Payout, res: any) {
    if (req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const {payoutId, msisdn, amount, country, currency, correspondent, description} = req.body;

    const address: Address = {
    value: msisdn
    }
    const recipient : Recipient = {
        type:"MSISDN",
        address: address
    }

    // Lets submit the deposit request to the API
    const payoutRequest: PayoutRequest = {
        payoutId: payoutId,
        amount: amount,
        currency: currency,
        statementDescription: description,
        country: country,
        correspondent: correspondent,
        recipient: recipient,
        customerTimestamp: new Date().toISOString()
    }

    const response = await fetch(`${process.env.API_URL}/payouts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.API_KEY,
        },
        body: JSON.stringify(payoutRequest)
    });
    const payoutResponse = await response.json();
    return res.status(response.status).json(payoutResponse);
}
