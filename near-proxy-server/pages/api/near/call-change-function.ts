import { changeFunctionWithoutAttachment } from "@/src/backend/utils/near-helper";
import { WalletRequest } from "@/src/backend/utils/types";
import BN from "bn.js";
import { DEFAULT_FUNCTION_CALL_GAS } from "near-api-js";
import type { NextApiRequest, NextApiResponse } from "next/types";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try {
    const rq: WalletRequest = req.body;

    if (Object.keys(rq.args || "").length) {
      rq.args = JSON.parse(rq.args as string);
    }
    else {
      rq.args = {};
    }

    rq.attached_gas = rq.attached_gas || DEFAULT_FUNCTION_CALL_GAS.toString();

    const response = await changeFunctionWithoutAttachment(rq.account_id, rq.private_key, rq.contract_id, rq.method_name, rq.args, new BN(rq.attached_gas));

    res.status(200).json({ success: true, data: response });
  }
  catch (err) {

    res.status(200).json({ success: false, error: err });
  }
}
