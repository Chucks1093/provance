"use client";

import { useState, useEffect } from "react";
import {
   Handle,
   Position,
   useReactFlow,
   useEdges,
   useUpdateNodeInternals,
   type NodeProps,
} from "@xyflow/react";
import { Plus, Zap } from "lucide-react";
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
   const updateNodeInternals = useUpdateNodeInternals();
   const edges = useEdges();
   const hasOutgoing = edges.some((e) => e.source === id);
   const [hovered, setHovered] = useState(false);

   useEffect(() => {
      updateNodeInternals(id);
   }, [id, hasOutgoing, updateNodeInternals]);

   const Icon = ICON_MAP[data.icon];
   const toolbarVisible = hovered || selected;

   return (
      <div
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="relative"
         style={{ width: BOX_SIZE }}
      >
         {/* Box — handles live inside so they center at 50% of box height */}
         <div
            style={{ width: BOX_SIZE, height: BOX_SIZE }}
            className={`
               relative flex items-center justify-center rounded-xl border
               bg-ink-dark transition-colors
               ${selected ? "border-orange shadow-[0_0_0_1px_#d95e28]" : "border-sand/20"}
            `}
         >
            <NodeToolbar
               visible={toolbarVisible}
               onDelete={() => deleteElements({ nodes: [{ id }] })}
            />

            {!data.isTrigger && (
               <Handle
                  type="target"
                  position={Position.Left}
                  className="!w-2 !h-2 !bg-sand/40 !border-0"
               />
            )}
            {hasOutgoing && (
               <Handle
                  type="source"
                  position={Position.Right}
                  className="!w-2 !h-2 !bg-sand/40 !border-0"
               />
            )}

            {Icon && (
               <Icon size={26} strokeWidth={1.25} className="text-sand/80" />
            )}

            {data.isTrigger && (
               <Zap
                  size={12}
                  strokeWidth={2}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 text-orange fill-orange"
               />
            )}
         </div>

         {/* Label below */}
         <p
            className="mt-2 text-[11px] text-sand/70 text-center leading-snug"
            style={{ width: BOX_SIZE }}
         >
            {data.label}
         </p>

         {/* Plus button — absolutely positioned at right-center of box */}
         {!hasOutgoing && (
            <div
               className="nodrag absolute flex items-center"
               style={{
                  top: BOX_SIZE / 2,
                  left: BOX_SIZE,
                  transform: "translateY(-50%)",
               }}
            >
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
                  className="!opacity-0 !w-1 !h-1"
               />
            </div>
         )}
      </div>
   );
}
