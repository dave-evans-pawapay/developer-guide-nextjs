import {JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState} from "react";
import Link from "next/link";

export default function Status(props: { message: string, msgStatus: string, paymentType: string, id?: string }){

    return (
        <>
            { props.msgStatus === 'green' ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline mr-4">{props.message}</span>
                <span className="block sm:inline">
                    <Link className="underline"
                    href={`https://dashboard.sandbox.pawapay.cloud/#/transactions/${props.paymentType}/${props.id}`}>
                        ID: {props.id}
                        </Link></span>
            </div> :  props.msgStatus === 'red' ?
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{props.message}</span>
                    <span className="block sm:inline">
                        <Link className="underline"
                                          href={`https://dashboard.sandbox.pawapay.cloud/#/transactions/${props.paymentType}/${props.id}`}>
                        ID: {props.id}
                        </Link>
                    </span>
                </div> :
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{props.message}</span>
                    <span className="block sm:inline">
                        <Link className="underline"
                            href={`https://dashboard.sandbox.pawapay.cloud/#/transactions/${props.paymentType}/${props.id}`}>
                        ID: {props.id}
                        </Link>
                    </span>
                </div>
            }
        </>
    )
}
