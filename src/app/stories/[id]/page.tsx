import StoryDetail from '@/app/stories/[id]/_components/StoryDetail'
import { getStory } from '@/libs/firebase/firestore/story'
import { storiesKeys } from '@/queries/useStories'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

interface Props {
  params: { id: string }
}

export default async function StoryPage({ params }: Props) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: storiesKeys.detail(params.id),
    queryFn: () => getStory(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetail storyId={params.id} />
    </HydrationBoundary>
  )
}
