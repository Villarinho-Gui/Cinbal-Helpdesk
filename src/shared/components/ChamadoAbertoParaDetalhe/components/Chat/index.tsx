import React, { useEffect, useRef } from 'react'
import { Box, Card, List, ListItem, Typography, useTheme } from '@mui/material'
import { MessageTextField } from './components/MessageTextField'
import MessageComponent from './components/MessageComponent'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../../../../contexts/userContext'
import { useMessage } from '../../../../hooks/useMessage'

export const Chat: React.FC = () => {
  const theme = useTheme()
  const { user } = useUserContext()

  const { id } = useParams()
  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }
  const { comment } = useMessage(`/comment/${id}`, headers)

  const shouldShowMessageTextfield = comment.some(
    (message) => message.helpdesk.status === 'Concluído',
  )

  const messagesEndRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (comment.length > 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [comment])

  return (
    <>
      <Box
        bgcolor={theme.palette.background.default}
        display={'flex'}
        flexDirection={'column'}
        height={250}
      >
        {comment && comment.length > 0 && (
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              scrollSnapType: 'y',
            }}
          >
            {comment.map((messageHelpDesk) => {
              return (
                id === messageHelpDesk.helpdesk.id && (
                  <ListItem
                    key={messageHelpDesk.id}
                    disablePadding
                    sx={{
                      justifyContent:
                        user!.name !== messageHelpDesk.user!.name
                          ? 'start'
                          : 'end',
                    }}
                    ref={messagesEndRef}
                  >
                    <MessageComponent
                      key={messageHelpDesk.id}
                      id={messageHelpDesk.id}
                      author={messageHelpDesk.user.name}
                      createdAt={messageHelpDesk.createdAt}
                      message={messageHelpDesk.message}
                      file={messageHelpDesk.files!}
                    />
                  </ListItem>
                )
              )
            })}
          </List>
        )}
      </Box>
      {shouldShowMessageTextfield === true ? (
        <Box component={Card} elevation={0} padding={1}>
          <Typography variant="caption" color="text.secondary">
            HelpDesk já concluído
          </Typography>
        </Box>
      ) : (
        <MessageTextField />
      )}
    </>
  )
}
