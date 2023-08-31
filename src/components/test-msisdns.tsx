'use client'
import GetMockMsisdn from "@/lib/getMockMsisdn";
import {useState} from "react";

export  default function TestMsisdns(props: {}) {
    let msisdns =  GetMockMsisdn();
    const uniqueCountries = msisdns.map((item: TestMsisdn) => item.country)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
    const [country, setCountry] =
        useState<string>(msisdns[0].country);
    const [mno, setMno] =
        useState<string>(msisdns[0].mno);

    let uniqueMnos = msisdns.filter(c => c.country === country).map((item: TestMsisdn) => item.mno)
        .filter((value: any, index: number, self: any) => self.indexOf(value) === index);

    let activeMsisdns = msisdns.filter((item: TestMsisdn) => item.country === country && item.mno === mno);
    const handleCountryEvent = (e: any) => {
        const c = msisdns.filter(data => data.country === (e.target.value));
        if (c) {
            setCountry(e.target.value);
            setMno(c[0].mno);
            let uniqueMnos = msisdns.filter(c => c.country === country).map((item: TestMsisdn) => item.country)
                .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
            let activeMsisdns = msisdns.filter((item: TestMsisdn) => item.country === country && item.mno === mno);
        }
        console.log(e.target.value);
    }
    const handleMnoEvent = (e: any) => {
        const c = msisdns.filter(data => data.mno === (e.target.value));
        if (c) {
            setMno(e.target.value);
            let activeMsisdns = msisdns.filter((item: TestMsisdn) => item.country === country && item.mno === mno);
        }
        console.log(e.target.value);
    }

    return (
        <>
            <div className="flex flex-row gap-5">
                <div>
                    <select name="country" id="country"
                            onChange={e => handleCountryEvent(e)}>
                        {uniqueCountries.map(country => (
                            <option value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="mno" id="mno"
                            onChange={e => handleMnoEvent(e)}>
                        {uniqueMnos.map(mno => (
                            <option value={mno}>{mno}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            msisdn
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Failure Code
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <>
                                { activeMsisdns.map(msisdn => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            { msisdn.paymentType}
                                        </th>
                                        <td className="px-6 py-4">
                                            {msisdn.msisdn}
                                        </td>
                                        <td className="px-6 py-4">
                                            {msisdn.failureReason}
                                        </td>
                                    </tr>
                                ))}
                            </>
                                </tbody>
                            </table>
            </div>
        </>
    )
}