import { User } from '@/interfaces/user'
import { getDocByCollection, setDocInCollection } from '@/libs/firebase/firestore'
import { User as FirebaseUser } from 'firebase/auth'

const COLLECTION_KEY = 'users'

export const getUser = async (uid: string): Promise<User | null> =>
  getDocByCollection(COLLECTION_KEY, uid)

export const addUser = ({ displayName, uid, email, photoURL }: FirebaseUser) => {
  setDocInCollection(COLLECTION_KEY, uid, {
    name: displayName,
    numberOfCars: 0,
    email,
    photoURL
  })
}
