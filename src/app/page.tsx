import getActiveConfig from "@/lib/getActiveConfig";

import Deposit from "@/components/deposit";

export default async function Home() {
    const activeConfig =  await getActiveConfig();


  return (
    <main>
        <div className="flex flex-col content-center flex-wrap">
            <Deposit data = {activeConfig}></Deposit>
        </div>
    </main>
  )
}
