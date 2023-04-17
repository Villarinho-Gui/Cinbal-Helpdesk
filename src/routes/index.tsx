import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
