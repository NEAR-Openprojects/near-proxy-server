import type { NextApiRequest, NextApiResponse } from "next/types";
import * as nearAPI from "near-api-js";
const b58 = require('b58');


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let pair = nearAPI.utils.KeyPairEd25519.fromRandom();
  const privateKey = pair.secretKey
  const pub = pair.getPublicKey().data
  const pubKey = Buffer.from(pub).toString('hex')
  const publicKey = "ed25519:" + b58.encode(Buffer.from(pubKey.toUpperCase(), 'hex'))

  res.status(200).json(
    {
      privateKey,
      publicKey
    }
  );
}
