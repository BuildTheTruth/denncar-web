'use client'

import ToastUIViewer from '@/components/ToastUIViewer'
import { useStory } from '@/libs/tanstack/queries/stories'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import styled from '@emotion/styled'
import { Box, Fab, Typography } from '@mui/material'
import { notFound, useRouter } from 'next/navigation'

import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'

interface Props {
  storyId: string
}

export default function StoryDetail({ storyId }: Props) {
  const { story } = useStory(storyId)
  const router = useRouter()

  if (!story) {
    return notFound()
  }

  const { firebaseUser } = useLoggedInUserStore()
  const isCreator = story.authorId === firebaseUser?.uid

  const handleEditClick = () => {
    router.push(`/stories/${storyId}/edit`)
  }

  const handleDeleteClick = () => {
    router.push(`/stories/${storyId}/delete`)
  }

  return (
    <Container>
      <ContentsWarpper>
        <Typography variant="h2" fontWeight={600}>
          {story.title}
        </Typography>
        <ToastUIViewer initialValue={story.description} />
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
