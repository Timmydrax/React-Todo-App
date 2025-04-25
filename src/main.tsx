// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";

// const rootElement = document.getElementById("root")!;
// createRoot(rootElement).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; // import from .tsx (no need to specify extension)
import { BrowserRouter } from "react-router-dom";

// The '!' is a non-null assertion operator that tells TypeScript 
// that you're sure the element will exist.
const rootElement = document.getElementById("root")!;

// Create the root and render the app
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);



// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App"; // Ensure this is pointing to your correct App component file

// ReactDOM.render(<App />, document.getElementById("root"));

