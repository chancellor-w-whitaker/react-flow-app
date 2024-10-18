import { faker } from "https://esm.sh/@faker-js/faker@v9.0.3";

const descend = (root, keys) => {
  let node = root;

  for (const key of keys) {
    node = node[key];
  }

  return node;
};

const getUniqueArray = (keys = [], amount = 10) =>
  faker.helpers.uniqueArray(descend(faker, keys), amount);

export const generateLists = () => ({
  reports: getUniqueArray(["internet", "url"]).map((id) => ({
    list: "reports",
    id,
  })),
  users: getUniqueArray(["internet", "email"]).map((id) => ({
    list: "users",
    id,
  })),
  groups: getUniqueArray(["company", "name"]).map((id) => ({
    list: "groups",
    id,
  })),
});
