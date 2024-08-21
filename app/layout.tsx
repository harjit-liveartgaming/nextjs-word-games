import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Art Gaming LLC (Harjit Randhawa) - Nextjs Portfolio",
  description: "Building games with Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-cyan-600">
          <div className="rounded-1xl bg-gradient-to-br from-pink-200 to-transparent p-2">
            {children}
            
          </div>
        </div>
      </body>
    </html>
  );
}
