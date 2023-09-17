import {Metadata} from "next";
import Platform from "@/components/platform/platform";
import React from "react";

export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Bulk'
};

export default async function Home() {
  return (
      <>
          <Platform></Platform>
          <main>
              <div className="flex flex-col content-center flex-wrap">
                    Bulk Payouts - to be done
              </div>
          </main>
      </>
  )
}
