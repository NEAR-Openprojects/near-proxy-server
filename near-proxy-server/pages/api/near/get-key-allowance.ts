import { isAccessKeyValid } from "@/src/backend/utils/near-helper";
import type { NextApiRequest, NextApiResponse } from "next/types";


export default async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {

    const rq: { account_id: string, publickey: string } = req.body;

    const keyState = await isAccessKeyValid(rq.account_id, rq.publickey);
    res.status(200).json({ success: true, data: { valid: keyState.valid, allowance: keyState.allowance, fullAccess: keyState.fullAccess } });
}
