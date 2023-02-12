import { changeFunctionWithAttachment } from "@/src/backend/utils/near-helper";
import { WalletRequest } from "@/src/backend/utils/types";
import { NextApiRequest, NextApiResponse } from "next/types";


export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {

  const rq: WalletRequest = req.body;

  const response = await changeFunctionWithAttachment(rq.account_id, rq.private_key, rq.contract_id, rq.method_name, rq.args, rq.attached_near as string, rq.callback_url);

  res.status(200).json(response);


}
