
import Payout from "@/components/payout";
import getActiveConfig from "@/lib/getActiveConfig";

import Head from 'next/head'
export default async function Home() {

    const activeConfig =  await getActiveConfig();

  return (
      <>
          <head>
            <title>pawaPay nextjs sandbox - Payout</title>
          </head>
          <main>
            <div className="flex flex-col content-center flex-wrap">
                <Payout data = {activeConfig}></Payout>
            </div>
          </main>
      </>
  )
}
