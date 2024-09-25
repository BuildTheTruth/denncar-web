'use client'

import BoardPost from '@/app/boards/_components/BoardPost'
import { useBoards } from '@/queries/useBoards'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Grid } from '@mui/material'

export default function BoardPostList() {
  const { boards } = useBoards()

  return (
    <Container>
      <Grid
        sx={{ height: '100%', overflowY: 'auto' }}
        container
        padding={2}
        spacing={2}
        columns={{ xs: 1, sm: 4, md: 8 }}
      >
        {boards.map((board) => (
          <Grid xs={1} sm={2} md={2} item key={board.id}>
            <BoardPost board={board} />
          </Grid>
        ))}
      </Grid>
      <FabWrapper>
        <Fab sx={{ background: '#1c1c1c' }}>
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
  position: absolute;
  right: 16px;
  bottom: 16px;
`
