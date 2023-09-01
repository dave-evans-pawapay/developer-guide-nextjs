
import {Metadata} from "next";
import getActiveConfig from "@/lib/getActiveConfig";
import Refund from "@/components/refund";

export const metadata: Metadata = {
    title: 'pawaPay nextjs sandbox - Refund'
};

export default async function Home() {
    const activeConfig =  await getActiveConfig();
  return (
      <>
              <div className="flex flex-col content-center flex-wrap">
                  <Refund data = {activeConfig}></Refund>
              </div>
      </>
  )
}
