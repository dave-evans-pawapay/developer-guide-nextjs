import getActiveConfig from "@/lib/getActiveConfig";
import Deposit from "@/components/deposit";
import {Metadata} from "next";
import React from "react";
import Platform from "@/components/platform/platform";
export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Deposit'
};

export default async function Home() {
    const activeConfig =  await getActiveConfig();
  return (
      <>
        <main>
            <Platform></Platform>
            <div className="flex flex-col content-center flex-wrap">
                <Deposit data = {activeConfig}></Deposit>
            </div>
        </main>
      </>
  )
}
