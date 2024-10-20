import { Board } from '@/interfaces/board'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { getBoard } from '@/libs/firebase/firestore/board'
import { queryOptions } from '@tanstack/react-query'

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
