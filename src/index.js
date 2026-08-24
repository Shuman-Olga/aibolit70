import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "material-icons/iconfont/material-icons.css";
import "./assets/scss/app.css";

const domNode = document.getElementById("root");

const root = createRoot(domNode);
root.render(<App />);
