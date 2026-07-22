"use client";

import { Box, Check, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
   Command,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
   DashboardHeaderDropdownTriggerButton,
   DashboardHeaderDropdownWithPopover,
} from "@/components/common/dashboard/DashboardHeaderDropdown";

export interface Project {
   id: string;
   name: string;
}

interface ProjectSelectorProps {
   projects: Project[];
   selectedId: string;
   onSelect: (project: Project) => void;
}

export function ProjectSelector({
   projects,
   selectedId,
   onSelect,
}: ProjectSelectorProps) {
   const [open, setOpen] = useState(false);
   const [search, setSearch] = useState("");

   const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

   const filtered = projects.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
   );

   const commandContent = (
      <Command shouldFilter={false}>
         <CommandInput
            value={search}
            onValueChange={setSearch}
            showResetIcon
            handleReset={() => setSearch("")}
            placeholder="Find project..."
            className="text-base sm:text-sm"
         />
         <CommandList className="max-h-none md:max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandGroup>
               <ScrollArea className={filtered.length > 7 ? "h-[210px]" : ""}>
                  {filtered.length === 0 && (
                     <p className="text-xs text-center text-muted-foreground py-3">
                        No projects found
                     </p>
                  )}
                  {filtered.map((project) => (
                     <CommandItem
                        key={project.id}
                        value={project.id}
                        className="cursor-pointer w-full"
                        onSelect={() => {
                           onSelect(project);
                           setOpen(false);
                           setSearch("");
                        }}
                     >
                        <div className="w-full flex items-center justify-between">
                           <span>{project.name}</span>
                           {project.id === selectedId && (
                              <Check
                                 size={16}
                                 strokeWidth={1.5}
                                 className="text-foreground"
                              />
                           )}
                        </div>
                     </CommandItem>
                  ))}
               </ScrollArea>
            </CommandGroup>
            <div className="h-px bg-border -mx-1 shrink-0" />
            <CommandGroup>
               <CommandItem
                  className="cursor-pointer w-full"
                  onSelect={() => setOpen(false)}
               >
                  <Link
                     href="/dashboard/projects/new"
                     className="w-full flex items-center gap-2"
                  >
                     <Plus size={14} strokeWidth={1.5} />
                     <span>New project</span>
                  </Link>
               </CommandItem>
            </CommandGroup>
         </CommandList>
      </Command>
   );

   return (
      <DashboardHeaderDropdownWithPopover
         linkHref={`/dashboard`}
         linkContent={
            <div className="flex items-center gap-2">
               <Box
                  size={15}
                  strokeWidth={1.5}
                  className="text-muted-foreground"
               />
               <span
                  title={selected?.name}
                  className="text-sand/70 max-w-32 lg:max-w-64 truncate text-sm"
               >
                  {selected?.name}
               </span>
            </div>
         }
         linkClassName="flex items-center gap-2 shrink-0"
         commandContent={commandContent}
         open={open}
         onOpenChange={setOpen}
         triggerButton={
            <DashboardHeaderDropdownTriggerButton
               className="shrink-0"
               aria-label="Switch project"
            />
         }
      />
   );
}
