import { Button } from '@mui/material'
import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'
import { useAppThemeContext } from '../shared/contexts/export'

export const AppRoutes: React.FC = () => {
  const { toggleTheme } = useAppThemeContext()

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Button color="primary" variant="contained" onClick={toggleTheme}>
            Tema
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
