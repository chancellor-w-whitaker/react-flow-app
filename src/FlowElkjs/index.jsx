import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlow,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useConnections } from "../context/connections/useConnections";
// import { nodes as initNodes } from "./examples/nodes";
// import { edges as initEdges } from "./examples/edges";
import { archerToFlow } from "./helpers/archerToFlow";
// import useLayoutNodes from "./hooks/useLayoutNodes";
import ElkNode from "./components/ElkNode";

const nodeTypes = {
  elk: ElkNode,
};

// positioning is working!
// need to have controlled connecting of nodes
// get dropdowns back

function Component() {
  const {
    onConnect = (e) => console.log(e),
    archerRoot: root,
    archerRows: rows,
  } = useConnections();

  const { nodes: initialNodes, edges: initialEdges } = archerToFlow({
    rows,
    root,
  });

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // useLayoutNodes();

  // console.log(archerRoot, archerRows);

  return (
    <ReactFlow
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      nodes={nodes}
      edges={edges}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Component />
    </ReactFlowProvider>
  );
}
