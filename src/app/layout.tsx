import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">
          <div className="scroll-watcher"></div>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
