type ActiveConfig = {
    merchantId: string,
    merchantName: string,
    countries: Country[]
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
