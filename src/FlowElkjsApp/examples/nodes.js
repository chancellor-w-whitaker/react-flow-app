export const nodes = [
  {
    data: {
      // we need unique ids for the handles (called 'ports' in elkjs) for the layouting
      // an id is structured like: nodeid-source/target-id
      sourceHandles: [{ id: "a-s-a" }, { id: "a-s-b" }, { id: "a-s-c" }],
      targetHandles: [],
      label: "A",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "a",
  },
  {
    data: {
      targetHandles: [{ id: "b-t-a" }, { id: "b-t-b" }, { id: "b-t-c" }],
      sourceHandles: [{ id: "b-s-a" }, { id: "b-s-b" }],
      label: "B",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "b",
  },
  {
    data: {
      targetHandles: [{ id: "c-t-a" }, { id: "c-t-b" }, { id: "c-t-c" }],
      sourceHandles: [{ id: "c-s-a" }, { id: "c-s-b" }],
      label: "C",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "c",
  },
  {
    data: {
      targetHandles: [{ id: "d-t-a" }, { id: "d-t-b" }, { id: "d-t-c" }],
      sourceHandles: [{ id: "d-s-a" }],
      label: "D",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "d",
  },
  {
    data: {
      sourceHandles: [{ id: "e-s-a" }],
      targetHandles: [{ id: "e-t-a" }],
      label: "E",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "e",
  },
  {
    data: {
      targetHandles: [{ id: "f-t-a" }, { id: "f-t-b" }],
      sourceHandles: [{ id: "f-s-a" }],
      label: "F",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "f",
  },
  {
    data: {
      targetHandles: [{ id: "g-t-a" }, { id: "g-t-b" }],
      sourceHandles: [{ id: "g-s-a" }],
      label: "G",
    },
    position: { x: 0, y: 0 },
    type: "elk",
    id: "g",
  },
];
