import { User } from '@/interfaces/user'
import { db } from '@/libs/firebase'
import { addDocInCollection, firestoreDataConverter } from '@/libs/firebase/firestore'
import { User as FirebaseUser } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

const COLLECTION_KEY = 'users'

const ref = collection(db, COLLECTION_KEY).withConverter(firestoreDataConverter<User>())

export const getUser = async (uid: string): Promise<User | null> => {
  const snapshot = await getDocs(query(ref, where('uid', '==', uid)))
  const [user] = snapshot.docs.map((doc) => doc.data())
  return user ?? null
}

export const addUser = ({ displayName, uid, email, photoURL }: FirebaseUser) => {
  addDocInCollection(COLLECTION_KEY, { name: displayName, numberOfCars: 0, uid, email, photoURL })
}
