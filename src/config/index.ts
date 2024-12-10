import { links } from "./link";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";


export const conf = {
    site: {link: links.homme, label: "www.mubvoting.com"},
    site_title: "Voting System",
    icon: "",
    menus: [
        {
          link: links.homme,
          label: "Home",
        },
        {
          link: links.contact,
          label: "Contact",
        },
        {
          link: links.login,
          label: "Login",
        },
        
      ],
    admin_menu:[
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
      },
      {
        title: "Users",
        url: "/admin/users",
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
    ],
    contact: {
      mail: "example@gmail.com",
      phone: "5555555555"
    }
 };