import { storage } from '@/libs/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

export const imageRef = ref(storage, 'images/granduar.jpeg')

export const imageUrl = async () => {
  return await getDownloadURL(imageRef)
}
