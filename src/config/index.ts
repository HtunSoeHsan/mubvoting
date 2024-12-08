import { links } from "./link";


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
    contact: {
      mail: "example@gmail.com",
      phone: "5555555555"
    }
 };