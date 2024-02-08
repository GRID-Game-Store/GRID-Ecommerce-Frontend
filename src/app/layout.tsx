import "./globals.css";
import type { Metadata } from "next";
import {Header} from "./components/header";
import ThemeRegistry from "./theme/ThemeRegistry";
import { Providers } from "./reactQuery/providers";
import { Footer } from "./components/footer/footer";
import { headers } from 'next/headers';
import parser from 'ua-parser-js';

export const metadata: Metadata = {
  title: "GRID",
  description:
    "We're committed to providing our customers with the best possible gaming experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers()
  const referer = headersList.get('user-agent')
  const parsed = parser(referer?.toString()).device.type || 'desktop'
  console.log(parsed);
  
  return (
    <html lang="en"> 
      <body suppressHydrationWarning={true}>
        <ThemeRegistry deviceType={parsed}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
