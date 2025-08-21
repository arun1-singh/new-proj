import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlexiPlan",
  description: "Pricing + signup demo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Correct place for theme no-flash script */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var saved = localStorage.getItem('theme');
                var mql = window.matchMedia('(prefers-color-scheme: dark)');
                var preferDark = mql.matches;
                var dark = saved ? saved === 'dark' : preferDark;
                if (dark) document.documentElement.classList.add('dark');
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
