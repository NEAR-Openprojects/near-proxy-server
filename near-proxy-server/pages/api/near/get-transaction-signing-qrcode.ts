import { changeFunctionWithAttachment } from "@/src/backend/utils/near-helper";
import { WalletRequest } from "@/src/backend/utils/types";
import type { NextApiRequest, NextApiResponse } from "next/types";
import QRCode from 'qrcode'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

  const rq: WalletRequest = req.body;
  if (!rq.account_id || !rq.private_key || !rq.method_name || !rq.contract_id) {
    return res.status(400).json(
      {
        error: "Not all required parameters are set."
      }
    );
  }

  try {
    const walletUrl = await changeFunctionWithAttachment(rq.account_id, rq.private_key, rq.contract_id, rq.method_name, rq.args, rq.attached_near as string, rq.callback_url);

    const qr = await QRCode.toDataURL(walletUrl.data as string, { type: 'image/png' });

    res.status(200).json(
      {
        success: true,
        url: qr
      }
    );
  }
  catch (err) {
    res.status(400).json(
      {
        error: "Invalid credentials"
      }
    );
  }
}
