import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { ConnectionsProvider } from "./context/connections/ConnectionsProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConnectionsProvider>
      <App></App>
    </ConnectionsProvider>
  </StrictMode>
);
