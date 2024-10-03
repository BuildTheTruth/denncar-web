import Empty from '@/components/Empty'
import { uploadFileToStorage } from '@/libs/firebase/storage'
import { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import { forwardRef, MutableRefObject } from 'react'

const DynamicEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
  loading: Empty
})

interface Props {
  initialValue?: string
  authorId: string
  storageImagePath: string
  onChange?: (value: string) => void
}

const ToastUIEditor = forwardRef<Editor, Props>(
  ({ initialValue, authorId, storageImagePath, onChange }, ref) => {
    if (typeof window === 'undefined') {
      return null
    }

    const addImageBlobHook = async (file: File, callback: (url: string, text: string) => void) => {
      const url = await uploadFileToStorage({ id: authorId, path: storageImagePath, file })
      callback(url, file.name)
    }

    return (
      <DynamicEditor
        initialValue={initialValue}
        previewStyle="vertical"
        height="100%"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        onChange={onChange}
        language="ko-KR"
        hooks={{ addImageBlobHook }}
        forwardedRef={ref as MutableRefObject<Editor>}
      />
    )
  }
)

export default ToastUIEditor
