'use client'

import StoryForm from '@/app/stories/_components/StoryForm'
import Loading from '@/components/Loading'
import { WithId } from '@/interfaces/base'
import { StoryParams } from '@/interfaces/story'
import { useStories } from '@/libs/tanstack/queries/stories'
import { useUser } from '@/libs/tanstack/queries/users'
import { useLoggedInUserStore } from '@/stores/loggedInUser'

export default function NewStoryPage() {
  const { createStoryMutation } = useStories()
  const { firebaseUser } = useLoggedInUserStore()
  const { user } = useUser(firebaseUser?.uid)

  if (!user) {
    return <Loading />
  }

  const handleSubmit = (params: WithId<StoryParams>) => {
    createStoryMutation.mutate(params)
  }

  return <StoryForm onSubmit={handleSubmit} author={user} submitButtonName="등록" />
}
