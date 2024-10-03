import { Board } from '@/interfaces/board'
import { getDocByCollection } from '@/libs/firebase/firestore'

const COLLECTION_KEY = 'boards'

export const getBoard = async (boardId: string): Promise<Board | null> =>
  getDocByCollection(COLLECTION_KEY, boardId)
