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

export default async function testAllTransactionsHandler(req: TestTransaction, res: any) {
    try {
        const session = await getServerSession(req, res, authOptions)
        let payoutUrl = `${process.env.SANDBOX_API_URL}/payouts`
        const {country, description, quantity, errorRatio} = req.body;
        const depositUrl = `${process.env.SANDBOX_API_URL}/deposits`
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
        let countryList = activeConfig.countries
        if (country) {
            countryList = activeConfig.countries.filter((c: any) => c.country == country)
        }
        for (let country of countryList) {
            for (let correspondent of country.correspondents) {
                for (let operationType of correspondent.operationTypes) {
                    let minAmount = +operationType.minTransactionLimit
                    let maxAmount = +operationType.maxTransactionLimit
                    let allMsisdn = GetMockMsisdn(getCountryFromCode(country.country), correspondent.correspondent)
                    // Deposit Activity
                    let msisdn = allMsisdn.filter((m) => m.paymentType == 'DEPOSIT')
                    let msisdnSuccess = msisdn.find((m) => m.failureReason === 'SUCCESS')
                    let msisdnError = msisdn.filter((m) => m.failureReason != 'SUCCESS')
                    let outputMsIsdn = []
                    if (errorRatio == 0) {
                        outputMsIsdn = Array(quantity).fill(msisdnSuccess)
                    } else {
                        const errorInstances = Math.round(quantity * (errorRatio / 100))
                        const successInstances = quantity - errorInstances
                        for (let i = 0; i < errorInstances; i++) {
                            const errorItem = Math.round(Math.random() * msisdnError.length);
                            outputMsIsdn.push(msisdnError[errorItem]);
                        }
                        for (let i = 0; i < successInstances; i++) {
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
                        const txRequest = {
                            depositId: uuid4(),
                            amount: Math.round(Math.random() * (maxAmount - minAmount) + minAmount),
                            currency: correspondent.currency,
                            statementDescription: description,
                            country: country.country,
                            correspondent: correspondent.correspondent,
                            payer: payer,
                            customerTimestamp: new Date().toISOString()
                        }
                        const response = await fetch(depositUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + apiKey,
                            },
                            body: JSON.stringify(txRequest)
                        });
                        const r  = await response.json()
                        console.log('response', JSON.stringify(r))
                        await sleep(0.5);
                    }
                    msisdn = allMsisdn.filter((m) => m.paymentType == 'PAYOUT')
                    msisdnSuccess = msisdn.find((m) => m.failureReason === 'SUCCESS')
                    msisdnError = msisdn.filter((m) => m.failureReason != 'SUCCESS')
                    outputMsIsdn = []
                    if (errorRatio == 0) {
                        outputMsIsdn = Array(quantity).fill(msisdnSuccess)
                    } else {
                        const errorInstances = Math.round(quantity * (errorRatio / 100))
                        const successInstances = quantity - errorInstances
                        for (let i = 0; i < errorInstances; i++) {
                            const errorItem = Math.round(Math.random() * msisdnError.length);
                            outputMsIsdn.push(msisdnError[errorItem]);
                        }
                        for (let i = 0; i < successInstances; i++) {
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
                        const txRequest = {
                            payoutId: uuid4(),
                            amount: Math.round(Math.random() * (maxAmount - minAmount) + minAmount),
                            currency: correspondent.currency,
                            statementDescription: description,
                            country: country.country,
                            correspondent: correspondent.correspondent,
                            recipient: payer,
                            customerTimestamp: new Date().toISOString()
                        }
                        const response = await fetch(payoutUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + apiKey,
                            },
                            body: JSON.stringify(txRequest)
                        });
                        const r  = await response.json()
                        console.log('response', JSON.stringify(r))
                        await sleep(0.5);
                    }
                }
            }
        }
        return res.status(200).json({message: 'ok'});
    } catch (e:any) {
        return res.status(500).json({message: e.message});
    }
}

const sleep = async (seconds: number) => {
    await new Promise(resolve => setTimeout(resolve, seconds*1000));
}
