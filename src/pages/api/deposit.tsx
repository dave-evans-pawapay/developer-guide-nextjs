import {NextApiRequest} from "next";
import uuid4 from "uuid4";
import {Address, DepositRequest, Payer} from "../../../type";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
interface Deposit extends NextApiRequest {
    body: {
        depositId: string,
        msisdn: string,
        amount: string,
        country: string,
        currency: string,
        correspondent: string
        description: string
    }
}

export default async function depositHandler(req: Deposit, res: any) {
    const session = await getServerSession(req,res,authOptions)
    let url = `${process.env.SANDBOX_API_URL}/deposits`
    let apiKey = process.env.SANDBOX_API_KEY
    if (session?.user?.email) {
        url = `${process.env.PROD_API_URL}/deposits`
        apiKey = process.env.PROD_API_KEY
    }



    if (req.method !== 'POST') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const {depositId, msisdn, amount, country, currency, correspondent, description} = req.body;

    const address: Address = {
        value: msisdn
    }
    const payer : Payer = {
        type:"MSISDN",
        address: address
    }

    // Lets submit the deposit request to the API
    const depositRequest: DepositRequest = {
        depositId: depositId,
        amount: amount,
        currency: currency,
        statementDescription: description,
        country: country,
        correspondent: correspondent,
        payer: payer,
        customerTimestamp: new Date().toISOString()
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify(depositRequest)
    });
    const depositResponse = await response.json();
    return res.status(response.status).json(depositResponse);
}
