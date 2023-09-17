
import Payout from "@/components/payout";
import getActiveConfig from "@/lib/getActiveConfig";
import {Metadata} from "next";
import React from "react";
import Platform from "@/components/platform/platform";
export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Payout'
};
export default async function Home() {

    const activeConfig =  await getActiveConfig();
  return (
      <>
          <Platform></Platform>
          <main>
            <div className="flex flex-col content-center flex-wrap">
                <Payout data = {activeConfig}></Payout>
            </div>
          </main>
      </>
  )
}
