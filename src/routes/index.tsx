import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AbrirChamado from '../pages/AbrirChamado'
import ChamadoDetalhe from '../pages/ChamadoDetalhe'
import { CadastroUsuario } from '../pages/CadastroUsuario'
import { Login } from '../pages/Login'
import { MenuLateral } from '../shared/components/MenuLateral'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route path="/" element={<MenuLateral />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/abrir-chamado" element={<AbrirChamado />} />
        <Route path="/chamado/detalhe/:id" element={<ChamadoDetalhe />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
