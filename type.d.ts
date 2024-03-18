import {DateTime} from "luxon";

type ActiveConfig = {
    merchantId: string,
    merchantName: string,
    countries: Country[]
}

type testTransaction = {
    country: string,
    currency: string,
    correspondent: string,
    description: string,
    quantity: number,
    errorRatio: number,
    type: string
}

type Country = {
    country: string,
    correspondents: Correspondent[]
}

type Correspondent = {
    correspondent: string,
    currency: string,
    ownerName: string,
    operationTypes: OperationType[]
}

type OperationType = {
    operationType: string,
    minTransactionLimit: string,
    maxTransactionLimit: string,
}

type DepositRequest = {
    depositId: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    payer: Payer,
    customerTimestamp: string,
    statementDescription: string,
    preAuthorisationCode?: string
}

type Payer = {
    type: string,
    address: Address
}

type  PayoutRequest = {
    payoutId: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    recipient: Payer,
    customerTimestamp: string,
    statementDescription: string
}

type RefundRequest = {
    refundId: string,
    depositId: string,
    amount: string
}

type Recipient = {
    type: string,
    address: Address
}

type Address = {
    value: string
}

type Message = {
    message: string,
    status: string
    id: string,
    paymentType: string,
    show: boolean
}

type TestMsisdn = {
    code: string,
    country: string,
    paymentType: string,
    mno: string,
    msisdn: string
    failureReason: string
}

export type User = {
    name: string;
    email: string;
    image: string;
};

export type PhoneMessage = {
    mno: string;
    country: string;
    amount: number;
    company: string;
    currency: string;
}

export type PhoneAlert = {
    mno: string,
    country: string,
    amount: number,
    company: string,
    currency: string,
    marketingMsg: string,
    msisdn: string,
    transId?: string,
    transDate?: string,
    transTime?: string,
    balance: number,
    transAmount?: number,
}
