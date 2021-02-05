import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ name: 'John Doe' })
}