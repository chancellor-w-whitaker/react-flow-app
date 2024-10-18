import { useNodesInitialized, useReactFlow } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { useEffect } from "react";

// elk layouting options can be found here:
// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
const layoutOptions = {
  "elk.layered.spacing.edgeNodeBetweenLayers": "40",
  "elk.layered.nodePlacement.strategy": "SIMPLE",
  "elk.spacing.nodeNode": "40",
  "elk.algorithm": "layered",
  "elk.direction": "RIGHT",
};

const elk = new ELK();

// uses elkjs to give each node a layouted position
export const getLayoutedNodes = async (nodes, edges) => {
  const graph = {
    children: nodes.map((n) => {
      const targetPorts = n.data.targetHandles.map((t) => ({
        // ⚠️ it's important to let elk know on which side the port is
        // in this example targets are on the left (WEST) and sources on the right (EAST)
        properties: {
          side: "WEST",
        },
        id: t.id,
      }));

      const sourcePorts = n.data.sourceHandles.map((s) => ({
        properties: {
          side: "EAST",
        },
        id: s.id,
      }));

      return {
        // ⚠️ we need to tell elk that the ports are fixed, in order to reduce edge crossings
        properties: {
          "org.eclipse.elk.portConstraints": "FIXED_ORDER",
        },
        // we are also passing the id, so we can also handle edges without a sourceHandle or targetHandle option
        ports: [{ id: n.id }, ...targetPorts, ...sourcePorts],
        height: n.height ?? 50,
        width: n.width ?? 150,
        id: n.id,
      };
    }),
    edges: edges.map((e) => ({
      sources: [e.sourceHandle || e.source],
      targets: [e.targetHandle || e.target],
      id: e.id,
    })),
    layoutOptions,
    id: "root",
  };

  const layoutedGraph = await elk.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const layoutedNode = layoutedGraph.children?.find(
      (lgNode) => lgNode.id === node.id
    );

    return {
      ...node,
      position: {
        x: layoutedNode?.x ?? 0,
        y: layoutedNode?.y ?? 0,
      },
    };
  });

  return layoutedNodes;
};

export default function useLayoutNodes() {
  const nodesInitialized = useNodesInitialized();
  const { getNodes, getEdges, setNodes, fitView } = useReactFlow();

  useEffect(() => {
    if (nodesInitialized) {
      const layoutNodes = async () => {
        const layoutedNodes = await getLayoutedNodes(getNodes(), getEdges());

        setNodes(layoutedNodes);
        setTimeout(() => fitView(), 0);
      };

      layoutNodes();
    }
  }, [nodesInitialized, getNodes, getEdges, setNodes, fitView]);

  return null;
}
