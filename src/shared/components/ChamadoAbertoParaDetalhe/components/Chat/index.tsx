import React from 'react'
import { Box, List, ListItem, useTheme } from '@mui/material'
import { MessageTextField } from './components/MessageTextField'
import MessageComponent from './components/MessageComponent'
import { useParams } from 'react-router-dom'
import { useUserHelpDeskContext } from '../../../../contexts/userContext'
import { useMessage } from '../../../../hooks/useMessage'

export const Chat: React.FC = () => {
  const theme = useTheme()
  const { user } = useUserHelpDeskContext()

  const { id } = useParams()

  const token = localStorage.getItem('access_token')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }

  const { comment } = useMessage(`/comment/${id}`, headers)

  const comments = comment

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
      </Box>
      <MessageTextField />
    </>
  )
}
