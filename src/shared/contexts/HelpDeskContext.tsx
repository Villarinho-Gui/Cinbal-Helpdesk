import React, { createContext, useCallback, useContext, useState } from 'react'

interface HelpDeskContextProps {
  toggleHelpDesk: () => void
  isNewHelpDesk: boolean
  toggleMessage: () => void
  isNewMessage: true | false
  toggleLoading: () => void
  isLoading: boolean
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
  const [isNewMessage, setIsNewMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleHelpDesk = useCallback(() => {
    setIsNewHelpDesk((oldHelpDesk) => !oldHelpDesk)
  }, [])

  const toggleMessage = useCallback(() => {
    setIsNewMessage((oldMessage) => !oldMessage)
  }, [])

  const toggleLoading = useCallback(() => {
    setIsLoading((oldIsLoading) => !oldIsLoading)
  }, [])

  return (
    <HelpDeskContext.Provider
      value={{
        toggleHelpDesk,
        isNewHelpDesk,
        toggleLoading,
        isLoading,
        toggleMessage,
        isNewMessage,
      }}
    >
      {children}
    </HelpDeskContext.Provider>
  )
}
