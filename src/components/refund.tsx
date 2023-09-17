'use client'

import {useState} from "react";
import Status from "@/components/status";
import uuid4 from "uuid4";
import CodeRender from "@/components/code-render/code-render";
import {ActiveConfig} from "../../type";

export default function Refund(data: any){

    const activeConfig: ActiveConfig = data.data;
    const [refundId, setPayoutId] = useState(uuid4());

    const [message, setMessage] = useState({
        message:'',
        status: 'Green',
        paymentType: 'refund',
        id: refundId,
        show: false});
    const [refund, setRefund] = useState({
        refundId: refundId,
        depositId: "",
        amount: ""
    });
    const codeStr = {
        refundId: refundId,
        depositId: refund.depositId,
        amount: refund.amount
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!refund.depositId || !refund.amount) {
            alert("Please fill all the fields");
            return;
        }

        await fetch("/api/refund", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(refund),
        }).then(async res => {
            if (res.status != 200) {
                setMessage( {...message, message: `Something went wrong: ${res.statusText}`, show:true});
            } else {
                const refundResponse = await res.json();
                if (refundResponse.status === "ACCEPTED") {
                    setMessage( {...message, message: `Accepted, checking status`, status:'yellow', show:true});
                    await fetch(`/api/refund-check?refundId=${refundResponse.refundId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(async res => {
                        if (res.status != 200) {
                            setMessage( {...message, message: `Something went wrong: ${res.statusText}`, show:true});
                        } else {
                            const refundResponse = await res.json();
                            console.log(JSON.stringify(refundResponse));
                            if (refundResponse.status === "COMPLETED") {
                                setMessage( {...message, message: `Refund completed`, status: 'green', show:true});
                            } else {
                                setMessage( {...message, message: `Refund failed: ${refundResponse.message}`, status:'red', show:true});
                            }
                        }
                    });
                } else {
                    setMessage( {...message, message: `Rejected: ${refundResponse.rejectionReason.rejectionMessage}`, status:'red', show:true});
                }
            }
        })
    }


    return (
        <>
            { message.show ? <Status message={message.message}
                                     msgStatus={message.status}
                                     paymentType={message.paymentType}
                                     id={message.id}/> : null }
                <form className="w-3/5  mt-5 mb-5"
                onSubmit={onSubmit}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                DepositId
                            </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                               id="depositId" name="depositId" type="text" placeholder="DepositId"
                               onChange={(e) => {
                                   setRefund({ ...refund, depositId: e.target.value });
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
                                   setRefund({ ...refund, amount: e.target.value });
                               }}/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <button type="submit"
                                className="md:w-full flex-shrink-0 bg-purple-600 hover:bg-purple-900 border-purple-600 hover:border-purple-900 text-sm border-4 text-white py-1 px-2 rounded">
                            Refund
                        </button>
                    </div>
                </form>
            <CodeRender message={JSON.stringify(codeStr, null, 2)} transactionType={'REFUND'}/>
        </>
    )
}
