'use client'

import BoardPost from '@/app/boards/_components/BoardPost'
import useToast from '@/hooks/useToast'
import { useBoards } from '@/libs/tanstack/queries/boards'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Box, Fab } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useRouter } from 'next/navigation'

export default function BoardPostList() {
  const router = useRouter()
  const toast = useToast()
  const { boards } = useBoards()

  const { firebaseUser } = useLoggedInUserStore()

  const handleBoardPostCreate = () => {
    if (!firebaseUser) {
      toast.error('로그인을 해주세요.')
      return
    }
    router.push(`/boards/new`)
  }

  return (
    <Container>
      <Grid
        container
        padding={2}
        spacing={2}
        sx={{ width: '100%' }}
        columns={{ xs: 2, sm: 4, md: 8, lg: 10, xl: 12, xxl: 16 }}
      >
        {boards.map((board) => (
          <Grid key={board.id} size={2}>
            <BoardPost board={board} />
          </Grid>
        ))}
      </Grid>
      <FabWrapper>
        <Fab onClick={handleBoardPostCreate} sx={{ background: '#1c1c1c' }}>
          <AddIcon htmlColor="white" />
        </Fab>
      </FabWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const FabWrapper = styled(Box)`
  display: flex;
  position: fixed;
  right: 16px;
  bottom: 16px;
`
