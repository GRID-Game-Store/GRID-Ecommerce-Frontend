import "./globals.css";

import type { Metadata } from "next";
import { headers } from "next/headers";
import parser from "ua-parser-js";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header";
import { Providers } from "./reactQuery/providers";
import ThemeRegistry from "./theme/ThemeRegistry";
import SessionProviderWrapper from "./utils/sessionProviderWrapper";
import React from "react";
import { AIWrapper } from "./components/ai/aiWrapper";

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
  const headersList = headers();
  const referer = headersList.get("user-agent");
  const parsed = parser(referer?.toString()).device.type || "desktop";

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeRegistry deviceType={parsed}>
          <Providers>
            <SessionProviderWrapper>
              <Header />
              {children}
              <AIWrapper />
              <Footer />
            </SessionProviderWrapper>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
