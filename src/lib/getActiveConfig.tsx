
import {ActiveConfig} from "../../type";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
export default async function getActiveConfig():Promise<ActiveConfig> {
    const session = await getServerSession(authOptions)
    let url = `${process.env.SANDBOX_API_URL}/active-conf`
    let apiKey = process.env.SANDBOX_API_KEY
    if (session?.user?.email) {
        url = `${process.env.PROD_API_URL}/active-conf`
        apiKey = process.env.PROD_API_KEY
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        }
    })
    if (!res.ok) {
        throw new Error('Failed to fetch API')
    }

    return res.json()
}
