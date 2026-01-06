import Navbar from "@/components/menus/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
