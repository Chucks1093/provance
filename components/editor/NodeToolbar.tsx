"use client";

import { Play, Power, Trash2, MoreHorizontal } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NodeToolbarProps {
   visible: boolean;
   onDelete: () => void;
}

export function NodeToolbar({ visible, onDelete }: NodeToolbarProps) {
   return (
      <div
         className={`nodrag absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-px bg-ink-dark border border-sand/15 rounded px-0.5 py-0.5 transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
         <button
            title="Run"
            className="w-5 h-5 flex items-center justify-center rounded text-sand/40 hover:text-sand hover:bg-sand/10 transition-colors cursor-pointer"
         >
            <Play size={9} strokeWidth={2} />
         </button>
         <button
            title="Disable"
            className="w-5 h-5 flex items-center justify-center rounded text-sand/40 hover:text-sand hover:bg-sand/10 transition-colors cursor-pointer"
         >
            <Power size={9} strokeWidth={2} />
         </button>
         <button
            onClick={onDelete}
            title="Delete"
            className="w-5 h-5 flex items-center justify-center rounded text-sand/40 hover:text-red-400 hover:bg-sand/10 transition-colors cursor-pointer"
         >
            <Trash2 size={9} strokeWidth={2} />
         </button>

         <div className="w-px h-2.5 bg-sand/15 mx-0.5" />

         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button
                  title="More"
                  className="w-5 h-5 flex items-center justify-center rounded text-sand/40 hover:text-sand hover:bg-sand/10 transition-colors cursor-pointer"
               >
                  <MoreHorizontal size={10} strokeWidth={2} />
               </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-44">
               <DropdownMenuItem>Open</DropdownMenuItem>
               <DropdownMenuItem>Execute step</DropdownMenuItem>
               <DropdownMenuItem>Rename</DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem
                  className="text-red-400 focus:text-red-400"
                  onClick={onDelete}
               >
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
