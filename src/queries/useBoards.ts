import useToast from '@/hooks/useToast'
import { Board, BoardParams } from '@/interfaces/board'
import { addDocInCollection, getDocsByCollection } from '@/libs/firebase/firestore'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const COLLECTION_KEY = 'boards'

export const boardsKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (boardId: string) => [...boardsKeys.all, boardId] as const
}

export const useBoards = () => {
  const toast = useToast()
  const router = useRouter()

  const { data: boards, refetch } = useSuspenseQuery({
    queryKey: boardsKeys.all,
    queryFn: () => getDocsByCollection<Board>(COLLECTION_KEY)
  })

  const createBoardMutation = useMutation({
    mutationFn: (params: BoardParams) => addDocInCollection(COLLECTION_KEY, params),
    onSuccess: () => {
      toast.success('게시판 등록 완료')
      router.replace('/boards')
      refetch()
    }
  })

  return { boards, createBoardMutation }
}
