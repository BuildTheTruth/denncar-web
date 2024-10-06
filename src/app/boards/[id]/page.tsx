import BoardDetail from '@/app/boards/[id]/_components/BoardDetail'
import { getBoard } from '@/libs/firebase/firestore/board'
import { boardsKeys } from '@/queries/useBoards'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

interface Props {
  params: { id: string }
}

export default async function BoardPage({ params }: Props) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: boardsKeys.detail(params.id),
    queryFn: () => getBoard(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardDetail boardId={params.id} />
    </HydrationBoundary>
  )
}
