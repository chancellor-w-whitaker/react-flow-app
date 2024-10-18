import { ArcherContainer, ArcherElement } from "react-archer";

const rootStyle = { justifyContent: "center", display: "flex" };
const rowStyle = {
  justifyContent: "space-between",
  marginTop: "200px",
  display: "flex",
};
const boxStyle = { border: "1px solid black", padding: "10px" };

const exampleRows = [
  {
    ids: [{ id: "item1" }, { id: "item2" }, { id: "item3" }],
    key: "list1",
  },
  {
    ids: [{ id: "item1" }, { id: "item2" }, { id: "item3" }],
    key: "list2",
  },
];

const exampleRoot = {
  targetIds: [
    `${exampleRows[0].key}→${exampleRows[0].ids[0].id}`,
    `${exampleRows[0].key}→${exampleRows[0].ids[1].id}`,
  ],
  id: "root",
};

const getRelations = (targetIds) =>
  targetIds.map((targetId) => ({
    sourceAnchor: "bottom",
    targetAnchor: "top",
    targetId,
  }));

const getClickedRelation = ({ strokeColor, targetId }) => ({
  style: { strokeDasharray: "5,5", strokeColor },
  sourceAnchor: "bottom",
  targetAnchor: "top",
  targetId,
});

export const ArcherExample = ({
  rows = exampleRows,
  root = exampleRoot,
  clickedTargetId,
  onTargetClick,
}) => {
  const rootRelations =
    root && getRelations(root.targetIds.filter((id) => id !== clickedTargetId));

  if (clickedTargetId) {
    rootRelations.push(
      getClickedRelation({
        strokeColor: root.targetIds.includes(clickedTargetId) ? "black" : "red",
        targetId: clickedTargetId,
      })
    );
  }

  return (
    <div className="overflow-auto p-4">
      <ArcherContainer style={{ width: "fit-content" }} strokeColor="red">
        <div style={rootStyle}>
          <ArcherElement relations={rootRelations} id={root.id}>
            <div style={boxStyle}>{root.id}</div>
          </ArcherElement>
        </div>

        {rows.map(({ ids, key }) => (
          <div style={rowStyle} key={key}>
            {ids.map(({ targetIds = [], id }) => (
              <ArcherElement
                relations={getRelations(targetIds)}
                id={`${key}→${id}`}
                key={id}
              >
                <div
                  onClick={() => onTargetClick({ key, id })}
                  style={boxStyle}
                >
                  {id}
                </div>
              </ArcherElement>
            ))}
          </div>
        ))}
      </ArcherContainer>
    </div>
  );
};
