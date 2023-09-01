'use client'
import GetMockMsisdn, {GetUniqueCountries, GetUniqueMno} from "@/lib/getMockMsisdn";
import {useEffect, useLayoutEffect, useState} from "react";
import Link from "next/link";

export  default  function TestMsisdns(props: {}) {
    let msisdns =  GetMockMsisdn();
    const [country, setCountry] =
        useState<string>(msisdns[0].country);
    const [mno, setMno] =
        useState<string>(msisdns[0].mno);
    const uniqueCountries = GetUniqueCountries();

    let uniqueMnos = GetUniqueMno(country);
    let activeMsisdns = GetMockMsisdn(country, mno);

    const handleCountryEvent = (e: any) => {
       updateCountry(e.target.value);
    }
    const handleMnoEvent = (e: any) => {
        updateMno(e.target.value);
    }


    const updateCountry = (country: any) => {
        setCountry(country);
        sessionStorage.setItem('country', country)
        let uniqueMnos = GetUniqueMno(country);
        setMno(uniqueMnos[0]);
        sessionStorage.setItem('mno', uniqueMnos[0])
        msisdns = GetMockMsisdn(country, uniqueMnos[0]);
    }

    const updateMno = (mno: any) => {
        sessionStorage.setItem('mno', mno)
        setMno(mno);
        activeMsisdns = GetMockMsisdn(country, mno);
    }

    return (
        <>
            <div className="flex flex-row gap-5 mt-2 mb-2">
                <div>
                    <select name="country" id="country"
                            defaultValue={country}
                            onChange={e => handleCountryEvent(e)}
                            className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        {uniqueCountries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="mno" id="mno"
                            defaultValue={mno}
                            onChange={e => handleMnoEvent(e)}
                            className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        {uniqueMnos.map(m => (
                            <option key={m} value={m}>{m}</option>
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
                                    <tr key={`${msisdn.paymentType}-${msisdn.msisdn}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                                                <Link
                                                    href={`/${msisdn.paymentType.toLowerCase() === 'deposit' ? '/' : 'payout'}?country=${msisdn.code}&mno=${msisdn.mno}&msisdn=${msisdn.msisdn}`}>
                                                    { msisdn.paymentType}
                                                </Link>
                                            </div>
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
