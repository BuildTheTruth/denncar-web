import { db } from '@/libs/firebase'
import { extractDateByDoucmentData } from '@/utils/date'
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

export const getDocsByCollection = async <
  T extends { id: string; createdAt: string; updatedAt?: string }
>(
  path: string
) => {
  const ref = collection(db, path).withConverter({
    toFirestore: (data: T) => data,
    fromFirestore: (snap) =>
      ({
        id: snap.id,
        ...snap.data(),
        ...extractDateByDoucmentData({ name: 'createdAt', data: snap.data() }),
        ...(snap.data().updatedAt &&
          extractDateByDoucmentData({ name: 'updatedAt', data: snap.data() }))
      } as T)
  })
  const snapshot = await getDocs(query(ref, orderBy('createdAt')))
  return snapshot.docs.map((doc) => doc.data())
}

export const addDocInCollection = <T extends DocumentData>(path: string, data: T) =>
  addDoc(collection(db, path), { ...data, createdAt: serverTimestamp() })

export const updateDocOnCollection = <T extends DocumentData>(path: string, id: string, data: T) =>
  updateDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() })

export const deleteDocOnCollection = (path: string, id: string) => deleteDoc(doc(db, path, id))
