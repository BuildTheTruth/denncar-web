import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Button, IconButton } from '@mui/material'
import { ChangeEvent } from 'react'

interface Props {
  onSelect: (files: File[]) => void
}

export default function FileUploadButton({ onSelect }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    onSelect(files)
  }

  return (
    <Button
      sx={{
        width: '100%',
        height: '100%'
      }}
      component="label"
      role={undefined}
      tabIndex={-1}
    >
      <AddIcon htmlColor="black" />
      <VisuallyHiddenInput type="file" onChange={handleChange} multiple />
    </Button>
  )
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
