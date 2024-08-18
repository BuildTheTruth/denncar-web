import { User } from '@/interfaces/user'
import { db } from '@/libs/firebase'
import { firestoreDataConverter } from '@/libs/firebase/firestore'

import { collection, getDocs, query, where } from 'firebase/firestore'

const ref = collection(db, 'users').withConverter(firestoreDataConverter<User>())

export const getUser = async (uid: string): Promise<User | null> => {
  const snapshot = await getDocs(query(ref, where('uid', '==', uid)))
  const [user] = snapshot.docs.map((doc) => doc.data())
  return user ?? null
}
