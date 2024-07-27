import { storage } from '@/libs/firebase'
import { extractExtension } from '@/utils/file'
import { User } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface StorageFileParams {
  carNo: string
  path: string
  file: File
}

const createStorageUrl = ({ path, carNo, file }: StorageFileParams) =>
  `${path}/${carNo}/${new Date().getTime()}.${extractExtension(file)}`

export const uploadFileToStorage = async (params: StorageFileParams) => {
  const url = createStorageUrl(params)
  const storageRef = ref(storage, url)
  await uploadBytes(storageRef, params.file)
  return getDownloadURL(storageRef)
}
