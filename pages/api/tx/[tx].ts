// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../../lib/data";
import { BlockData } from "../../../lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlockData | null>) {
  const { tx } = req.query;

  if (typeof tx === "string") {
    const data = await getData(tx);
    res.status(200).json(data);
  } else {
    res.status(400);
  }
}
