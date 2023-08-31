'use client'

import {useState} from "react";
import Status from "@/components/status";
import {useSearchParams} from "next/navigation";

export default function Payout(data: any){
    const searchParams = useSearchParams();
    const activeConfig: ActiveConfig = data.data;
    let initialCountry = activeConfig.countries[0];
    if (searchParams && searchParams.get('country')){
        const c = activeConfig.countries.find(c => c.country == searchParams.get('country'));
        if (c) {
            initialCountry = c;
        }
    }

    let initialCorrespondent = activeConfig.countries[0].correspondents[0];
    if (searchParams && searchParams.get('mno')){
        const c = activeConfig.countries[0].correspondents.find(c => c.correspondent == searchParams.get('mno'));
        if (c) {
            initialCorrespondent = c;
        }
    }
    const [country, setCountry] = useState<Country>(initialCountry);
    const [correspondent, setCorrespondent] = useState<Correspondent>(initialCorrespondent);
    const correspondents = country.correspondents;
    const msisdn = searchParams?.get("msisdn") ? searchParams.get("msisdn") : "";
    const [message, setMessage] = useState({
        message:'',
        status: 'Green',
        show: false});
    const [payout, setPayout] = useState({
        payoutId: "",
        msisdn: msisdn,
        amount: "",
        currency: activeConfig.countries[0].correspondents[0].currency,
        country: activeConfig.countries[0].country,
        correspondent: activeConfig.countries[0].correspondents[0].correspondent,
        description: "",
        minAmount: activeConfig.countries[0].correspondents[0].operationTypes[0].minTransactionLimit,
        maxAmount: activeConfig.countries[0].correspondents[0].operationTypes[0].maxTransactionLimit
    });

    const handleCountryEvent = (e: any) => {
        const c = activeConfig.countries.find(data => data.country === (e.target.value));
        if (c) {
            setCountry(c);
            payout.country = c.country;
            payout.correspondent = c.correspondents[0].correspondent;
            payout.currency = c.correspondents[0].currency;
            payout.minAmount = c.correspondents[0].operationTypes[0].minTransactionLimit;
            payout.maxAmount = c.correspondents[0].operationTypes[0].maxTransactionLimit;

        }
        console.log(e.target.value);
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!payout.msisdn || !payout.amount || !payout.currency || !payout.country || !payout.correspondent) {
            alert("Please fill all the fields");
            return;
        }

        await fetch("/api/payout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payout),
        }).then(async res => {
            if (res.status != 200) {
                setMessage( {...message, message: `Something went wrong: ${res.statusText}`, show:true});
            } else {
                const payoutResponse = await res.json();
                payout.payoutId = payoutResponse.payoutId;
                if (payoutResponse.status === "ACCEPTED") {
                    setMessage( {...message, message: `Accepted, checking status`, status:'yellow', show:true});
                    await fetch(`/api/payout-check?payoutId=${payout.payoutId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(async res => {
                        if (res.status != 200) {
                            setMessage( {...message, message: `Something went wrong: ${res.statusText}`, show:true});
                        } else {
                            const payoutResponse = await res.json();
                            console.log(JSON.stringify(payoutResponse));
                            if (payoutResponse.status === "COMPLETED") {
                                setMessage( {...message, message: `Payout completed`, status: 'green', show:true});
                            } else {
                                setMessage( {...message, message: `Payout failed: ${payoutResponse.message}`, status:'red', show:true});
                            }
                        }
                    });
                } else {
                    setMessage( {...message, message: `Rejected: ${payoutResponse.rejectionReason.rejectionMessage}`, status:'red', show:true});
                }
            }
        })
    }


    return (
        <>
            { message.show ? <Status message={message.message} msgStatus={message.status}/> : null }
                <form className="w-3/5  mt-5 mb-5"
                onSubmit={onSubmit}>
                    <input type="hidden" id="currency" name="currency" value={correspondent.currency} />
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                MSISDN
                            </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                               id="msisdn" name="msisdn" type="text" placeholder="MSISDN"
                               defaultValue={msisdn ? msisdn : ''}
                               onChange={(e) => {
                                   setPayout({ ...payout, msisdn: e.target.value });
                               }}/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                Amount
                            </label>
                        </div>
                        <div>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                               id="amount" name="amount" type="text" placeholder="Amount"
                               onChange={(e) => {
                                   setPayout({ ...payout, amount: e.target.value });
                               }}/>
                        </div>
                        <div className="block ml-2 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            {payout.currency}
                        </div>

                    </div>
                    <div className="md:flex md:justify-end mb-6">
                        <div className="block ml-2 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                           Min: {payout.minAmount} | Max: {payout.maxAmount}
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                Country
                            </label>
                         </div>

                         <div className="inline-block relative w-64">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="country"
                                    name="country"
                                    onChange={e => handleCountryEvent(e)}
                                value={country.country}>
                                { activeConfig.countries.map((c: any) => {
                                return (
                                    <option key={c.country} value={c.country}>{c.country}</option>
                                )
                            })}
                            </select>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                MNO
                            </label>
                        </div>

                        <div className="inline-block relative w-64">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="correspondent"
                                    name="correspondent"
                                    onChange={(e) => {
                                        setPayout({ ...payout, correspondent: e.target.value });
                                    }}>

                                { correspondents && correspondents.map((config: any) => {
                                return (
                                    <option key={config.correspondent} value={config.correspondent}>{config.correspondent}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                Statement Description
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                   id="description"
                                   name="description"
                                   type="text"
                                   placeholder="Description"
                                   onChange={(e) => {
                                       setPayout({ ...payout, description: e.target.value });
                                   }}/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <button type="submit"
                                className="md:w-full flex-shrink-0 bg-purple-600 hover:bg-purple-900 border-purple-600 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded">
                            Payout
                        </button>
                    </div>
                </form>
        </>
    )
}
