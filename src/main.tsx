import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import { motion } from "framer-motion";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
