import { uploadFileToStorage } from '@/libs/firebase/storage'
import dynamic from 'next/dynamic'

const DynamicEditor = dynamic(() => import('@/components/CustomEditor'), { ssr: false })

interface Props {
  value?: string
  authorId: string
  storageImagePath: string
  onChange?: (value: string) => void
}

export default function ToastUIEditor({ value, authorId, storageImagePath, onChange }: Props) {
  if (typeof window === 'undefined') {
    return null
  }

  const addImageBlobHook = async (file: File, callback: (url: string, text: string) => void) => {
    const url = await uploadFileToStorage({ id: authorId, path: storageImagePath, file })
    callback(url, file.name)
  }

  return (
    <DynamicEditor
      initialValue={value}
      previewStyle="vertical"
      height="100%"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      onChange={onChange}
      language="ko-KR"
      hooks={{ addImageBlobHook }}
    />
  )
}
