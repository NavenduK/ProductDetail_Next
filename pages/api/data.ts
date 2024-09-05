import type { NextApiRequest, NextApiResponse } from 'next';
import { product } from '../../public/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(product);
}