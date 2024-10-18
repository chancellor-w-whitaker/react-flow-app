export const archerToFlow = ({ rows, root }) => {
  const flattenedRows = [
    [root].map(({ key, id, ...rest }) => ({
      id: `${key}→${id}`,
      key,
      ...rest,
    })),
    ...rows.map(({ ids, key }) =>
      ids.map(({ id, ...rest }) => ({ id: `${key}→${id}`, key, ...rest }))
    ),
  ].flat();

  console.log(flattenedRows);

  const grouped = {};

  const keys = [];

  flattenedRows.forEach((row) => {
    const { key } = row;

    if (!(key in grouped)) {
      grouped[key] = [];

      keys.push(key);
    }

    grouped[key].push(row);

    row.position = {
      y: grouped[key].indexOf(row) * 50,
      x: keys.indexOf(key) * 400,
    };
  });

  const levels = [...new Set(flattenedRows.map(({ key }) => key))];

  const getHandles = ({ level, id }) => {
    const defaultHandles = {
      sourceHandles: [{ id: `${id}-s-a` }],
      targetHandles: [{ id: `${id}-t-a` }],
    };

    const { sourceHandles, targetHandles } = defaultHandles;

    if (levels.indexOf(level) === 0) {
      return { targetHandles: [], sourceHandles };
    }

    if (levels.indexOf(level) === levels.length - 1) {
      return { sourceHandles: [], targetHandles };
    }

    return defaultHandles;
  };

  const nodes = flattenedRows.map(({ key: level, id, ...rest }) => ({
    data: {
      ...getHandles({ level, id }),
      label: id.split("→")[1],
    },
    type: "elk",
    id,
    ...rest,
  }));

  const edges = nodes
    .map(({ targetIds = [], id: source }) =>
      targetIds.map((target) => ({
        sourceHandle: `${source}-s-a`,
        targetHandle: `${target}-t-a`,
        id: `${source}-${target}`,
        source,
        target,
      }))
    )
    .flat();

  const data = { nodes: nodes.map(({ targetIds, ...node }) => node), edges };

  // console.log(data);

  return data;
};
