import type { Node, Edge } from "@xyflow/react";
import {
   Zap, Search, FileSearch, MessageSquare, AlertTriangle,
   Bell, Wallet, TrendingUp, Droplets, Image, FileText, Webhook,
   type LucideIcon,
} from "lucide-react";

export type AgentNodeData = {
   label: string;
   icon: string;
};

export type AgentNode = Node<AgentNodeData, "agent">;
export type AgentEdge = Edge;

export const ICON_MAP: Record<string, LucideIcon> = {
   Zap,
   Search,
   FileSearch,
   MessageSquare,
   AlertTriangle,
   Bell,
   Wallet,
   TrendingUp,
   Droplets,
   Image,
   FileText,
   Webhook,
};

export const INITIAL_NODES: AgentNode[] = [
   {
      id: "1",
      type: "agent",
      position: { x: 200, y: 160 },
      data: { label: "Trigger", icon: "Zap" },
   },
   {
      id: "2",
      type: "agent",
      position: { x: 420, y: 160 },
      data: { label: "Research Agent", icon: "Search" },
   },
];

export const EDGE_STYLE = { stroke: "rgba(227,216,197,0.3)", strokeWidth: 1.5 };

export const INITIAL_EDGES: AgentEdge[] = [
   { id: "e1-2", source: "1", target: "2", type: "smoothstep", style: EDGE_STYLE },
];
