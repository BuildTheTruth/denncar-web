import StoryPostList from '@/app/stories/_components/StoryPostList'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { storiesKeys } from '@/queries/useStories'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function StoriesPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: storiesKeys.all,
    queryFn: () => getDocsByCollection('stories')
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryPostList />
    </HydrationBoundary>
  )
}
