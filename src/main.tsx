import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// React v18からは、createRootを用いることで、concurrent modeを実現できる
createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);
