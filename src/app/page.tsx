import getActiveConfig from "@/lib/getActiveConfig";
import Deposit from "@/components/deposit";
import {Metadata} from "next";
import React from "react";
import { getServerSession } from "next-auth/next"
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Platform from "@/components/platform/platform";
export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Deposit'
};

export default async function Home() {
    const activeConfig =  await getActiveConfig();
    const session = await getServerSession(authOptions)

  return (
      <>
          <Platform></Platform>
        <main>
            <div className="flex flex-col content-center flex-wrap text-gray-800">
                Welcome to the pawapay developer playground.  This app lets you explore our API, and see how it works.
            </div>
        </main>
      </>
  )
}
