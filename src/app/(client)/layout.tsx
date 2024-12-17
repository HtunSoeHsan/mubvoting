import Navbar from "@/components/menus/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {" "}
      <Navbar />
      {children}
    </div>
  );
}
