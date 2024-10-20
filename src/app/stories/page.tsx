import StoryPostList from '@/app/stories/_components/StoryPostList'
import { storiesQueryOptions } from '@/libs/tanstack/options/stories'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function StoriesPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(storiesQueryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryPostList />
    </HydrationBoundary>
  )
}
