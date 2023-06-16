import React, { createContext, useCallback, useContext, useState } from 'react'

interface HelpDeskContextProps {
  toggleHelpDesk: () => void
  isNewHelpDesk: true | false
}

interface HelpDeskContextChildren {
  children: React.ReactNode
}

const HelpDeskContext = createContext({} as HelpDeskContextProps)

export const useHelpDeskContext = () => {
  return useContext(HelpDeskContext)
}

export const HelpDeskProvider: React.FC<HelpDeskContextChildren> = ({
  children,
}) => {
  const [isNewHelpDesk, setIsNewHelpDesk] = useState(false)
  const toggleHelpDesk = useCallback(() => {
    setIsNewHelpDesk((oldHelpDesk) => !oldHelpDesk)
  }, [])

  return (
    <HelpDeskContext.Provider value={{ toggleHelpDesk, isNewHelpDesk }}>
      {children}
    </HelpDeskContext.Provider>
  )
}
