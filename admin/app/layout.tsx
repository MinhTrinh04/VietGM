import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/vgm";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import "svgmap/dist/svgMap.min.css";

const inter = Inter({ subsets: ["latin"] });

import localFont from 'next/font/local';

export const beVietnamPro = localFont({
  src: [
    {
      path: './Styles/fonts/BeVnPro/BeVietnamPro-Regular.ttf',
      weight: '400', // Điều chỉnh nếu font có nhiều weight
      style: 'normal',
    },
  ],
  variable: '--font-bevnpro', 
});

export const lodeStone = localFont({
  src: [
    {
      path: './Styles/fonts/LodeStone/iCielBC-Lodestone.ttf',
      weight: '400', // Điều chỉnh nếu font có nhiều weight
      style: 'normal',
    },
  ],
  variable: '--font-lodestone',
});

export const phuDu = localFont({
  src: [
    {
      path: './Styles/fonts/PhuDu/Phudu-Regular.ttf',
      weight: '400', // Điều chỉnh nếu font có nhiều weight
      style: 'normal',
    },
  ],
  variable: '--font-phudu',
});



export const metadata: Metadata = {
  title: "Dashboard | Vietgourmet",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" data-theme="light">
      <body className={`${lodeStone.variable} ${beVietnamPro.variable} ${phuDu.variable}`}>
        <SessionProvider session={session}>
          <Header isClient={false}/>
          <Providers>{children}</Providers>
          {/* <Footer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
