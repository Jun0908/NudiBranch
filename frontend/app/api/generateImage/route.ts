import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = 'https://api.hyperbolic.xyz/v1/image/generation';

  try {
    const body = await request.json();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HYPERBOLIC_API_KEY}`,
      },
      body: JSON.stringify({
        model_name: 'SD2',
        prompt: body.prompt || 'A futuristic cityscape at sunset',
        steps: 30,
        cfg_scale: 5,
        enable_refiner: false,
        height: 1024,
        width: 1024,
        backend: 'auto',
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to generate image' }, { status: response.status });
    }

    const json = await response.json();
    const output = json.images[0];
    return NextResponse.json({ image: output });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

