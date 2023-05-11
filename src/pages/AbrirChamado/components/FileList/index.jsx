import React from 'react'
import { MdDelete, MdImage } from 'react-icons/md'
import { FileListContainer, FileInfo } from './styles'
import { Button } from '@mui/material'
import { filesize } from 'filesize'

export function FileList({ image, onDeleteImage }) {
  function triggerDeleteImage() {
    // console.log("deletar");
    onDeleteImage(image)
  }

  return (
    <FileListContainer id="lista-arquivos">
      <li>
        <FileInfo>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              height={40}
              width={40}
            />
          ) : (
            <img src={<MdImage size={35} />} alt="" />
          )}
          <div>
            <strong>{image.name}</strong>
            <span>{filesize(image.size)}</span>
          </div>
        </FileInfo>
        <Button color="error" onClick={triggerDeleteImage}>
          <MdDelete size={25} />
        </Button>
      </li>
    </FileListContainer>
  )
}
