import type { Node, Edge } from "@xyflow/react";

export type AgentNodeData = {
   label: string;
   icon: string;
   isTrigger?: boolean;
};

export type AgentNode = Node<AgentNodeData, "agent">;
export type AgentEdge = Edge;

export const INITIAL_NODES: AgentNode[] = [
   {
      id: "1",
      type: "agent",
      position: { x: 200, y: 160 },
      data: { label: "Trigger", icon: "/icons/agents/trigger.svg", isTrigger: true },
   },
   {
      id: "2",
      type: "agent",
      position: { x: 310, y: 160 },
      data: { label: "Research Agent", icon: "/icons/agents/sentiment.svg" },
   },
];

export const EDGE_STYLE = { stroke: "rgba(227,216,197,0.3)", strokeWidth: 1.5 };

export const INITIAL_EDGES: AgentEdge[] = [
   { id: "e1-2", source: "1", target: "2", type: "smoothstep", style: EDGE_STYLE },
];
