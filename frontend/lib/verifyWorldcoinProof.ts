"use server";

import { VerificationLevel } from "@worldcoin/idkit-core";
import { verifyCloudProof } from "@worldcoin/idkit-core/backend";

export type VerifyReply = {
  success: boolean;
  code?: string;
  attribute?: string | null;
  detail?: string;
};

interface IVerifyRequest {
  proof: {
    nullifier_hash: string;
    merkle_root: string;
    proof: string;
    verification_level: VerificationLevel;
  };
  signal?: string;
}

// 環境変数の読み込みと型アサーション
const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

if (!app_id || !action) {
  throw new Error("Missing necessary Worldcoin configuration environment variables");
}

/**
 * Worldcoinの検証関数
 *
 * @param proof - Worldcoin IDKitの証明オブジェクト
 * @param signal - 任意の追加シグナル
 * @returns VerifyReply - 検証結果
 */
export async function verify(
  proof: IVerifyRequest["proof"],
  signal?: string
): Promise<VerifyReply> {
  try {
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
    
    if (verifyRes.success) {
      return { success: true };
    } else {
      return {
        success: false,
        code: verifyRes.code,
        attribute: verifyRes.attribute,
        detail: verifyRes.detail,
      };
    }
  } catch (error) {
    console.error("Verification failed:", error);
    return {
      success: false,
      code: "verification_error",
      detail: "An error occurred during verification",
    };
  }
}
