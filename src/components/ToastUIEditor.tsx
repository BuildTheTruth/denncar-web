import Empty from '@/components/Empty'
import { Editor } from '@toast-ui/react-editor'
import dynamic from 'next/dynamic'
import { forwardRef, MutableRefObject } from 'react'

const DynamicEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
  loading: Empty
})

interface Props {
  initialValue?: string
  onChange?: (value: string) => void
  onImageInsert?: (url: string, file: File) => void
}

const ToastUIEditor = forwardRef<Editor, Props>(
  ({ initialValue, onChange, onImageInsert }, ref) => {
    if (typeof window === 'undefined') {
      return null
    }

    const addImageBlobHook = async (file: File, callback: (url: string, text: string) => void) => {
      const url = URL.createObjectURL(file)
      onImageInsert?.(url, file)
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
