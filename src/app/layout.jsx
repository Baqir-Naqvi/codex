import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Codex App",
  description: "Marketplace for digital assets",
};


export default function RootLayout({ children } ) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader 
        color="gray"
        height={5}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
