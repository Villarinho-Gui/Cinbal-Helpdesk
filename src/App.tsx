import React from "react";

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
