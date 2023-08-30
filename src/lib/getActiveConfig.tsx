export default async function getActiveConfig():Promise<ActiveConfig> {
    const res = await fetch(`${process.env.API_URL}/active-conf`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.API_KEY,
        }
    })
    if (!res.ok) {
        throw new Error('Failed to fetch API')
    }

    return res.json()
}
