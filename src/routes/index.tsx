import { Button } from "@mui/material";
import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Button color="primary" variant="contained">
            Teste
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
