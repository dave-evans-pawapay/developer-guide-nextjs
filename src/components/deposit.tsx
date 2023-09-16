'use client'

import React, {useContext, Dispatch, useEffect, useState} from "react";
import Status from "@/components/status";
import {useSearchParams} from "next/navigation";
import CodeRender from "@/components/code-render/code-render";
import uuid4 from "uuid4";
import dynamic from "next/dynamic";
import WebPhone from "@/components/web-phone/web-phone";
import {MsisdnContext} from "@/context/mno.context";
export default function Deposit(data: any){
    const searchParams = useSearchParams();
    const [depositId, setDepositId] = useState(uuid4());
    const { state, dispatch } = useContext(MsisdnContext);
    const [phoneAlert, setPhoneAlert] = useState('');
    const [receipt, setReceipt] = useState('');
    const [receivedPin, setReceivedPin] = useState(false);
    const [readyToProceed, setReadyToProceed] = useState(false);
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
        const c = initialCountry.correspondents.find(c => c.correspondent == searchParams.get('mno'));
        if (c) {
            initialCorrespondent = c;
        }
    }
    const [country, setCountry] = useState<Country>(initialCountry);
    const [correspondent, setCorrespondent] = useState<string>(initialCorrespondent.correspondent);

    const correspondents = country.correspondents;
    const msisdn = searchParams?.get("msisdn") ? searchParams.get("msisdn") : "";
    const [message, setMessage] = useState({
        message:'',
        status: 'Green',
        paymentType: 'deposit',
        show: false,
        id: depositId});
    const [deposit, setDeposit] = useState({
        depositId: depositId,
        msisdn: msisdn,
        amount: "",
        currency: initialCorrespondent.currency,
        country: initialCountry.country,
        correspondent: initialCorrespondent.correspondent,
        description: "",
        minAmount: initialCorrespondent.operationTypes.find(o => o.operationType === 'DEPOSIT')?.minTransactionLimit,
        maxAmount: initialCorrespondent.operationTypes.find(o => o.operationType === 'DEPOSIT')?.maxTransactionLimit
    });

    const handleCountryEvent = (e: any) => {
        const c = activeConfig.countries.find(data => data.country === (e.target.value));
        if (c) {
            setCountry(c);
            dispatch({ type: 'UPDATE_COUNTRY', payload: c.country});
            deposit.country = c.country;
            deposit.correspondent = c.correspondents[0].correspondent;
            dispatch({ type: 'UPDATE_MNO', payload: deposit.correspondent});
            deposit.currency = c.correspondents[0].currency;
            deposit.minAmount = c.correspondents[0].operationTypes.find(o => o.operationType === 'DEPOSIT')?.minTransactionLimit;
            deposit.maxAmount = c.correspondents[0].operationTypes.find(o => o.operationType === 'DEPOSIT')?.maxTransactionLimit;
        }
        console.log(e.target.value);

    }

    const handleMnoEvent = (e: any) => {
        const c = country.correspondents.find(data => data.correspondent === (e.target.value));
        if (c?.correspondent) {
            setCorrespondent(c.correspondent);
            dispatch({ type: 'UPDATE_MNO', payload: c.correspondent});
            deposit.correspondent = c.correspondent;
            deposit.currency = c.currency;
            deposit.minAmount = c.operationTypes.find(o => o.operationType === 'DEPOSIT')?.minTransactionLimit;
            deposit.maxAmount = c.operationTypes.find(o => o.operationType === 'DEPOSIT')?.maxTransactionLimit;
        }
        console.log(e.target.value);

    }


    let codeStr: any = {
            depositId: depositId,
            amount: deposit.amount,
            currency: deposit.currency,
            country: deposit.country,
            correspondent: deposit.correspondent,
            recipient: {
                type: "MSISDN",
                address: {
                    value: deposit.msisdn
                }
            },
            customerTimestamp: new Date().toISOString(),
            statementDescription: deposit.description
        }


    useEffect(() => {
        document.addEventListener('pinComplete', () => {
            setPhoneAlert('');
            setReceivedPin(true);
        });
    });


    useEffect(() => {
        dispatch({ type: 'UPDATE_MNO', payload: correspondent});
    }, [deposit]);

    useEffect(() => {
        if (receivedPin && readyToProceed){
            getStatus();
        }
    },[receivedPin]);
    useEffect(() => {
        if (receivedPin && readyToProceed){
            getStatus();
        }
    },[readyToProceed]);


    const getStatus = async() =>{
        await fetch(`/api/deposit-check?depositId=${deposit.depositId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
        }).then(async res => {
                if (res.status != 200) {
                    setMessage( {...message, message: `Something went wrong: ${res.statusText}`, show:true});
                } else {
                    const depositResponse = await res.json();
                    console.log(JSON.stringify(depositResponse));
                    if (depositResponse.status === "COMPLETED") {
                        setMessage( {...message, message: `Deposit completed`, status: 'green', show:true,  });
                    } else {
                        setMessage( {...message, message: `Deposit failed`, status:'red', show:true});
                    }
                }
            });
        }


    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (!deposit.msisdn || !deposit.amount || !deposit.currency || !deposit.country || !deposit.correspondent) {
            alert("Please fill all the fields");
            return;
        }
        await fetch("/api/deposit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deposit),
        }).then(async res => {

            if (res.status != 200) {
                setMessage( {...message, message: `Something went wrong: ${res.statusText}`, show:true});
            } else {
                setPhoneAlert('Please enter your PIN on the phone');
                const depositResponse = await res.json();
                deposit.depositId = depositResponse.depositId;
                if (depositResponse.status === "ACCEPTED") {
                    setMessage({...message, message: `Accepted, checking status`, status: 'yellow', show: true});
                    setReadyToProceed(true)
                } else {
                    setPhoneAlert('');
                    setMessage( {...message, message: `Rejected: ${depositResponse.rejectionReason.rejectionMessage}`, status:'red', show:true});
                }
            }
        })
    }


    return (
        <>
            { message.show ? <Status message={message.message}
                                     msgStatus={message.status}
                                     paymentType={message.paymentType}
                                     id={message.id} /> : null }
            <div className="md:flex flex-row gap-5" >
                <div>
                    <form className="w-5/5  mt-5 mb-5"
                                           onSubmit={onSubmit}>
                    <input type="hidden" id="currency" name="currency" value={deposit.currency} />
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
                                       setDeposit({ ...deposit, msisdn: e.target.value });
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
                                       setDeposit({ ...deposit, amount: e.target.value });
                                   }}/>
                        </div>
                        <div className="block ml-2 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            {deposit.currency}
                        </div>

                    </div>
                    <div className="md:flex md:justify-end mb-6">
                        <div className="block ml-2 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Min: {deposit.minAmount} | Max: {deposit.maxAmount}
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
                                    value={correspondent}
                                    onChange={e => handleMnoEvent(e)}>

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
                                   maxLength = {22}
                                  placeholder="Description"
                                   onChange={(e) => {
                                       setDeposit({ ...deposit, description: e.target.value });
                                   }}/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <button type="submit"
                                className="md:w-full flex-shrink-0 bg-purple-600 hover:bg-purple-900 border-purple-600 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded">
                            Deposit
                        </button>
                    </div>
                </form>
                </div>
                <div><WebPhone phoneAlert={phoneAlert} receipt={receipt}></WebPhone></div>
            </div>
            <div>
                <CodeRender message={JSON.stringify(codeStr, null, 2)} transactionType={'DEPOSIT'}/>
            </div>
        </>
    )
}
