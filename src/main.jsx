import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import VersoApp from "./bookstore/VersoApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <VersoApp />
    </BrowserRouter>
  </StrictMode>,
);
