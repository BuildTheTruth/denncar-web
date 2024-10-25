import { WithId } from '@/interfaces/base'
import { Board, BoardParams } from '@/interfaces/board'
import {
  deleteDocFromCollection,
  getDocFromCollection,
  getDocsFromCollection,
  setDocInCollection,
  updateDocInCollection
} from '@/libs/firebase/firestore'

const COLLECTION_KEY = 'boards'

export const getBoards = () => getDocsFromCollection<Board>(COLLECTION_KEY)

export const getBoard = (id: string): Promise<Board | null> =>
  getDocFromCollection(COLLECTION_KEY, id)

export const addBoardWithId = ({ id, ...params }: WithId<BoardParams>) =>
  setDocInCollection(COLLECTION_KEY, id, params)

export const updateBoard = (id: string, params: Partial<BoardParams>) =>
  updateDocInCollection(COLLECTION_KEY, id, params)

export const deleteBoard = (id: string) => deleteDocFromCollection(COLLECTION_KEY, id)
