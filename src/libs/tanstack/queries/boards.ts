import useToast from '@/hooks/useToast'
import { BoardParams } from '@/interfaces/board'
import { addBoardWithId, deleteBoard, updateBoard } from '@/libs/firebase/firestore/board'
import { deleteDirectoryInStorage } from '@/libs/firebase/storage'
import { boardQueryOptions, boardsKeys, boardsQueryOptions } from '@/libs/tanstack/options/boards'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useBoards = () => {
  const toast = useToast()
  const router = useRouter()

  const { data: boards, refetch } = useSuspenseQuery(boardsQueryOptions())

  const createBoardMutation = useMutation({
    mutationFn: addBoardWithId,
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
    mutationFn: (params: Partial<BoardParams>) => updateBoard(id, params),
    onSuccess: () => {
      toast.success('게시글 수정 완료')
      router.replace(`/boards/${id}`)
      queryClient.invalidateQueries({ queryKey: boardsKeys.all })
    }
  })

  const deleteBoardMutation = useMutation({
    mutationFn: () => deleteBoard(id),
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
