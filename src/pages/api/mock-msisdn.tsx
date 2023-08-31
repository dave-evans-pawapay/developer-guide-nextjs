import {NextApiRequest} from "next";
import uuid4 from "uuid4";
import GetMockMsisdn from "@/lib/getMockMsisdn";

export default async function MockMsisdn(req: any, res: any) {

    if (req.method !== 'GET') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }

    const { country, mno } = req.query;
    const chkCountry = country ? country : null;
    const chkMno = mno ? mno : null;

    const msisdn = GetMockMsisdn(chkCountry, chkMno)

    return res.status(200).json(msisdn);
}

