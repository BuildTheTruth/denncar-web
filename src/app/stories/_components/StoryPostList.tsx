'use client'

import StoryPost from '@/app/stories/_components/StoryPost'
import useToast from '@/hooks/useToast'
import { useStories } from '@/queries/useStories'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Box, Fab, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function StoryPostList() {
  const router = useRouter()
  const toast = useToast()
  const { stories } = useStories()

  const { firebaseUser } = useLoggedInUserStore()

  const handleStoryPostCreate = () => {
    if (!firebaseUser) {
      toast.error('로그인을 해주세요.')
      return
    }
    router.push(`/stories/new`)
  }

  return (
    <Container>
      <Grid
        sx={{ height: '100%' }}
        container
        padding={2}
        spacing={2}
        columns={{ xs: 1, sm: 4, md: 8 }}
      >
        {stories.map((story) => (
          <Grid xs={1} sm={2} md={2} item key={story.id}>
            <StoryPost story={story} />
          </Grid>
        ))}
      </Grid>
      <FabWrapper>
        <Fab onClick={handleStoryPostCreate} sx={{ background: '#1c1c1c' }}>
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
