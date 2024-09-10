import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Button, IconButton } from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'

interface Props {
  onClick: (files: File[]) => void
  children: ReactNode
  multiple?: boolean
}

export default function FileUploadButton({ onClick, children, multiple }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    onClick(files)
  }

  return (
    <Button sx={{ padding: 0 }} component="label" role={undefined} tabIndex={-1}>
      {children}
      <VisuallyHiddenInput type="file" onChange={handleChange} multiple={multiple} />
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
