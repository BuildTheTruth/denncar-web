import { db } from '@/libs/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const getDocsByCollection = async <T extends { id: string }>(path: string) => {
  const ref = collection(db, path).withConverter({
    toFirestore: (data: T) => data,
    fromFirestore: (snap) => ({ id: snap.id, ...snap.data() } as T)
  })
  const snapshot = await getDocs(ref)
  return snapshot.docs.map((doc) => doc.data())
}
