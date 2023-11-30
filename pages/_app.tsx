import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import DynamicTitle from "@/components/TitleDynamic";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DynamicTitle />
      <main className={GeistMono.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}
