import {NextApiRequest} from "next";
import uuid4 from "uuid4";
import {Address, DepositRequest, Payer} from "../../../type";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import GetMockMsisdn, {getCountryFromCode} from "@/lib/getMockMsisdn";
interface TestTransaction extends NextApiRequest {
    body: {
        country: string,
        currency: string,
        correspondent: string,
        description: string,
        quantity: number,
        errorRatio: number,
        transactionType: string
    }
}

export default async function testTransactionsHandler(req: TestTransaction, res: any) {
    try {
        const session = await getServerSession(req, res, authOptions)
        let url = `${process.env.SANDBOX_API_URL}/payouts`
        const {country, currency, correspondent, description, quantity, errorRatio, transactionType} = req.body;
        if (transactionType === 'deposit') {
            url = `${process.env.SANDBOX_API_URL}/deposits`
        }
        let apiKey = process.env.SANDBOX_API_KEY
        if (session?.user?.email) {
            return res.status(405).json({message: 'Can not generate test transactions on production'});
        }

        if (req.method !== 'POST') {
            res.status(405).json({error: 'Method not allowed'});
            return;
        }
        // Need to get activeConfig for country to get minimums and maximums
        let activeConfigUrl = `${process.env.SANDBOX_API_URL}/active-conf`
        const activeConfigRes = await fetch(activeConfigUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            }
        })
        if (!activeConfigRes.ok) {
            throw new Error('Failed to fetch Active Config API')
        }
        const activeConfig = await activeConfigRes.json()
        console.log('activeConfigRes', JSON.stringify(activeConfig))

        const countryConfig = activeConfig.countries.find((config: any) => config.country === country)
        if (!countryConfig) {
            return res.status(500).json({message: 'Country not found in active config'});
        }
        const correspondentConfig = countryConfig.correspondents.find((config: any) => config.correspondent === correspondent)
        if (!correspondentConfig) {
            return res.status(500).json({message: 'Correspondent not found in active config'});
        }
        let minAmount = 0
        let maxAmount = 0
        if (transactionType === 'deposit') {
            const operationConfig = correspondentConfig.operationTypes.find((config: any) => config.operationType === 'DEPOSIT')
            minAmount = +operationConfig.minTransactionLimit
            maxAmount = +operationConfig.maxTransactionLimit
        } else {
            const operationConfig = correspondentConfig.operationTypes.find((config: any) => config.operationType === 'PAYOUT')
            minAmount = +operationConfig.minTransactionLimit
            maxAmount = +operationConfig.maxTransactionLimit
        }

        const c = getCountryFromCode(country);

        // Need to grab test numbers for country / mno and create transactions for them.
        let msisdn = GetMockMsisdn(c, correspondent)
        if (transactionType === 'deposit') {
            msisdn = msisdn.filter((m) => m.paymentType == 'DEPOSIT')
        } else {
            msisdn = msisdn.filter((m) => m.paymentType == 'PAYOUT')
        }
        let outputMsIsdn = []
         // grab success msisdn
        const msisdnSuccess = msisdn.find((m) => m.failureReason === 'SUCCESS')
        const msisdnError = msisdn.filter((m) => m.failureReason != 'SUCCESS')

        for (let i = 0; i < quantity; i++) {
            if (Math.random() * 100 < errorRatio) {
                // Error
                const errorItem = Math.round(Math.random() * msisdnError.length);
                outputMsIsdn.push(msisdnError[errorItem]);
            } else {
                // Success
                outputMsIsdn.push(msisdnSuccess)
            }
        }
        for (let tx of outputMsIsdn) {
            const address: Address = {
                value: tx ? tx.msisdn : '',
            }
            const payer: Payer = {
                type: "MSISDN",
                address: address
            }
            if (transactionType === 'deposit') {
                const txRequest = {
                    depositId: uuid4(),
                    amount: Math.round(Math.random() * (maxAmount - minAmount) + minAmount),
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
                    body: JSON.stringify(txRequest)
                });
                const r  = await response.json()
                console.log('response', JSON.stringify(r))
            } else {
                const txRequest = {
                    payoutId: uuid4(),
                    amount: Math.round(Math.random() * (maxAmount - minAmount) + minAmount),
                    currency: currency,
                    statementDescription: description,
                    country: country,
                    correspondent: correspondent,
                    recipient: payer,
                    customerTimestamp: new Date().toISOString()
                }
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + apiKey,
                    },
                    body: JSON.stringify(txRequest)
                });
                const r  = await response.json()
                console.log('response', JSON.stringify(r))
            }
            sleep(0.5);
        }
        return res.status(200).json({message: 'ok'});
    } catch (e:any) {
        return res.status(500).json({message: e.message});
    }
}

const sleep = async (seconds: number) => {
    await new Promise(resolve => setTimeout(resolve, seconds*1000));
}
