import { Button } from "@mui/material";
import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import {
  useAppThemeContext,
  useDrawerContext,
} from "../shared/contexts/export";

import { GiHamburgerMenu } from "react-icons/gi";

export const AppRoutes: React.FC = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Button
            color="primary"
            variant="contained"
            onClick={toggleDrawerOpen}
          >
            <GiHamburgerMenu />
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
