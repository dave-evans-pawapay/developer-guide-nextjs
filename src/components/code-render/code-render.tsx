'use client'
import {JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState} from "react";

export default function CodeRender(props: { message: string, transactionType: string }){
    let prelim = `const fetch = require('node-fetch');
const bodyData = ${props.message};
const resp =await fetch('https://api.sandbox.pawapay.com/deposits',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <YOUR_API_KEY>',
            },
        body: bodyData
       });
const data= await resp.json();
console.log(data);`
    if (props.transactionType === 'PAYOUT') {
        prelim = `const fetch = require('node-fetch');
const bodyData = ${props.message};
const resp =await fetch('https://api.sandbox.pawapay.com/payouts',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <YOUR_API_KEY>',
            },
        body: bodyData
       });
const data= await resp.json();
console.log(data);`
    }

    return (
        <>
            <div className="relative max-w-10xl mx-auto mt-24">
                <div className="bg-gray-900 text-white p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Code:</span>
                    </div>
                    <div className="overflow-x-auto">
                        <pre id="code" className="text-gray-300">
                            <code>
                                {prelim}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </>
    )
}
