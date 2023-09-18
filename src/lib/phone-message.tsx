import { DateTime } from "luxon";
export class PhoneMesage {
    mno: string = '';
    country: string = '';
    amount: number = 0;
    company: string = '';
    currency: string = '';

    constructor(){}
    getMessage(): string{
        return `Please confirm payment of ${this.currency} ${this.amount} to ${this.company}?`;
    }
}

export class PhoneAlert {
    mno: string = '';
    country: string = '';
    amount: number = 0;
    company: string = '';
    currency: string = '';
    marketingMsg: string = '';
    msisdn: string = '';
    transId: string = generateId(10);
    transDate: string = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
    transTime: string =  DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);
    balance: number = 0;
    transAmount: number = 0;
    constructor(){
    }
    public getMessage(): string{
        let returnStr =  `${this.transId} Confirmed.  ${this.currency} ${this.amount} sent to ${this.company} for account ${this.msisdn} on ${this.transDate} 
                at ${this.transTime}.  Transaction cost ${this.currency} ${this.amount*0.01}.`;
        if (this.balance > 0){
            returnStr += `  New balance: ${this.currency} ${this.balance}.`;
        }
        if (this.transAmount > 0){
            returnStr += `  Amount you can transact with the day is: ${this.currency} ${this.transAmount}`;
        }
        if (this.marketingMsg.length > 0){
            returnStr += `  ${this.marketingMsg}`;
        }
        return returnStr
    }
}

function dec2hex (dec:any) {
    return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
function generateId (len:number) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}


