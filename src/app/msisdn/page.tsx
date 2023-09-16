
import {Metadata} from "next";
import TestMsisdns from "@/components/test-msisdns";

export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Bulk'
};

export default async function Home() {
  return (
      <>
        <div className="text-2xl mt-2 mb-2 font-bold text-gray-800">Test numbers for each country / mno </div>
        <TestMsisdns></TestMsisdns>
      </>
  )
}
