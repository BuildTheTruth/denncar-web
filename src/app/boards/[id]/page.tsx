import BoardDetail from '@/app/boards/[id]/_components/BoardDetail'
import { getDocByCollection } from '@/libs/firebase/firestore'
import { getCarAndAuthor } from '@/libs/firebase/firestore/cars'
import { boardsKeys } from '@/queries/useBoards'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

interface Props {
  params: { id: string }
}

export default async function BoardPage({ params }: Props) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: boardsKeys.detail(params.id),
    queryFn: () => getDocByCollection('boards', params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardDetail boardId={params.id} />
    </HydrationBoundary>
  )
}
