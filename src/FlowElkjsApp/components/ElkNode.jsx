import { Position, Handle } from "@xyflow/react";

export default function ElkNode({ data }) {
  return (
    <>
      <div className="handles targets">
        {data.targetHandles.map((handle) => (
          <Handle
            position={Position.Left}
            key={handle.id}
            id={handle.id}
            type="target"
          />
        ))}
      </div>
      <div className="label">{data.label}</div>
      <div className="handles sources">
        {data.sourceHandles.map((handle) => (
          <Handle
            position={Position.Right}
            key={handle.id}
            id={handle.id}
            type="source"
          />
        ))}
      </div>
    </>
  );
}
