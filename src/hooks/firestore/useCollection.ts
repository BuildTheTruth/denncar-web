import { db } from '@/libs/firebase'
import { CollectionReference, DocumentData, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useCollection = <T extends DocumentData>(path: string) => {
  const [data, setData] = useState<T[] | null>(null)

  useEffect(() => {
    const readCollection = async () => {
      const ref = collection(db, path) as CollectionReference<T, T>
      const snapshot = await getDocs(ref)
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setData(data)
    }
    readCollection()
  }, [])

  return { data, isLoading: !data }
}

export default useCollection
