import { links } from "./link";
import { Calendar, Home, Inbox, Settings } from "lucide-react";


export const conf = {
    site: {link: links.homme, label: "www.mubvoting.com"},
    site_title: "Voting System",
    resolution: {h:1920, w:1080 },
    icon: "",
    menus: [

        {
          link: links.king,
          label: "King",
        },
        {
          link: links.queen,
          label: "Queen",
        },
        {link: links.popular, label: "Popular"},
        {link: links.innocent, label: "Innocent"}
        
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