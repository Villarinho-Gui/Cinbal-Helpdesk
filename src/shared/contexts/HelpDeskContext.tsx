import React, { createContext, useCallback, useContext, useState } from 'react'
import { MessageListProps } from '../components/ChamadoAbertoParaDetalhe/components/Chat'

interface HelpDeskContextProps {
  toggleHelpDesk: () => void
  isNewHelpDesk: true | false
  toggleMessage: () => void
  isNewMessage: true | false
  toggleLoading: () => void
  isLoading: true | false

  messageNotification: MessageListProps[]
  setMessageNotification: React.Dispatch<
    React.SetStateAction<MessageListProps[]>
  >
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

  const [messageNotification, setMessageNotification] = useState<
    MessageListProps[]
  >([])

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
        messageNotification,
        setMessageNotification,
      }}
    >
      {children}
    </HelpDeskContext.Provider>
  )
}
