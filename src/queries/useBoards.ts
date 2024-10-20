import useToast from '@/hooks/useToast'
import { WithId } from '@/interfaces/base'
import { Board, BoardParams } from '@/interfaces/board'
import {
  deleteDocOnCollection,
  getDocsByCollection,
  setDocInCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { getBoard } from '@/libs/firebase/firestore/board'
import { deleteDirectoryInStorage } from '@/libs/firebase/storage'
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const COLLECTION_KEY = 'boards'

export const boardsKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (boardId: string) => [...boardsKeys.all, boardId] as const
}

export const boardsQueryOptions = () =>
  queryOptions({
    queryKey: boardsKeys.all,
    queryFn: () => getDocsByCollection<Board>(COLLECTION_KEY)
  })

export const boardQueryOptions = (id: string) =>
  queryOptions({
    queryKey: boardsKeys.detail(id),
    queryFn: () => getBoard(id)
  })

export const useBoards = () => {
  const toast = useToast()
  const router = useRouter()

  const { data: boards, refetch } = useSuspenseQuery(boardsQueryOptions())

  const createBoardMutation = useMutation({
    mutationFn: ({ id, ...params }: WithId<BoardParams>) =>
      setDocInCollection(COLLECTION_KEY, id, params),
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

  const { data: board } = useSuspenseQuery(boardQueryOptions(id))

  const updateBoardMutation = useMutation({
    mutationFn: (params: Partial<BoardParams>) => updateDocOnCollection(COLLECTION_KEY, id, params),
    onSuccess: () => {
      toast.success('게시글 수정 완료')
      router.replace(`/boards/${id}`)
      queryClient.invalidateQueries({ queryKey: boardsKeys.all })
    }
  })

  const deleteBoardMutation = useMutation({
    mutationFn: () => deleteDocOnCollection(COLLECTION_KEY, id),
    onSuccess: () => {
      if (!board) return
      toast.success('게시글 삭제 완료')
      router.replace('/boards')
      queryClient.invalidateQueries({ queryKey: boardsKeys.all })
      deleteDirectoryInStorage(`images/boards/${id}`)
    }
  })

  return { board, updateBoardMutation, deleteBoardMutation }
}
