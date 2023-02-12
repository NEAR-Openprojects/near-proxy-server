import type { NextApiRequest, NextApiResponse } from "next/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  //TODO
  res.status(200).json(
    {
      success: true
    }
  );
}
