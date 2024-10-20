import StoryDetail from '@/app/stories/[id]/_components/StoryDetail'
import { storyQueryOptions } from '@/libs/tanstack/options/stories'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

interface Props {
  params: { id: string }
}

export default async function StoryPage({ params }: Props) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(storyQueryOptions(params.id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetail storyId={params.id} />
    </HydrationBoundary>
  )
}
