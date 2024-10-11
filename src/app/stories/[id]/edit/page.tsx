'use client'

import StoryForm from '@/app/stories/_components/StoryForm'
import { StoryParams } from '@/interfaces/story'
import { useStory } from '@/queries/useStories'
import { useUser } from '@/queries/useUsers'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default function StoryEditPage({ params }: Props) {
  const { updateStoryMutation, story } = useStory(params.id)
  const { firebaseUser } = useLoggedInUserStore()
  const { user } = useUser(firebaseUser?.uid)

  if (!story || !user) {
    return notFound()
  }

  const handleSubmit = (params: StoryParams) => {
    updateStoryMutation.mutate(params)
  }

  return (
    <StoryForm
      onSubmit={handleSubmit}
      defaultValues={story}
      submitButtonName="수정"
      author={user}
    />
  )
}
