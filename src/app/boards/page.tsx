import BoardPostList from '@/app/boards/_components/BoardPostList'
import { boardsQueryOptions } from '@/libs/tanstack/options/boards'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function BoardsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(boardsQueryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardPostList />
    </HydrationBoundary>
  )
}
