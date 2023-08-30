import getActiveConfig from "@/lib/getActiveConfig";
import Deposit from "@/components/deposit";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Deposit'
};

export default async function Home() {
    const activeConfig =  await getActiveConfig();


  return (
      <>
        <head>
            <title>pawaPay nextjs sandbox - Deposit</title>
        </head>
        <main>
            <div className="flex flex-col content-center flex-wrap">
                <Deposit data = {activeConfig}></Deposit>
            </div>
        </main>
      </>
  )
}
