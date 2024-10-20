import { Story } from '@/interfaces/story'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { getStory } from '@/libs/firebase/firestore/story'
import { queryOptions } from '@tanstack/react-query'

const COLLECTION_KEY = 'stories'

export const storiesKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (storyId: string) => [...storiesKeys.all, storyId] as const
}

export const storiesQueryOptions = () =>
  queryOptions({
    queryKey: storiesKeys.all,
    queryFn: () => getDocsByCollection<Story>(COLLECTION_KEY)
  })

export const storyQueryOptions = (id: string) =>
  queryOptions({
    queryKey: storiesKeys.detail(id),
    queryFn: () => getStory(id)
  })
