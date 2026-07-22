import type { Node, Edge } from "@xyflow/react";

export type AgentNodeData = {
   label: string;
   description?: string;
};

export type AgentNode = Node<AgentNodeData, "agent">;
export type AgentEdge = Edge;

export const INITIAL_NODES: AgentNode[] = [
   {
      id: "1",
      type: "agent",
      position: { x: 200, y: 200 },
      data: { label: "Trigger", description: "Starts the workflow" },
   },
   {
      id: "2",
      type: "agent",
      position: { x: 500, y: 200 },
      data: { label: "Research Agent", description: "Gathers information" },
   },
];

const EDGE_STYLE = { stroke: "rgba(227,216,197,0.3)", strokeWidth: 1.5 };

export const INITIAL_EDGES: AgentEdge[] = [
   { id: "e1-2", source: "1", target: "2", type: "smoothstep", style: EDGE_STYLE },
];
