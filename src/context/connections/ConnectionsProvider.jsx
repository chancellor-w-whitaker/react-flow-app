import { useState } from "react";

import { initialConnections } from "./constants/initialConnections";
import { initialListOrder } from "./constants/initialListOrder";
import { changeListOrder } from "./helpers/changeListOrder";
import { ConnectionsContext } from "./ConnectionsContext";
import { connect } from "./helpers/connect";
import { lists } from "./constants/lists";

export function ConnectionsProvider({ children }) {
  const [connections, setConnections] = useState(initialConnections);

  // console.log(connections);

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

  const onConnect = ({ source, target }) => {
    const clickedSource = getClickedItem(...source.split("→"));

    const clickedTarget = getClickedItem(...target.split("→"));

    updateConnections([clickedSource, clickedTarget]);
  };

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

  const [previousRoot, setPreviousRoot] = useState(root);

  if (previousRoot !== root) {
    setPreviousRoot(root);

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

  const context = {
    representListPosition,
    onRootOptionClicked,
    updateListOrder,
    clickedTargetId,
    onClickConfirm,
    onTargetClick,
    listOptions,
    rootOptions,
    archerRoot,
    archerRows,
    onConnect,
    listOrder,
    isRoot,
    root,
  };

  return (
    <ConnectionsContext.Provider value={context}>
      {children}
    </ConnectionsContext.Provider>
  );
}
