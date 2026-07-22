"use client";

import { useState } from "react";
import {
   Handle,
   Position,
   useReactFlow,
   useEdges,
   type NodeProps,
} from "@xyflow/react";
import { Plus } from "lucide-react";
import { NodeToolbar } from "./NodeToolbar";
import { useEditor } from "./EditorContext";
import { ICON_MAP, type AgentNode } from "./editor.constants";

const BOX_SIZE = 64;

export function AgentNodeComponent({
   id,
   data,
   selected,
}: NodeProps<AgentNode>) {
   const { deleteElements } = useReactFlow();
   const { openSheet } = useEditor();
   const edges = useEdges();
   const hasOutgoing = edges.some((e) => e.source === id);
   const [hovered, setHovered] = useState(false);

   const Icon = ICON_MAP[data.icon];
   const toolbarVisible = hovered || selected;

   return (
      <div
         className="flex flex-col items-center"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         {/* Row: handle + box + handle/plus */}
         <div className="flex items-center">
            {/* Target handle */}
            <Handle
               type="target"
               position={Position.Left}
               style={{ top: BOX_SIZE / 2, left: 0 }}
               className="!w-2 !h-2 !bg-sand/40 !border-0 !relative !translate-y-0 !translate-x-0 !inset-auto"
            />

            {/* Square icon box */}
            <div
               style={{ width: BOX_SIZE, height: BOX_SIZE }}
               className={`
                  relative flex items-center justify-center rounded-xl border
                  bg-ink-dark transition-colors shrink-0
                  ${selected ? "border-orange shadow-[0_0_0_1px_#d95e28]" : "border-sand/20"}
               `}
            >
               <NodeToolbar visible={toolbarVisible} onDelete={() => deleteElements({ nodes: [{ id }] })} />
               {Icon && <Icon size={26} strokeWidth={1.25} className="text-sand/80" />}
            </div>

            {/* Source handle (connected) or line + plus (not connected) */}
            {hasOutgoing ? (
               <Handle
                  type="source"
                  position={Position.Right}
                  style={{ top: BOX_SIZE / 2 }}
                  className="!w-2 !h-2 !bg-sand/40 !border-0 !relative !translate-y-0 !translate-x-0 !inset-auto"
               />
            ) : (
               <div className="nodrag flex items-center">
                  <div className="w-6 h-px bg-sand/20" />
                  <button
                     onClick={() => openSheet(id)}
                     className="w-5 h-5 rounded-full bg-ink-dark border border-sand/25 text-sand/40 hover:border-orange hover:text-orange transition-colors cursor-pointer inline-flex items-center justify-center shrink-0"
                  >
                     <Plus size={10} strokeWidth={2} />
                  </button>
                  <Handle
                     type="source"
                     position={Position.Right}
                     className="!opacity-0 !w-1 !h-1 !relative !translate-y-0 !translate-x-0 !inset-auto"
                  />
               </div>
            )}
         </div>

         {/* Label below */}
         <p className="mt-2 text-[11px] text-sand/70 text-center max-w-[90px] leading-snug">
            {data.label}
         </p>
      </div>
   );
}
