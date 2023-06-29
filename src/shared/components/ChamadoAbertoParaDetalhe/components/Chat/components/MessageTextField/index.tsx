import React from 'react'
import {
  Box,
  Icon,
  IconButton,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { IoMdSend } from 'react-icons/io'
import { FileList } from '../../../../../../../pages/AbrirChamado/components/FileList'

// import { Container } from './styles';

export const MessageTextField: React.FC = () => {
  const theme = useTheme()
  return (
    <>
      {/* <FileList
        file={undefined}
        onDeleteFile={function (attachedFileToDelete: any): void {
          throw new Error('Function not implemented.')
        }}
      /> */}
      <Box marginY={2} display={'flex'} gap={2}>
        <form style={{ width: '100%' }}>
          <TextField
            fullWidth
            size={'small'}
            maxRows={5}
            multiline
            sx={{
              bgcolor: [theme.palette.background.default],
            }}
          />
        </form>
        <Tooltip title="Anexar arquivo" placement="top" arrow>
          <IconButton className="upload" component="label" color="primary">
            <input
              id="file-input"
              hidden
              accept="image/*"
              type="file"
              multiple
            />
            <AiOutlinePaperClip size={25} />
          </IconButton>
        </Tooltip>
        <IconButton>
          <Icon>
            <IoMdSend size={20} />
          </Icon>
        </IconButton>
      </Box>
    </>
  )
}
