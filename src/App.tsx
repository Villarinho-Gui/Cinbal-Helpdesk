import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppThemeProvider, DrawerProvider } from './shared/contexts/export'
import './shared/translations/YupTranslations'
import { HelpDeskProvider } from './shared/contexts/HelpDeskContext'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DrawerProvider>
          <HelpDeskProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </HelpDeskProvider>
        </DrawerProvider>
      </LocalizationProvider>
    </AppThemeProvider>
  )
}
