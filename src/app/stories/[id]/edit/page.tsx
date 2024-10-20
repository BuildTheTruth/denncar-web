'use client'

import StoryForm from '@/app/stories/_components/StoryForm'
import { StoryParams } from '@/interfaces/story'
import { useStory } from '@/libs/tanstack/queries/stories'
import { useUser } from '@/libs/tanstack/queries/users'
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
