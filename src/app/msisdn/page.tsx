import {Metadata} from "next";
import GetMockMsisdn from "@/lib/getMockMsisdn";
import TestMsisdns from "@/components/test-msisdns";

export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Bulk'
};

export default async function Home() {
    let msisdns = await GetMockMsisdn();
    const uniqueCountries = msisdns.map((item: TestMsisdn) => item.country)
            .filter((value: any, index: number, self: any) => self.indexOf(value) === index);
  return (
      <>
        <div className="text-2xl font-bold">Test numbers for each country / mno </div>
        <TestMsisdns></TestMsisdns>
      </>
  )
}
