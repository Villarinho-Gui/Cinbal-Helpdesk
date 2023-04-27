import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import {
  AppThemeProvider,
  DrawerProvider,
  AuthProvider,
} from './shared/contexts/export'
import { MenuLateral } from './shared/components/MenuLateral'
import { Login } from './shared/components/Login'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  )
}
