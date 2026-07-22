"use client";

import { useState, useMemo } from "react";
import { useReactFlow } from "@xyflow/react";
import { Search } from "lucide-react";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
} from "@/components/ui/sheet";
import { useEditor } from "./EditorContext";
import { ICON_MAP, EDGE_STYLE } from "./editor.constants";

const AGENT_TYPES = [
   { id: "contract-analyzer", label: "Contract Analyzer", icon: "FileSearch", description: "Scans smart contracts for red flags" },
   { id: "sentiment", label: "Sentiment Agent", icon: "MessageSquare", description: "Monitors Twitter/X, Telegram, Discord" },
   { id: "risk-scorer", label: "Risk Scorer", icon: "AlertTriangle", description: "Produces a Low / Medium / High risk score" },
   { id: "alert", label: "Alert Agent", icon: "Bell", description: "Sends reports to Telegram, Discord, or email" },
   { id: "wallet-tracker", label: "Wallet Tracker", icon: "Wallet", description: "Tracks on-chain activity for wallets" },
   { id: "price-monitor", label: "Price Monitor", icon: "TrendingUp", description: "Watches token price and triggers on thresholds" },
   { id: "liquidity-watcher", label: "Liquidity Watcher", icon: "Droplets", description: "Monitors DEX liquidity pools for rug patterns" },
   { id: "nft-monitor", label: "NFT Monitor", icon: "Image", description: "Tracks NFT mints, sales, and floor price" },
   { id: "summarizer", label: "Summarizer", icon: "FileText", description: "Condenses research into a clean report" },
   { id: "webhook", label: "Webhook Agent", icon: "Webhook", description: "Sends data to any external endpoint" },
];

export function AddAgentSheet() {
   const { isSheetOpen, closeSheet, sourceNodeId } = useEditor();
   const { addNodes, addEdges, getNode } = useReactFlow();
   const [search, setSearch] = useState("");

   const filtered = useMemo(() =>
      AGENT_TYPES.filter((a) =>
         a.label.toLowerCase().includes(search.toLowerCase()) ||
         a.description.toLowerCase().includes(search.toLowerCase())
      ),
      [search]
   );

   const handleSelect = (agent: typeof AGENT_TYPES[number]) => {
      if (!sourceNodeId) return;
      const source = getNode(sourceNodeId);
      const newId = `${Date.now()}`;
      addNodes([
         {
            id: newId,
            type: "agent" as const,
            position: {
               x: (source?.position.x ?? 0) + 200,
               y: source?.position.y ?? 0,
            },
            data: { label: agent.label, icon: agent.icon },
         },
      ]);
      addEdges([
         {
            id: `e${sourceNodeId}-${newId}`,
            source: sourceNodeId,
            target: newId,
            type: "smoothstep",
            style: EDGE_STYLE,
         },
      ]);
      closeSheet();
      setSearch("");
   };

   return (
      <Sheet open={isSheetOpen} onOpenChange={(o) => { if (!o) closeSheet(); }}>
         <SheetContent side="right" className="w-72 bg-ink-dark border-sand/15 p-0 flex flex-col">
            <SheetHeader className="px-4 pt-5 pb-3 border-b border-sand/10">
               <SheetTitle className="text-sm text-sand font-semibold">Add Agent</SheetTitle>
            </SheetHeader>

            {/* Search */}
            <div className="px-3 py-3 border-b border-sand/10">
               <div className="flex items-center gap-2 bg-ink border border-sand/15 rounded px-3 py-2">
                  <Search size={12} strokeWidth={1.5} className="text-sand/40 shrink-0" />
                  <input
                     autoFocus
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search agents..."
                     className="flex-1 bg-transparent text-xs text-sand placeholder:text-sand/30 outline-none"
                  />
               </div>
            </div>

            {/* Agent list */}
            <div className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-0.5">
               {filtered.length === 0 && (
                  <p className="text-xs text-sand/30 text-center py-8">No agents found</p>
               )}
               {filtered.map((agent) => {
                  const Icon = ICON_MAP[agent.icon];
                  return (
                     <button
                        key={agent.id}
                        onClick={() => handleSelect(agent)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-left hover:bg-sand/5 transition-colors cursor-pointer"
                     >
                        <div className="w-8 h-8 rounded-lg bg-ink border border-sand/15 flex items-center justify-center shrink-0">
                           {Icon && <Icon size={14} strokeWidth={1.5} className="text-sand/60" />}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                           <span className="text-xs font-medium text-sand leading-none">{agent.label}</span>
                           <span className="text-[10px] text-sand/40 leading-snug truncate">{agent.description}</span>
                        </div>
                     </button>
                  );
               })}
            </div>
         </SheetContent>
      </Sheet>
   );
}
