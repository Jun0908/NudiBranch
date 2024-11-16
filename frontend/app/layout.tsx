import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import ClientProvider from "./providers/ClientProvider";  // 新しく作成したコンポーネントをインポート

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nudibranch",
  description: "Nudibranch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <ClientProvider>
            {/* ヘッダー */}
            <header className="sticky top-0 border-b bg-white z-0">
            </header>

            {/* トースト */}
            <Toaster />

            <main className="container mx-auto max-w-screen-md flex-1 px-5">
              {children}
            </main>

            {/* フッター */}
           
          </ClientProvider>
        </div>
      </body>
    </html>
  );
}


