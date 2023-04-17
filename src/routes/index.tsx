import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts/export";
import Dashboard from "../pages/Dashboard";

export const AppRoutes: React.FC = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
