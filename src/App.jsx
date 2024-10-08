import { useState } from "react";

import { initialConnections } from "./constants/initialConnections";
import { initialListOrder } from "./constants/initialListOrder";
import { DropdownButton } from "./components/DropdownButton";
import { changeListOrder } from "./helpers/changeListOrder";
import { ArcherExample } from "./components/ArcherExample";
import { DropdownMenu } from "./components/DropdownMenu";
import { DropdownItem } from "./components/DropdownItem";
import { Popover } from "./components/Popover";
import { Divider } from "./components/Divider";
import { Button } from "./components/Button";
import { connect } from "./helpers/connect";
import { lists } from "./constants/lists";

export default function App() {
  const [connections, setConnections] = useState(initialConnections);

  const updateConnections = (newConnection) =>
    setConnections((currentConnections) =>
      connect(currentConnections, newConnection)
    );

  const [listOrder, setListOrder] = useState(initialListOrder);

  const updateListOrder = (optionClicked) => {
    const newListOrder = changeListOrder(listOrder, optionClicked);

    setListOrder(newListOrder);

    const newTopList = newListOrder.length > 0 ? newListOrder[0] : null;

    setRoot(newTopList ? lists[newTopList][0].id : null);
  };

  const listOptions = Object.keys(lists);

  const representListPosition = (listName) =>
    listOrder.some((element) => element === listName)
      ? `(${listOrder.indexOf(listName) + 1})`
      : null;

  const [root, setRoot] = useState(lists[initialListOrder[0]][0].id);

  const onRootOptionClicked = (optionClicked) =>
    setRoot((currentRoot) =>
      currentRoot === optionClicked ? null : optionClicked
    );

  const topList = listOrder.length > 0 ? lists[listOrder[0]] : null;

  const rootOptions = topList ? topList.map(({ id }) => id) : [];

  const isRoot = (option) => option === root;

  const rootItem =
    root && topList ? topList.find(({ id }) => id === root) : null;

  const getClickedItem = (listName, itemName) =>
    lists[listName].find(({ id }) => id === itemName);

  const getConnectionsBetweenLevels = (...levels) => {
    if (listOrder.length > Math.max(...levels)) {
      const indexA = Math.min(...levels);

      const indexB = Math.max(...levels);

      const listA = listOrder[indexA];

      const listB = listOrder[indexB];

      const relevantConnections = connections.filter(
        (connection) =>
          connection.some(({ list }) => list === listA) &&
          connection.some(({ list }) => list === listB)
      );

      const visualization = Object.fromEntries(
        lists[listA].map(({ id }) => [id, new Set()])
      );

      relevantConnections.forEach((connection) => {
        const { id: idA } = connection.find(({ list }) => list === listA);

        const { id: idB } = connection.find(({ list }) => list === listB);

        visualization[idA].add(idB);
      });

      return visualization;
    }
  };

  const visualized = {};

  if (listOrder.length > 1) {
    if (!("0" in visualized)) visualized["0"] = {};

    visualized["0"]["1"] = getConnectionsBetweenLevels(0, 1);
  }

  if (listOrder.length > 2) {
    if (!("0" in visualized)) visualized["0"] = {};

    visualized["0"]["2"] = getConnectionsBetweenLevels(0, 2);
  }

  if (listOrder.length > 2) {
    if (!("1" in visualized)) visualized["1"] = {};

    visualized["1"]["2"] = getConnectionsBetweenLevels(1, 2);
  }

  const levels = listOrder.map((name, index) => ({
    linked:
      visualized[index] &&
      Object.fromEntries(
        Object.entries(visualized[index]).map(([key, value]) => [
          listOrder[key],
          value,
        ])
      ),
    nodes: index === 0 ? [root] : lists[name].map(({ id }) => id),
    name,
  }));

  const getTargetIds = ({ linked, id }) =>
    !linked
      ? []
      : Object.entries(linked)
          .map(([key, object]) =>
            [...object[id]].map((linkedId) => `${key}→${linkedId}`)
          )
          .flat();

  const archerRoot =
    levels.length > 0 &&
    [levels[0]].map(({ linked, nodes, name }) => ({
      targetIds: getTargetIds({ id: nodes[0], linked }),
      id: nodes[0],
      key: name,
    }))[0];

  const archerRows = levels.slice(1).map(({ linked, nodes, name }) => ({
    ids: nodes.map((id) => ({ targetIds: getTargetIds({ linked, id }), id })),
    key: name,
  }));

  // const [clickedTargets, setClickedTargets] = useState([]);

  // const onTargetClick = (clickedTarget) =>
  //   setClickedTargets((nodes) => {
  //     const { key, id } = clickedTarget;

  //     if (nodes.some((node) => node.key === key && node.id === id)) {
  //       return nodes.filter((node) => !(node.key === key && node.id === id));
  //     }

  //     if (nodes.some((node) => node.key === key)) {
  //       return [...nodes.filter((node) => !(node.key === key)), clickedTarget];
  //     }

  //     if (nodes.length < 2) {
  //       return [...nodes, clickedTarget];
  //     }

  //     return nodes;
  //   });

  // const isNodeClicked = ({ key, id }) =>
  //   clickedTargets.some((node) => node.key === key && node.id === id);

  // const styleBox = ({ key, id }) => ({
  //   border: `1px solid ${
  //     typeof isBoxClicked === "function" && isBoxClicked({ key, id })
  //       ? "yellow"
  //       : "black"
  //   }`,
  //   padding: "10px",
  // });

  const [clickedTarget, setClickedTarget] = useState({});

  const clickedTargetId =
    Object.keys(clickedTarget).length > 0
      ? `${clickedTarget.key}→${clickedTarget.id}`
      : null;

  const onTargetClick = (newClickedTarget) =>
    setClickedTarget((currentClickedTarget) =>
      newClickedTarget.key === currentClickedTarget.key &&
      newClickedTarget.id === currentClickedTarget.id
        ? {}
        : newClickedTarget
    );

  const resetClickedTarget = () => setClickedTarget({});

  const [prevRoot, setPrevRoot] = useState(root);

  if (prevRoot !== root) {
    setPrevRoot(root);

    resetClickedTarget();
  }

  const onClickConfirm = () => {
    if (clickedTargetId) {
      updateConnections([
        rootItem,
        getClickedItem(clickedTarget.key, clickedTarget.id),
      ]);

      resetClickedTarget();
    }
  };

  // need to get on click handlers working

  return (
    <main className="container">
      <Divider>
        <Popover
          openUp={
            <DropdownMenu>
              {listOptions.map((option) => (
                <li key={option}>
                  <DropdownItem onClick={() => updateListOrder(option)}>
                    {option} {representListPosition(option)}
                  </DropdownItem>
                </li>
              ))}
            </DropdownMenu>
          }
          openWith={
            <DropdownButton>Order: {listOrder.join(", ")}</DropdownButton>
          }
        ></Popover>
      </Divider>
      <Divider>
        <Popover
          openUp={
            <DropdownMenu>
              {rootOptions.map((option) => (
                <li key={option}>
                  <DropdownItem
                    className={isRoot(option) ? "active" : null}
                    onClick={() => onRootOptionClicked(option)}
                  >
                    {option}
                  </DropdownItem>
                </li>
              ))}
            </DropdownMenu>
          }
          openWith={<DropdownButton>Root: {root}</DropdownButton>}
        ></Popover>
      </Divider>
      <Divider>
        {listOrder.length > 0 && (
          <ArcherExample
            clickedTargetId={clickedTargetId}
            onTargetClick={onTargetClick}
            root={archerRoot}
            rows={archerRows}
          ></ArcherExample>
        )}
      </Divider>
      <Divider>
        <Button disabled={!clickedTargetId} onClick={onClickConfirm}>
          Confirm
        </Button>
      </Divider>
    </main>
  );
}
