import { getBoard, getBoards } from '@/libs/firebase/firestore/board'
import { queryOptions } from '@tanstack/react-query'

export const boardsKeys = {
  all: ['boards'] as const,
  detail: (boardId: string) => [...boardsKeys.all, boardId] as const
}

export const boardsQueryOptions = () =>
  queryOptions({
    queryKey: boardsKeys.all,
    queryFn: getBoards
  })

export const boardQueryOptions = (id: string) =>
  queryOptions({
    queryKey: boardsKeys.detail(id),
    queryFn: () => getBoard(id)
  })
