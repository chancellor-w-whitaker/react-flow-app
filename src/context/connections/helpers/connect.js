const isSameConnection = (connectionA, connectionB) =>
  connectionA.includes(connectionB[0]) && connectionA.includes(connectionB[1]);

export const connect = (connections, newConnection) =>
  connections.some((connection) => isSameConnection(connection, newConnection))
    ? connections.filter(
        (connection) => !isSameConnection(connection, newConnection)
      )
    : [...connections, newConnection];
