import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppThemeProvider, DrawerProvider } from './shared/contexts/export'
import './shared/translations/YupTranslations'

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  )
}
