import { NextResponse } from "next/server";
import { verify } from "@/lib/verifyWorldcoinProof";

export async function POST(req: Request) {
  try {
    const { proof, signal } = await req.json();

    if (!proof) {
      return NextResponse.json(
        { success: false, detail: "Missing proof data" },
        { status: 400 }
      );
    }

    const result = await verify(proof, signal);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("Error in verification:", error);
    return NextResponse.json(
      { success: false, detail: "Internal Server Error" },
      { status: 500 }
    );
  }
}
