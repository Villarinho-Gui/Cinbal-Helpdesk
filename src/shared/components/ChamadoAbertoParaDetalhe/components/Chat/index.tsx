import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, useTheme } from '@mui/material'
import { MessageTextField } from './components/MessageTextField'
import MessageComponent from './components/MessageComponent'
import api from '../../../../../service/api/config/configApi'
import { useParams } from 'react-router-dom'
import { useHelpDeskContext } from '../../../../contexts/HelpDeskContext'
import { useUserHelpDeskContext } from '../../../../contexts/userContext'
interface MessageListProps {
  id: string
  user: {
    name: string
  }
  message: string
  createdAt: Date
  helpdesk: {
    id: string
  }
}

export const Chat: React.FC = () => {
  const [messageData, setMessageData] = useState<MessageListProps[]>([])

  const theme = useTheme()
  const { isNewMessage } = useHelpDeskContext()
  const { user } = useUserHelpDeskContext()

  const { id } = useParams()

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    api
      .get<MessageListProps[]>(`/comment/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response
        setMessageData(data)
        if (isNewMessage) {
          setMessageData(data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewMessage])

  return (
    <>
      <Box
        bgcolor={theme.palette.background.default}
        display={'flex'}
        flexDirection={'column'}
        height={250}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          {messageData.map((messageHelpDesk: MessageListProps) => {
            return id === messageHelpDesk.helpdesk.id ? (
              <ListItem
                key={messageHelpDesk.id}
                disablePadding
                sx={{
                  justifyContent:
                    user!.name !== messageHelpDesk.user.name ? 'start' : 'end',
                }}
              >
                <MessageComponent
                  key={messageHelpDesk.id}
                  id={messageHelpDesk.id}
                  author={messageHelpDesk.user.name}
                  createdAt={messageHelpDesk.createdAt}
                  message={messageHelpDesk.message}
                />
              </ListItem>
            ) : (
              ''
            )
          })}
        </List>
      </Box>
      <MessageTextField />
    </>
  )
}
