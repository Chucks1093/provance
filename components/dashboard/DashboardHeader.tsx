"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Bot, Store, Search } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeaderDivider } from "@/components/common/dashboard/HeaderDivider";
import {
   ProjectSelector,
   type Project,
} from "@/components/common/dashboard/ProjectSelector";
import ProvanceLogo from "@/components/shared/ProvanceLogo";
import { useAuthStore } from "@/stores/useAuthStore";

const PROJECTS: Project[] = [{ id: "1", name: "My Workspace" }];

export default function DashboardHeader() {
   const router = useRouter();
   const user = useAuthStore((s) => s.user);
   const clearUser = useAuthStore((s) => s.clearUser);
   const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);

   const handleLogout = async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      clearUser();
      router.push("/");
   };

   const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

   return (
      <header className="flex h-12 shrink-0 items-center border-b border-sand-faint bg-ink-dark w-full px-3 gap-1">
         {/* Logo */}
         <Link href="/dashboard" className="flex items-center shrink-0 px-1">
            <ProvanceLogo className="h-10 w-auto text-sand" />
         </Link>

         <HeaderDivider />

         {/* Project selector */}
         <ProjectSelector
            projects={PROJECTS}
            selectedId={selectedProjectId}
            onSelect={(p) => setSelectedProjectId(p.id)}
         />

         {/* Spacer */}
         <div className="flex-1" />

         {/* Search */}
         <button className="hidden md:flex h-7 items-center gap-2 rounded-full border border-sand-faint bg-transparent px-3 text-xs text-sand/40 hover:text-sand/70 transition-colors cursor-pointer">
            <Search size={12} strokeWidth={1.5} />
            <span>Search...</span>
            <kbd className="text-[10px] text-sand/25 border border-sand-faint rounded px-1">
               ⌘K
            </kbd>
         </button>

         {/* User dropdown */}
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button className="flex size-8 items-center justify-center rounded-full bg-orange/20 text-orange text-xs font-bold hover:bg-orange/30 transition-colors cursor-pointer border border-orange/20">
                  {initial}
               </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-52">
               <div className="px-2 py-1.5 flex flex-col gap-0.5">
                  <span className="text-sm text-foreground font-medium truncate">
                     {user?.name ?? "—"}
                  </span>
                  {user?.email && (
                     <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                     </span>
                  )}
               </div>
               <DropdownMenuSeparator />
               <DropdownMenuItem asChild className="cursor-pointer gap-2">
                  <Link href="/dashboard/agents">
                     <Bot
                        size={14}
                        strokeWidth={1.5}
                        className="text-muted-foreground"
                     />
                     My Agents
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuItem asChild className="cursor-pointer gap-2">
                  <Link href="/dashboard/marketplace">
                     <Store
                        size={14}
                        strokeWidth={1.5}
                        className="text-muted-foreground"
                     />
                     Marketplace
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                  onSelect={handleLogout}
               >
                  <LogOut size={14} strokeWidth={1.5} />
                  Log out
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </header>
   );
}
