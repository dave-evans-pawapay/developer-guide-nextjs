

export default async function depositCheckHandler(req: any, res: any) {
    if (req.method !== 'GET') {
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    const { depositId } = req.query;
    const backoff = [0.5,1,15,30,60,120];
    let r = {
        depositId: depositId,
        status: '',
        message: 'An error occurred while processing the deposit request'
    }
    for ( let i=0; i<backoff.length; i++) {
        await sleep(backoff[i]);
        const response = await fetch(`${process.env.API_URL}/deposits/${depositId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY,
            }
        });
        const depositResponse = await response.json();
        if (response.status != 200) {
            return res.status(response.status).json(depositResponse);
        } else {
            switch (depositResponse[0].status) {
                case "COMPLETED":
                    r = {
                        depositId: depositResponse[0].depositId,
                        status: depositResponse[0].status,
                        message: 'Deposit request completed successfully'
                    }
                    return res.status(response.status).json(r);
                    break;
                case "SUBMITTED":
                     r = {
                        depositId: depositResponse[0].depositId,
                        status: depositResponse[0].status,
                        message: 'An error occurred while processing the deposit request'
                    }
                    break;
                case "FAILED":
                    r = {
                        depositId: depositResponse[0].depositId,
                        status: depositResponse[0].status,
                        message: depositResponse[0].failureReason.failureMessage
                    }
                    return res.status(response.status).json(r);
                    break;
                case "ENQUEUED":
                    r = {
                        depositId: depositResponse[0].depositId,
                        status: depositResponse[0].status,
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
