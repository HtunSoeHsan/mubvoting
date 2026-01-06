import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { conf } from "@/config";
import Link from "next/link";

const iconLog = "/images/logo.png";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="mb-6 rounded-sm p-1 flex items-center ">
            <img src={iconLog} alt="Logo" className="max-h-24 mx-2" />
            <p className="font-xl font-semibold">Voting</p>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {conf.admin_menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="mt-1 p-2 text-bold"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
