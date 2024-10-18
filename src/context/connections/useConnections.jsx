import { useContext } from "react";

import { ConnectionsContext } from "./ConnectionsContext";

export function useConnections() {
  return useContext(ConnectionsContext);
}
