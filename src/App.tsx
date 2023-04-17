import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppThemeProvider } from './shared/contexts/export'
import { MenuLateral } from './shared/components/MenuLateral'

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  )
}
