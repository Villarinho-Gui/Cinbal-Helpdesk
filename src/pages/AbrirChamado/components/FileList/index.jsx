import React from 'react'
import { MdDelete, MdImage } from 'react-icons/md'
import { Button, Card, Typography, Box } from '@mui/material'
import { filesize } from 'filesize'

export function FileList({ image, onDeleteImage }) {
  function triggerDeleteImage() {
    // console.log("deletar");
    onDeleteImage(image)
  }

  return (
    <Card
      component={Box}
      overflow={'hidden'}
      display={'flex'}
      alignItems={'center'}
      width={'350px'}
      justifyContent={'space-between'}
      color="#444"
      padding={'0.5rem'}
      borderRadius={'8px'}
      variant="outlined"
    >
      <Box display={'flex'} alignItems={'center'} gap={'1rem'}>
        {image ? (
          <img src={URL.createObjectURL(image)} alt="" height={40} width={40} />
        ) : (
          <img src={<MdImage size={35} />} alt="" />
        )}
        <Box
          display={'flex'}
          width={'200px'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Box
            maxWidth={'30ch'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
          >
            <Typography variant="h6" sx={{ fontSize: '16px' }}>
              {image.name}
            </Typography>
          </Box>
          <Box
            fontSize={'0.75rem'}
            marginTop={'4px'}
            maxWidth={'30ch'}
            width={'70%'}
          >
            <Typography variant="body2" fontSize={'12px'} color="#999">
              {filesize(image.size)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button color="error" onClick={triggerDeleteImage}>
        <MdDelete size={25} />
      </Button>
    </Card>
  )
}
