'use client'

import ToastUIViewer from '@/components/ToastUIViewer'
import { useBoard } from '@/libs/tanstack/queries/boards'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import { Box, Fab, Typography } from '@mui/material'
import { notFound, useRouter } from 'next/navigation'

import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'

interface Props {
  boardId: string
}

export default function BoardDetail({ boardId }: Props) {
  const { board } = useBoard(boardId)
  const router = useRouter()

  if (!board) {
    return notFound()
  }

  const { firebaseUser } = useLoggedInUserStore()
  const isCreator = board.authorId === firebaseUser?.uid

  const handleEditClick = () => {
    router.push(`/boards/${boardId}/edit`)
  }

  const handleDeleteClick = () => {
    router.push(`/boards/${boardId}/delete`)
  }

  return (
    <Container>
      <ContentsWarpper>
        <Typography variant="h2" fontWeight={600}>
          {board.title}
        </Typography>
        <ToastUIViewer initialValue={board.description} />
      </ContentsWarpper>
      {isCreator && (
        <FabWrapper>
          <Fab sx={{ background: '#1c1c1c', marginRight: 1 }} onClick={handleEditClick}>
            <SettingsIcon htmlColor="white" />
          </Fab>
          <Fab color="error" onClick={handleDeleteClick}>
            <DeleteIcon htmlColor="white" />
          </Fab>
        </FabWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const ContentsWarpper = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const FabWrapper = styled(Box)`
  display: flex;
  position: fixed;
  right: 16px;
  bottom: 16px;
`
