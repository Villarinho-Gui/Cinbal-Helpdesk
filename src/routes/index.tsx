import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ChamadoDetalhe from '../pages/ChamadoDetalhe'
import { CadastroUsuario } from '../pages/LoginLayout/CadastroUsuario'
import { LoginLayout } from '../pages/LoginLayout'
import { MenuLateral } from '../shared/components/MenuLateral'
import { Login } from '../pages/LoginLayout/Login'
import AbrirChamado from '../pages/AbrirChamado'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/cadastro" element={<CadastroUsuario />} />
      </Route>
      <Route path="/" element={<MenuLateral />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/abrir-chamado" element={<AbrirChamado />} />
        <Route path="/chamado/detalhe/:id" element={<ChamadoDetalhe />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
