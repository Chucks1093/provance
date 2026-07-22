"use client";

import { useCallback } from "react";
import {
   Handle,
   Position,
   useReactFlow,
   useEdges,
   type NodeProps,
} from "@xyflow/react";
import { Plus } from "lucide-react";
import type { AgentNode } from "./editor.constants";

export function AgentNodeComponent({
   id,
   data,
   selected,
   positionAbsoluteX,
   positionAbsoluteY,
}: NodeProps<AgentNode>) {
   const { addNodes, addEdges } = useReactFlow();
   const edges = useEdges();
   const hasOutgoing = edges.some((e) => e.source === id);

   const handleAddNode = useCallback(() => {
      const newId = `${Date.now()}`;
      addNodes([
         {
            id: newId,
            type: "agent" as const,
            position: { x: positionAbsoluteX + 260, y: positionAbsoluteY },
            data: { label: "New Agent", description: "Click to configure" },
         },
      ]);
      addEdges([
         {
            id: `e${id}-${newId}`,
            source: id,
            target: newId,
            type: "smoothstep",
         },
      ]);
   }, [id, positionAbsoluteX, positionAbsoluteY, addNodes, addEdges]);

   return (
      <div className="relative flex items-center">
         {/* Node card */}
         <div
            className={`
               min-w-[160px] rounded-sm border px-4 py-3
               bg-ink-dark text-sand transition-colors
               ${selected ? "border-orange shadow-[0_0_0_1px_#d95e28]" : "border-sand/20"}
            `}
         >
            <Handle
               type="target"
               position={Position.Left}
               className="!w-2.5 !h-2.5 !bg-orange !border-0"
            />

            {/* when connected: visible source dot on card right, edge goes directly */}
            {hasOutgoing && (
               <Handle
                  type="source"
                  position={Position.Right}
                  className="!w-2.5 !h-2.5 !bg-orange !border-0"
               />
            )}

            <p className="text-xs font-semibold text-sand leading-none">
               {data.label}
            </p>
            {data.description && (
               <p className="text-[10px] text-sand/50 mt-1 leading-snug">
                  {data.description}
               </p>
            )}
         </div>

         {/* when no outgoing: line → + button, source handle lives after button */}
         {!hasOutgoing && (
            <div className="nodrag flex items-center">
               <div className="w-8 h-px bg-sand/25" />
               <button
                  onClick={handleAddNode}
                  className="w-[22px] h-[22px] rounded-full bg-ink-dark border border-sand/30 text-sand/50 hover:border-orange hover:text-orange transition-colors cursor-pointer inline-flex items-center justify-center shrink-0"
               >
                  <Plus size={12} strokeWidth={2} />
               </button>
               <Handle
                  type="source"
                  position={Position.Right}
                  className="!opacity-0 !w-2 !h-2"
               />
            </div>
         )}
      </div>
   );
}
