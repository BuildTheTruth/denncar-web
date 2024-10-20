import useToast from '@/hooks/useToast'
import { WithId } from '@/interfaces/base'
import { StoryParams } from '@/interfaces/story'
import {
  deleteDocOnCollection,
  setDocInCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { deleteDirectoryInStorage } from '@/libs/firebase/storage'
import {
  storiesKeys,
  storiesQueryOptions,
  storyQueryOptions
} from '@/libs/tanstack/options/stories'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const COLLECTION_KEY = 'stories'

export const useStories = () => {
  const toast = useToast()
  const router = useRouter()
  const { data: stories, refetch } = useSuspenseQuery(storiesQueryOptions())

  const createStoryMutation = useMutation({
    mutationFn: ({ id, ...params }: WithId<StoryParams>) =>
      setDocInCollection(COLLECTION_KEY, id, params),
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
    mutationFn: (params: Partial<StoryParams>) => updateDocOnCollection(COLLECTION_KEY, id, params),
    onSuccess: () => {
      toast.success('스토리 수정 완료')
      router.replace(`/stories/${id}`)
      queryClient.invalidateQueries({ queryKey: storiesKeys.all })
    }
  })

  const deleteStoryMutation = useMutation({
    mutationFn: () => deleteDocOnCollection(COLLECTION_KEY, id),
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
