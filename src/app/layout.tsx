import { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/auth";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="">
          <div className="scroll-watcher"></div>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </>
  );
}
