import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "./style/index.css";
import HomePage from "./style/Home";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
    <App />
    {/* <HomePage/> */}
    </ThemeProvider>
  </React.StrictMode>
);
