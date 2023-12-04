// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import mainAi from '../../utils/openai-config';
import Cors from 'cors';

type Data = {
  answer: string;
};

const cors = Cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'POST'],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  fn: (
    arg0: NextApiRequest,
    arg1: NextApiResponse<Data>,
    arg2: (result: any) => void,
  ) => void,
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, async (result) => {
      if (result instanceof Error) {
        res.status(404);
        return reject(result);
			}

			const answer = await mainAi( req.body.question, req.body.cards );

			res.status(200).json({ answer });
      resolve();
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    await runMiddleware(req, res, cors);
  } catch (e) {
    console.log(e);
    res.status(500).json({ answer: 'Internal Server Error' });
  }
}
