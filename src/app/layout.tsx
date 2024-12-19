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
          <SessionProvider>{children}</SessionProvider>
        </body>
      </html>
    </>
  );
}
