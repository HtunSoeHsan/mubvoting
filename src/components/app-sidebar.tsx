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
import { Calendar, Home, Inbox, Settings } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Selection",
    url: "/admin/selection",
    icon: Inbox,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: Calendar,
  },

  {
    title: "Log out",
    url: "#",
    icon: Settings,
  },
];

const iconLog = "/logo.svg";

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
                    <a
                      href={item.url}
                      className="mt-1 p-2 text-bold bg-blue-100"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
