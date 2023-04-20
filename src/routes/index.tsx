import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AbrirChamado from '../pages/AbrirChamado'
import ChamadoDetalhe from '../pages/ChamadoDetalhe'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/abrir-chamado" element={<AbrirChamado />} />
      <Route path="/chamado/detalhe/:id" element={<ChamadoDetalhe />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
