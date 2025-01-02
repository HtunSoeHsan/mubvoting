import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const iconLog = "/logo.svg";

  return (
    <>
      <div className=" rounded-sm p-1 flex flex-wrap items-center justify-end">
        <p className="font-xl font-semibold">Htun Soe San</p>
        <Image
          width={400}
          height={400}
          src={iconLog}
          alt="Logo"
          className="max-h-14 mx-2"
        />
      </div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
