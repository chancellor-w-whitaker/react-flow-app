import { lists } from "../constants/lists";
import { connect } from "./connect";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length)];

const getRandomListItem = (listName) => getRandomArrayElement(lists[listName]);

const createRandomConnection = () => {
  const listNames = Object.keys(lists);

  const randomList = getRandomArrayElement(listNames);

  const randomListItem = getRandomListItem(randomList);

  const otherRandomList = getRandomArrayElement(
    listNames.filter((name) => name !== randomList)
  );

  const otherRandomListItem = getRandomListItem(otherRandomList);

  return [randomListItem, otherRandomListItem];
};

export const initializeConnections = () => {
  const array = new Array(25);

  let connections = [];

  for (const element of array) {
    const randomConnection = createRandomConnection();

    connections = connect(connections, randomConnection);
  }

  return connections;
};
