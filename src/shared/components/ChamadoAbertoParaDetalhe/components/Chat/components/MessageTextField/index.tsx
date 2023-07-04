import React, { useState } from 'react'
import {
  Box,
  CircularProgress,
  Icon,
  IconButton,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
// import { FileList } from '../../../../../../../pages/AbrirChamado/components/FileList'
import api from '../../../../../../../service/api/config/configApi'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useHelpDeskContext } from '../../../../../../contexts/HelpDeskContext'

interface SendMessageProps {
  messageContent: string
  helpdeskId: string
  files?: File[]
}

export const MessageTextField: React.FC = () => {
  const [textFieldMessage, setTextFieldMessage] = useState('')

  const { id } = useParams()
  const theme = useTheme()
  const { toggleMessage } = useHelpDeskContext()
  const { handleSubmit, register } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const PostMessage = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('access_token')

    const formData = new FormData()

    formData.append('message', textFieldMessage)

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }

    try {
      await api
        .post<SendMessageProps>(`/coment/${id}`, formData, headers)
        .then(() => {
          toggleMessage()
          setTextFieldMessage('')
          setIsLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display={'flex'} alignItems={'flex-start'} justifyContent={'center'}>
      {/* <FileList
        file={undefined}
        onDeleteFile={function (attachedFileToDelete: any): void {
          throw new Error('Function not implemented.')
        }}
      /> */}
      <form
        id="messageTextField"
        method="POST"
        onSubmit={handleSubmit(PostMessage)}
        style={{ width: '100%', display: 'flex', marginTop: '10px' }}
      >
        <TextField
          fullWidth
          {...register('message')}
          name="message"
          placeholder="Escreva uma mensagem..."
          size={'small'}
          type="text"
          maxRows={5}
          multiline
          value={textFieldMessage}
          onChange={(e) => setTextFieldMessage(e.target.value)}
          sx={{
            bgcolor: [theme.palette.background.default],
          }}
          disabled={isLoading}
        />
      </form>
      <Box display={'flex'} marginTop={1} marginX={1}>
        <Tooltip title="Anexar arquivo" placement="top" arrow>
          <IconButton className="upload" component="label" color="primary">
            <input
              id="file-input"
              hidden
              accept="image/*"
              type="file"
              multiple
              form="messageTextField"
            />
            <AiOutlinePaperClip size={25} />
          </IconButton>
        </Tooltip>
        <IconButton type="submit" disabled={isLoading} onClick={PostMessage}>
          <Icon>
            {isLoading ? (
              <CircularProgress size={25} />
            ) : (
              <IoMdSend size={20} />
            )}
          </Icon>
        </IconButton>
      </Box>
    </Box>
  )
}
