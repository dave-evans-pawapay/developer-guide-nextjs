

export default async function payoutCheckHandler(req: any, res: any) {
    if (req.method !== 'GET') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const { payoutId } = req.query;
    const backoff = [0.5,1,15,30,60,120];
    let r = {
        payoutId: payoutId,
        status: '',
        message: 'An error occurred while processing the payout request'
    }
    for ( let i=0; i<backoff.length; i++) {
        await sleep(backoff[i]);
        const response = await fetch(`${process.env.API_URL}/payouts/${payoutId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY,
            }
        });
        const payoutResponse = await response.json();
        if (response.status != 200) {
            return res.status(response.status).json(payoutResponse);
        } else {
            switch (payoutResponse[0].status) {
                case "COMPLETED":
                    r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: 'Payout request completed successfully'
                    }
                    return res.status(response.status).json(r);
                    break;
                case "SUBMITTED":
                     r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: 'An error occurred while processing the payout request'
                    }
                    break;
                case "FAILED":
                    r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: payoutResponse[0].failureReason.failureMessage
                    }
                    return res.status(response.status).json(r);
                    break;
                case "ENQUEUED":
                    r = {
                        payoutId: payoutResponse[0].payoutId,
                        status: payoutResponse[0].status,
                        message: 'Transaction enqueued request'
                    }
                    return res.status(response.status).json(r);
                    break;
            }
        }
    }
    return res.status(400).json(r);
}

 const sleep = async (seconds: number) => {
    await new Promise(resolve => setTimeout(resolve, seconds*1000));
}
