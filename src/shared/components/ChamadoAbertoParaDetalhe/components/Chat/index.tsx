import React from 'react'
import { Box, List, ListItem, useTheme } from '@mui/material'
import { MessageTextField } from './components/MessageTextField'
import MessageComponent from './components/MessageComponent'
import { useUserHelpDeskContext } from '../../../../contexts/UserContext'
import { useMessage } from '../../../../hooks/useMessage'
import { CommentsProps } from '../../../../types/helpdeskType'
import { useParams } from 'react-router-dom'

export const Chat: React.FC = () => {
  const theme = useTheme()
  const { user } = useUserHelpDeskContext()
  const { data } = useMessage()
  const comments = data?.data
  const { id } = useParams()
  return (
    <>
      <Box
        bgcolor={theme.palette.background.default}
        display={'flex'}
        flexDirection={'column'}
        height={250}
      >
        {data?.data && data.data.length > 0 && (
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            {comments.map((messageHelpDesk: CommentsProps) => {
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
      <MessageTextField />
    </>
  )
}
