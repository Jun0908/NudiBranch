import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = 'https://api.hyperbolic.xyz/v1/image/generation';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HYPERBOLIC_API_KEY}`,
      },
      body: JSON.stringify({
        model_name: 'SD2',
        prompt: req.body.prompt || 'A futuristic cityscape at sunset',
        steps: 30,
        cfg_scale: 5,
        enable_refiner: false,
        height: 1024,
        width: 1024,
        backend: 'auto',
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to generate image' });
    }

    const json = await response.json();
    const output = json.images[0];
    res.status(200).json({ image: output });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
