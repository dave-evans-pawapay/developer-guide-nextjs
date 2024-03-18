
import {Metadata} from "next";
import TestMsisdns from "@/components/test-msisdns";
import Platform from "@/components/platform/platform";
import React from "react";
import GenerateTestTransactions from "@/components/generate-test-transactions";
import getActiveConfig from "@/lib/getActiveConfig";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Test Transactions'
};

export default async function Home() {
    const activeConfig =  await getActiveConfig();
    const session = await getServerSession(authOptions)
  return (
      <>
          {session?.user.email && <div className="flex flex-row justify-center text-red-700 text-2xl">
              <div>Production Environment - Can not generate test transactions</div>
          </div>
          }
          {!session?.user && <div>
              <Platform></Platform>
              <div className="text-2xl mt-2 mb-2 font-bold text-gray-800">Generate Transactions </div>
              <GenerateTestTransactions data = {activeConfig}></GenerateTestTransactions>
          </div>
          }

      </>
  )
}
