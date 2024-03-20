"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { mainTheme } from "./main";


export default function ThemeRegistry({
  children,
  deviceType,
}: {
  children: React.ReactNode;
  deviceType: string;
}) {
  const Theme = mainTheme(deviceType);
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
