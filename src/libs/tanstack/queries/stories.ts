import useToast from '@/hooks/useToast'
import { StoryParams } from '@/interfaces/story'
import { addStoryWithId, deleteStory, updateStory } from '@/libs/firebase/firestore/story'
import { deleteDirectoryInStorage } from '@/libs/firebase/storage'
import {
  storiesKeys,
  storiesQueryOptions,
  storyQueryOptions
} from '@/libs/tanstack/options/stories'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useStories = () => {
  const toast = useToast()
  const router = useRouter()
  const { data: stories, refetch } = useSuspenseQuery(storiesQueryOptions())

  const createStoryMutation = useMutation({
    mutationFn: addStoryWithId,
    onSuccess: () => {
      toast.success('게시판 등록 완료')
      router.replace('/stories')
      refetch()
    }
  })

  return { stories, createStoryMutation }
}

export const useStory = (id: string) => {
  const toast = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: story } = useSuspenseQuery(storyQueryOptions(id))

  const updateStoryMutation = useMutation({
    mutationFn: (params: Partial<StoryParams>) => updateStory(id, params),
    onSuccess: () => {
      toast.success('스토리 수정 완료')
      router.replace(`/stories/${id}`)
      queryClient.invalidateQueries({ queryKey: storiesKeys.all })
    }
  })

  const deleteStoryMutation = useMutation({
    mutationFn: () => deleteStory(id),
    onSuccess: () => {
      if (!story) return
      toast.success('스토리 삭제 완료')
      router.replace('/stories')
      queryClient.invalidateQueries({ queryKey: storiesKeys.all })
      deleteDirectoryInStorage(`images/stories/${id}`)
    }
  })

  return { story, updateStoryMutation, deleteStoryMutation }
}
