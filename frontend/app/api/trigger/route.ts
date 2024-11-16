import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

// `exec` を Promise 化
const execPromise = util.promisify(exec);

export async function POST() {
  try {
    // Step 1: 画像生成スクリプトを実行
    const generateCommand = 'python generate_images.py';
    const { stdout: generateOutput, stderr: generateError } = await execPromise(generateCommand);

    if (generateError) {
      console.error(`Image generation error: ${generateError}`);
      return NextResponse.json({ error: 'Image generation failed', details: generateError }, { status: 500 });
    }

    console.log(`Image generation output: ${generateOutput}`);

    // Step 2: FIDスコア計算を実行
    const fidCommand = 'python -m pytorch_fid real_images generated_images';
    const { stdout: fidOutput, stderr: fidError } = await execPromise(fidCommand);

    if (fidError) {
      console.error(`FID calculation error: ${fidError}`);
      return NextResponse.json({ error: 'FID calculation failed', details: fidError }, { status: 500 });
    }

    console.log(`FID calculation output: ${fidOutput}`);

    // 成功時のレスポンスを返す
    return NextResponse.json({
      message: 'Process completed successfully',
      generateOutput,
      fidOutput,
    });
  } catch (err: any) {
    console.error(`Unexpected error: ${err.message}`);
    return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: 500 });
  }
}
