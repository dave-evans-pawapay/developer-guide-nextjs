import Deposit from "@/components/deposit";
import Payout from "@/components/payout";
import getActiveConfig from "@/lib/getActiveConfig";


export default async function Home() {

    const activeConfig =  await getActiveConfig();

  return (
    <main>
        <div className="flex flex-col content-center flex-wrap">
            <Payout data = {activeConfig}></Payout>
        </div>
    </main>
  )
}
