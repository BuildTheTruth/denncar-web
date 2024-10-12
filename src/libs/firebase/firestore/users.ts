import { User, UserParams } from '@/interfaces/user'
import {
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  setDocInCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { User as FirebaseUser } from 'firebase/auth'

const COLLECTION_KEY = 'users'

export const getUsers = () => getDocsByCollection<User>(COLLECTION_KEY)

export const getUser = async (id: string): Promise<User | null> =>
  getDocByCollection(COLLECTION_KEY, id)

export const addUser = ({ displayName, uid, email, photoURL }: FirebaseUser) => {
  setDocInCollection(COLLECTION_KEY, uid, {
    name: displayName,
    numberOfCars: 0,
    email,
    photoURL
  })
}

export const updateUser = (id: string, params: Partial<UserParams>) =>
  updateDocOnCollection(COLLECTION_KEY, id, params)

export const deleteUser = (id: string) => deleteDocOnCollection(COLLECTION_KEY, id)
