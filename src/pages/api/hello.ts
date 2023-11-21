// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mainAi from '../../utils/openai-config'

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const answer = await mainAi(req.body.question)
  res.status(200).json({ answer })
}


