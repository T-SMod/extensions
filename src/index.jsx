import React from "react";
import { createRoot } from "react-dom/client";
import ExtensionsGallery from "./components/ExtensionsGallery";
import "./css/style.css";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(<ExtensionsGallery />);