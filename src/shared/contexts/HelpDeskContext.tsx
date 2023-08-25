import React, { createContext, useCallback, useContext, useState } from 'react'

interface HelpDeskContextProps {
  toggleHelpDesk: () => void
  isNewHelpDesk: boolean
  toggleMessage: () => void
  isNewMessage: boolean
  toggleLoading: () => void
  isLoading: boolean
  isDone: boolean
  toggleHelpDeskStatus: () => void
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
  const [isDone, setIsDone] = useState(false)

  const toggleHelpDesk = useCallback(() => {
    setIsNewHelpDesk((oldHelpDesk) => !oldHelpDesk)
  }, [])

  const toggleMessage = useCallback(() => {
    setIsNewMessage((oldMessage) => !oldMessage)
  }, [])

  const toggleLoading = useCallback(() => {
    setIsLoading((oldIsLoading) => !oldIsLoading)
  }, [])

  const toggleHelpDeskStatus = useCallback(() => {
    setIsDone((oldStatus) => !oldStatus)
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
        isDone,
        toggleHelpDeskStatus,
      }}
    >
      {children}
    </HelpDeskContext.Provider>
  )
}
