/* eslint-disable no-undef */
import { createContext, useCallback, useContext, useState } from 'react'

interface IChamadoAberto {
  title: string
  category: string
  description: string
  path: string
}

interface IDrawerContextData {
  isDrawerOpen: true | false
  chamadoAberto: IChamadoAberto[]
  toggleDrawerOpen: () => void
  setChamadoAberto: (newDrawerChamadoAberto: IChamadoAberto[]) => void
}

interface IAppThemeProviderChildren {
  children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider: React.FC<IAppThemeProviderChildren> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [chamadoAberto, setChamadoAberto] = useState<IChamadoAberto[]>([])

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  const triggerSetChamadoAberto = useCallback(
    (newDrawerChamadoAberto: IChamadoAberto[]) => {
      setChamadoAberto(newDrawerChamadoAberto)
    },
    [],
  )

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
        chamadoAberto,
        setChamadoAberto: triggerSetChamadoAberto,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
