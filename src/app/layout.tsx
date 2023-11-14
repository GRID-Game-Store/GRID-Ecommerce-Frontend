import "./globals.css";
import type { Metadata } from "next";
import {Header} from "./components/header";
import ThemeRegistry from "./theme/ThemeRegistry";


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
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
