import { getStories, getStory } from '@/libs/firebase/firestore/story'
import { queryOptions } from '@tanstack/react-query'

export const storiesKeys = {
  all: ['stories'] as const,
  detail: (storyId: string) => [...storiesKeys.all, storyId] as const
}

export const storiesQueryOptions = () =>
  queryOptions({
    queryKey: storiesKeys.all,
    queryFn: getStories
  })

export const storyQueryOptions = (id: string) =>
  queryOptions({
    queryKey: storiesKeys.detail(id),
    queryFn: () => getStory(id)
  })
