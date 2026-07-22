"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AgentNode } from "./editor.constants";

export function AgentNodeComponent({ data, selected }: NodeProps<AgentNode>) {
   return (
      <div
         className={`
            min-w-[160px] rounded-lg border px-4 py-3
            bg-ink-dark text-sand
            transition-colors
            ${selected ? "border-orange shadow-[0_0_0_1px_#d95e28]" : "border-sand/20"}
         `}
      >
         <Handle
            type="target"
            position={Position.Left}
            className="!w-2.5 !h-2.5 !bg-orange !border-0"
         />
         <p className="text-xs font-semibold text-sand leading-none">{data.label}</p>
         {data.description && (
            <p className="text-[10px] text-sand/50 mt-1 leading-snug">{data.description}</p>
         )}
         <Handle
            type="source"
            position={Position.Right}
            className="!w-2.5 !h-2.5 !bg-orange !border-0"
         />
      </div>
   );
}
