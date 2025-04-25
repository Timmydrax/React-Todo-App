
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; 
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root")!;

// Create the root and render the app
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
