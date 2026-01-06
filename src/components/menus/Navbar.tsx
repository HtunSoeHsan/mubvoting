"use client";
import Link from "next/link";
import Image from "next/image";
import { conf } from "@/config";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">

        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-gold rounded-full opacity-75 group-hover:opacity-100 blur transition-all duration-300" />
            <Image
              src="/images/logo.png"
              alt="LOGO"
              width={40}
              height={40}
              className="relative rounded-full"
            />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">
            POLY-VOTING
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-8">
          {conf.menus.map((m, i) => (
            <Link
              key={i}
              href={m.link}
              className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive(m.link)
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-accent/50 text-foreground/80 hover:text-foreground"
              }`}
            >
              {m.label}
              {isActive(m.link) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 hover-lift">
              {user ? (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-gold rounded-full opacity-75 blur" />
                  <Image
                    src={user.photoURL || "/young-man.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="relative rounded-full border-2 border-primary/20"
                  />
                </div>
              ) : (
                <Link href="/login" className="px-6 py-2 bg-gradient-to-r from-primary to-gold rounded-full text-primary-foreground font-medium hover-lift">
                  Login
                </Link>
              )}
            </button>
          </DropdownMenuTrigger>

          {user && (
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="glass-card border border-border/50 w-64 p-4 z-[1000]"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/20">
                  <Image
                    src={user.photoURL || "/young-man.png"}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{user.displayName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>

    </nav>
  );
};

export default Navbar;
