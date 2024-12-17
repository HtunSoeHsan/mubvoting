import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const 
items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "User",
    url: "/admin/user",
    icon: Inbox,
  },
  {
    title: "Selection",
    url: "/admin/selection",
    icon: Calendar,
  },
 
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const iconLog = '/logo.svg'; 

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
         <div className="mb-6 rounded-sm p-1 flex items-center ">
       <img src={iconLog} alt="Logo" className="max-h-24 mx-2"/>
       <p className="font-xl font-semibold">Voting</p>
    
         </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="mt-1 p-2 text-bold bg-blue-100">
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
