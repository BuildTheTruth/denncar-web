'use client'

import { useStory } from '@/queries/useStories'
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

export default function StoryDeleteDialog({ params }: Props) {
  const { story, deleteStoryMutation } = useStory(params.id)
  const router = useRouter()

  if (!story) {
    return notFound()
  }

  const handleClose = () => {
    router.back()
  }

  const handleDelete = () => {
    deleteStoryMutation.mutate()
  }

  return (
    <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">스토리 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {story.title} 해당 스토리을 삭제합니다. <br />
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
