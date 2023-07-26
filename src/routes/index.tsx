import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import { CadastroUsuario } from '../pages/LoginLayout/CadastroUsuario'
import { LoginLayout } from '../pages/LoginLayout'
import MenuLateral from '../shared/components/MenuLateral'
import { Login } from '../pages/LoginLayout/Login'
import { AbrirChamado } from '../pages/AbrirChamado'
import ChamadoAbertoParaDetalhe from '../shared/components/ChamadoAbertoParaDetalhe'
import DownloadPage from '../pages/DownloadPage'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/cadastro" element={<CadastroUsuario />} />
      </Route>
      <Route path="/home" element={<MenuLateral />}>
        <Route path="/home/dashboard" element={<Dashboard />} />
        <Route path="/home/abrir-chamado" element={<AbrirChamado />} />
        <Route
          path="/home/chamado/detalhe/:id"
          element={<ChamadoAbertoParaDetalhe />}
        />
        <Route path="/home/download/:filename" element={<DownloadPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
