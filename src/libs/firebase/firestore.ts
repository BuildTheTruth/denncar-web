import { db } from '@/libs/firebase'
import { extractDateByDoucmentData } from '@/utils/date'
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

const firestoreDataConverter = <T extends DocumentData>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
      id: snap.id,
      ...snap.data(),
      ...extractDateByDoucmentData({ name: 'createdAt', data: snap.data() }),
      ...(snap.data().updatedAt &&
        extractDateByDoucmentData({ name: 'updatedAt', data: snap.data() }))
    } as T)
})

export const getDocsByCollection = async <T extends DocumentData>(path: string) => {
  const ref = collection(db, path).withConverter(firestoreDataConverter<T>())
  const snapshot = await getDocs(query(ref, orderBy('createdAt')))
  return snapshot.docs.map((doc) => doc.data())
}

export const getDocByCollection = async <T extends DocumentData>(path: string, id: string) => {
  const ref = doc(db, path, id).withConverter(firestoreDataConverter<T>())
  const snapshot = await getDoc(ref)
  return snapshot.data() ?? null
}

export const addDocInCollection = <T extends DocumentData>(path: string, data: T) =>
  addDoc(collection(db, path), { ...data, createdAt: serverTimestamp() })

export const updateDocOnCollection = <T extends DocumentData>(path: string, id: string, data: T) =>
  updateDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() })

export const deleteDocOnCollection = (path: string, id: string) => deleteDoc(doc(db, path, id))
