"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { links } from "@/config/link";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <>
      <div className=" rounded-sm p-1 flex flex-wrap items-center justify-end">
        <DropdownMenu>
          {/* Trigger Button */}
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-4">
              {user ? (
                <Image
                  src={user.photoURL || "/young-man.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <Link href={links.login}>Login</Link>
              )}
            </button>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          {user && (
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="bg-white shadow-lg rounded-md w-48 p-3 z-[1000] text-black"
            >
              {/* User Info */}
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-bold">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>

              {/* Logout Button */}
              <DropdownMenuItem asChild>
                <button
                  onClick={logout} // Replace with actual logout function
                  className="w-full text-left text-sm text-red-500 hover:bg-gray-100 p-2 rounded flex gap-1"
                >
                  <LogOut /> Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
