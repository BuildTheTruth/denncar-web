import { WithId } from '@/interfaces/base'
import { Board, BoardParams } from '@/interfaces/board'
import {
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  setDocInCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'

const COLLECTION_KEY = 'boards'

export const getBoards = () => getDocsByCollection<Board>(COLLECTION_KEY)

export const getBoard = (id: string): Promise<Board | null> =>
  getDocByCollection(COLLECTION_KEY, id)

export const addBoardWithId = ({ id, ...params }: WithId<BoardParams>) =>
  setDocInCollection(COLLECTION_KEY, id, params)

export const updateBoard = (id: string, params: Partial<BoardParams>) =>
  updateDocOnCollection(COLLECTION_KEY, id, params)

export const deleteBoard = (id: string) => deleteDocOnCollection(COLLECTION_KEY, id)
