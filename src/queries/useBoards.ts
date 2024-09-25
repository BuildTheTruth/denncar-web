import { Board } from '@/interfaces/board'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { useSuspenseQuery } from '@tanstack/react-query'

const COLLECTION_KEY = 'boards'

export const boardsKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (boardId: string) => [...boardsKeys.all, boardId] as const
}

export const useBoards = () => {
  const { data: boards } = useSuspenseQuery({
    queryKey: boardsKeys.all,
    queryFn: () => getDocsByCollection<Board>(COLLECTION_KEY)
  })

  return { boards }
}
