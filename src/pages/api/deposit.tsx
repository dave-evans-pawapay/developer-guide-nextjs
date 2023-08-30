import {NextApiRequest} from "next";
import uuid4 from "uuid4";
interface Deposit extends NextApiRequest {
    body: {
        msisdn: string,
        amount: string,
        country: string,
        currency: string,
        correspondent: string
        description: string
    }
}

export default async function depositHandler(req: Deposit, res: any) {
    if (req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const {msisdn, amount, country, currency, correspondent, description} = req.body;

    const address: Address = {
    value: msisdn
    }
    const payer : Payer = {
        type:"MSISDN",
        address: address
    }

    // Lets submit the deposit request to the API
    const depositRequest: DepositRequest = {
        depositId: uuid4(),
        amount: amount,
        currency: currency,
        statementDescription: description,
        country: country,
        correspondent: correspondent,
        payer: payer,
        customerTimestamp: new Date().toISOString()
    }

    const response = await fetch(`${process.env.API_URL}/deposits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.API_KEY,
        },
        body: JSON.stringify(depositRequest)
    });
    const depositResponse = await response.json();
    return res.status(response.status).json(depositResponse);
}
