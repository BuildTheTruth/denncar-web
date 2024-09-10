import { storage } from '@/libs/firebase'
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'

interface StorageFileParams {
  id: string
  path: string
  file: File
}

const createStorageUrl = ({ path, id, file }: StorageFileParams) =>
  `${path}/${id}/${new Date().getTime()}-${file.name}`

export const uploadFileToStorage = async (params: StorageFileParams) => {
  const url = createStorageUrl(params)
  const storageRef = ref(storage, url)
  await uploadBytes(storageRef, params.file)
  return getDownloadURL(storageRef)
}

export const deleteFileInStorage = (path: string) => deleteObject(ref(storage, path))

export const deleteDirectoryInStorage = async (path: string) => {
  const storageRef = ref(storage, path)
  const listResult = await listAll(storageRef)
  await Promise.all(listResult.items.map((itemRef) => deleteObject(itemRef)))
}
