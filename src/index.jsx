import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "./style/index.css";
import Homepage from "./components/HomePage";
import NavBarSection from "./components/NavBarSection";
import Footer from "./components/Footer";
// import HomePage from "./components/Home";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Homepage />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>
);
