"use client";

import { useCallback, useMemo } from "react";
import {
   ReactFlow,
   ReactFlowProvider,
   Background,
   BackgroundVariant,
   Controls,
   MiniMap,
   addEdge,
   useNodesState,
   useEdgesState,
   type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AgentNodeComponent } from "./AgentNode";
import {
   INITIAL_NODES,
   INITIAL_EDGES,
   type AgentEdge,
} from "./editor.constants";

function Canvas() {
   const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
   const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

   const nodeTypes = useMemo(() => ({ agent: AgentNodeComponent }), []);

   const onConnect = useCallback(
      (connection: Connection) =>
         setEdges((eds) => addEdge(connection, eds) as AgentEdge[]),
      [setEdges],
   );

   return (
      <ReactFlow
         nodes={nodes}
         edges={edges}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
         nodeTypes={nodeTypes}
         fitView
         proOptions={{ hideAttribution: true }}
         className="bg-ink"
      >
         <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#e3d8c520"
         />
         <Controls className="[&>button]:bg-ink-dark [&>button]:border-sand/20 [&>button]:text-sand [&>button:hover]:bg-sidebar-accent" />
         <MiniMap
            nodeColor="#d95e28"
            maskColor="#1d1d1d99"
            className="!bg-ink-dark !border !border-sand/20"
         />
      </ReactFlow>
   );
}

export function EditorCanvas() {
   return (
      <ReactFlowProvider>
         <Canvas />
      </ReactFlowProvider>
   );
}
