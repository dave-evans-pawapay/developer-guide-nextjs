'use client'

import React, {useContext, Dispatch, useEffect, useState} from "react";
import Status from "@/components/status";
import {useSearchParams} from "next/navigation";
import uuid4 from "uuid4";
import dynamic from "next/dynamic";
import {MsisdnContext} from "@/context/mno.context";
import {getCountryFromCode} from "@/lib/getMockMsisdn";
import {ActiveConfig, Country} from "../../type";
import { useSession } from "next-auth/react"
import {PhoneAlert, PhoneMesage} from "@/lib/phone-message";


export default function GenerateTestTransactions(data: any){
    const { data: session } = useSession()
    const searchParams = useSearchParams();
    const { state, dispatch } = useContext(MsisdnContext);
    const activeConfig: ActiveConfig = data.data;
    let initialCountry = activeConfig.countries[0];
    if (searchParams && searchParams.get('code')){
        const c = activeConfig.countries.find(c => c.country == searchParams.get('code'));
        if (c) {
            initialCountry = c;
        }
    }
    let initialCorrespondent = activeConfig.countries[0].correspondents[0];
    const [depositId, setDepositId] = useState(uuid4());
    const [message, setMessage] = useState({
        message:'',
        status: 'green',
        paymentType: 'deposit',
        show: false,
        id: ''});
    const [country, setCountry] = useState<Country>(initialCountry);
    const [correspondent, setCorrespondent] = useState<string>(initialCorrespondent.correspondent);

    const correspondents = country.correspondents;
    const msisdn = searchParams?.get("msisdn") ? searchParams.get("msisdn") : "";

    const [testTransaction, setTestTransaction] = useState({
        currency: initialCorrespondent.currency,
        country: initialCountry.country,
        correspondent: initialCorrespondent.correspondent,
        description: "",
        quantity: 0,
        errorRatio: 10,
        transactionType: "deposit",
    });

    const handleCountryEvent = (e: any) => {
        const c = activeConfig.countries.find(data => data.country === (e.target.value));
        if (c) {
            setCountry(c);
            const currentCountry = getCountryFromCode(c.country);
            if (currentCountry) {
                dispatch({type: 'UPDATE_COUNTRY', payload: currentCountry});
            }
            testTransaction.country = c.country;
            testTransaction.correspondent = c.correspondents[0].correspondent;
            dispatch({ type: 'UPDATE_MNO', payload: testTransaction.correspondent});
            testTransaction.currency = c.correspondents[0].currency;
        }
        console.log(e.target.value);
    }
    const handleMnoEvent = (e: any) => {
        const c = country.correspondents.find((data: { correspondent: any; }) => data.correspondent === (e.target.value));
        if (c?.correspondent) {
            setCorrespondent(c.correspondent);
            dispatch({ type: 'UPDATE_MNO', payload: c.correspondent});
            testTransaction.correspondent = c.correspondent;
            testTransaction.currency = c.currency;
        }
        console.log(e.target.value);
    }

    useEffect(() => {
        dispatch({ type: 'UPDATE_MNO', payload: correspondent});
    }, [testTransaction]);

    const onOptionChange = (e: any) => {
        setTestTransaction({...testTransaction, transactionType: e.target.value});
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!testTransaction.country || !testTransaction.correspondent || !testTransaction.description || !testTransaction.quantity || !testTransaction.errorRatio || !testTransaction.transactionType) {
            setMessage({...message, status: 'red',
                message: `Please fill in all fields`, show: true});
            return;
        }

        if (testTransaction.description && testTransaction.description.length < 22 && testTransaction.description.length < 3) {
            setMessage({...message, status: 'red',
                message: `Description should be greater greater than 3 characters and less than 23`, show: true});
            return;
        }
        const pattern = new RegExp(/^[a-zA-Z0-9 ]+$/);
        if (!pattern.test(testTransaction.description.toString())) {
            setMessage({...message, status: 'red',
                message: `Description should alphanumeric only`, show: true});
            return;
        }
        await fetch("/api/generate-test-transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testTransaction),
        }).then(async res => {
            if (res.status != 200) {
                setMessage({...message, status: 'red', message: `Something went wrong: ${res.statusText}`, show: true});
            } else {
                const data = await res.json();
                setMessage({...message, status: 'green', message: `Test transactions generated successfully`, show: true, id: data.id});
            }
        }).catch(e => {
            setMessage({...message, status: 'red', message: `Something went wrong: ${e}`, show: true});
        });
    }

    return (
        <>
            { message.show ? <Status message={message.message}
                                     msgStatus={message.status}
                                     paymentType={message.paymentType}
                                     id={message.id} /> : null }
            <div className="md:flex flex-row gap-5">
                <form className="w-4/5 mt-5 mb-5"
                      onSubmit={onSubmit}>
                    <input type="hidden" id="currency" name="currency" value={testTransaction.currency}/>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Country
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="country"
                                name="country"
                                onChange={e => handleCountryEvent(e)}
                                value={country.country}>
                                {activeConfig.countries.map((c: any) => {
                                    return (
                                        <option key={c.country} value={c.country}>{c.country}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                MNO
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="correspondent"
                                name="correspondent"
                                value={correspondent}
                                onChange={e => handleMnoEvent(e)}>

                                {correspondents && correspondents.map((config: any) => {
                                    return (
                                        <option key={config.correspondent}
                                                value={config.correspondent}>{config.correspondent}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Statement Description
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="description"
                                name="description"
                                type="text"
                                maxLength={22}
                                placeholder="Description"
                                onChange={(e) => {
                                    setTestTransaction({...testTransaction, description: e.target.value});
                                }}/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Quantity
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="quantity" name="quantity" type="number" placeholder="Quantity"
                                onChange={(e) => {
                                    setTestTransaction({...testTransaction, quantity: +e.target.value});
                                }}/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Error Ratio (%) - 0 to 100
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="errorRatio" name="errorRatio" type="number" placeholder="Error Ratio"
                                onChange={(e) => {
                                    setTestTransaction({...testTransaction, errorRatio: +e.target.value});
                                }}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="deposit" name="default-radio"
                                   checked={testTransaction.transactionType === 'deposit'}
                                   onChange={onOptionChange}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-radio-1"
                                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Deposit
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input id="default-radio-2" type="radio" value="payout" name="default-radio"
                                   checked={testTransaction.transactionType === 'payout'}
                                   onChange={onOptionChange}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-radio-2"
                                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Payout</label>
                        </div>
                    </div>
                    <div className="flex mt-5 flex-col items-center">
                        <button type="submit"
                                className="md:w-2/5 flex-shrink-0 bg-purple-600 hover:bg-purple-900 border-purple-600 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded">
                            Generate Transactions
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
