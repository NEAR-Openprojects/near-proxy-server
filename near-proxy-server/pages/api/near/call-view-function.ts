import { viewFunction } from "@/src/backend/utils/near-helper";
import { WalletRequest } from "@/src/backend/utils/types";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

  const rq: WalletRequest = req.body;
  if (!rq.method_name || !rq.contract_id) {
    res.status(400).json(
      {
        success: false
      }
    );
  }

  if (Object.keys(rq.args || "").length) {
    rq.args = JSON.parse(rq.args as string);
  }
  else {
    rq.args = {};
  }
  const response = await viewFunction(rq.contract_id, rq.method_name, rq.args);

  res.status(200).json(

    { success: true, data: response }

  );
}
