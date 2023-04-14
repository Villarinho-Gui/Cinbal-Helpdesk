import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<p>Teste</p>} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
