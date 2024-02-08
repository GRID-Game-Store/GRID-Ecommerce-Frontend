'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { mainTheme } from './main';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';

export default function ThemeRegistry({ children, deviceType }: { children: React.ReactNode, deviceType: string }) {
  const Theme = mainTheme(deviceType)
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={Theme}>
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
