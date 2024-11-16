import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post(
      'https://api.github.com/repos/Jun0908/3d-image-to-music/actions/workflows/main.yml/dispatches',
      {
        ref: 'main',
        inputs: { reason: 'Button clicked' }
      },
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.HACK_TOKEN}` // 環境変数を使用
        }
      }
    );

    res.status(200).json({ message: 'Workflow triggered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to trigger workflow' });
  }
}
