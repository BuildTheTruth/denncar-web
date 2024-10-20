import BoardDetail from '@/app/boards/[id]/_components/BoardDetail'
import { boardQueryOptions } from '@/queries/useBoards'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

interface Props {
  params: { id: string }
}

export default async function BoardPage({ params }: Props) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(boardQueryOptions(params.id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardDetail boardId={params.id} />
    </HydrationBoundary>
  )
}
