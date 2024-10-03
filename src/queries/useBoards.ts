import useToast from '@/hooks/useToast'
import { Board, BoardParams } from '@/interfaces/board'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { getBoard } from '@/libs/firebase/firestore/board'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
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

export const useBoard = (id: string) => {
  const toast = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: board, refetch } = useSuspenseQuery({
    queryKey: boardsKeys.detail(id),
    queryFn: () => getBoard(id)
  })

  const updateBoardMutation = useMutation({
    mutationFn: (params: Partial<BoardParams>) => updateDocOnCollection(COLLECTION_KEY, id, params),
    onSuccess: () => {
      toast.success('게시글 등록 완료')
      router.replace(`/boards/${id}`)
      refetch()
    }
  })

  const deleteBoardMutation = useMutation({
    mutationFn: () => deleteDocOnCollection(COLLECTION_KEY, id),
    onSuccess: () => {
      if (!board) return
      toast.success('게시글 삭제 완료')
      router.replace('/boards')
      queryClient.invalidateQueries({ queryKey: boardsKeys.all })
    }
  })

  return { board, updateBoardMutation, deleteBoardMutation }
}
