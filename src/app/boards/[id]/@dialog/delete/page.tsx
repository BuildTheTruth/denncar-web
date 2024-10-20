'use client'

import { useBoard } from '@/libs/tanstack/queries/boards'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { notFound, useRouter } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default function BoardDeleteDialog({ params }: Props) {
  const { board, deleteBoardMutation } = useBoard(params.id)
  const router = useRouter()

  if (!board) {
    return notFound()
  }

  const handleClose = () => {
    router.back()
  }

  const handleDelete = () => {
    deleteBoardMutation.mutate()
  }

  return (
    <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">게시글 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {board.title} 해당 게시글을 삭제합니다. <br />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button autoFocus variant="contained" onClick={handleDelete}>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  )
}
