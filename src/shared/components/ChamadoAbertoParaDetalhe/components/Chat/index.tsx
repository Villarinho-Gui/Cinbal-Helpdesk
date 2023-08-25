import React from 'react'
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
  const { comment } = useMessage(`http://localhost:3535/comment/${id}`, headers)
  const comments = comment
  const shouldShowMessageTextfield = comments.some(
    (message) => message.helpdesk.status === 'Concluído',
  )

  return (
    <>
      <Box
        bgcolor={theme.palette.background.default}
        display={'flex'}
        flexDirection={'column'}
        height={250}
      >
        {comments && comments.length > 0 && (
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            {comments.map((messageHelpDesk) => {
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
                  >
                    <MessageComponent
                      key={messageHelpDesk.id}
                      id={messageHelpDesk.id}
                      author={messageHelpDesk.user.name}
                      createdAt={messageHelpDesk.createdAt}
                      message={messageHelpDesk.message}
                    />
                  </ListItem>
                )
              )
            })}
          </List>
        )}
      </Box>
      {shouldShowMessageTextfield === false ? (
        <MessageTextField />
      ) : (
        <Box component={Card} elevation={0} padding={1}>
          <Typography variant="caption" color="text.secondary">
            HelpDesk já concluído
          </Typography>
        </Box>
      )}
    </>
  )
}
