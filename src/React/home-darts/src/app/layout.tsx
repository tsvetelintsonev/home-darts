'use client';

import './globals.css'
import { Inter } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import deepPurple from '@mui/material/colors/deepPurple';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const darkGreyBackground = '#373740';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#2a2a30',
    },
    primary: {
      main: deepPurple['A200']
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkGreyBackground,
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <html lang="en">
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  )
}
