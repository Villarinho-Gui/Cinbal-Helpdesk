import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppThemeProvider, DrawerProvider } from './shared/contexts/export'
import './shared/translations/YupTranslations'
import { HelpDeskProvider } from './shared/contexts/HelpDeskContext'

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <HelpDeskProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </HelpDeskProvider>
      </DrawerProvider>
    </AppThemeProvider>
  )
}
