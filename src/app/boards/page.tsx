import BoardPostList from '@/app/boards/_components/BoardPostList'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { boardsKeys } from '@/queries/useBoards'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function BoardsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: boardsKeys.all,
    queryFn: () => getDocsByCollection('boards')
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardPostList />
    </HydrationBoundary>
  )
}
