import getNearConfig from "@/src/backend/utils/config";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (!req.body.public_key || !req.body.contract_id) {
    return res.status(400).json(
      {
        error: "Not all required parameters are set."
      }
    );
  }
  const config = getNearConfig();
  const referrer = process.env.app_name || "NEAR-Proxy-Server";
  //add callback and read get account_id and public_key
  res.status(200).json(
    {
      url: config.walletUrl + "/login/?referrer=" + referrer + "&public_key=" + req.body.public_key + "&contract_id=" + req.body.contract_id
    }
  );
}
