import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor, EditorProps } from '@toast-ui/react-editor'
import { MutableRefObject, useRef } from 'react'

interface Props extends EditorProps {
  forwardedRef?: MutableRefObject<Editor>
}

export default function CustomEditor({ onChange, forwardedRef, ...props }: Props) {
  const editorRef = useRef<Editor>(null)
  const ref = forwardedRef ?? editorRef

  const handleChange = () => {
    const html = ref.current?.getInstance().getHTML()
    onChange?.(html)
  }

  return <Editor plugins={[colorSyntax]} onChange={handleChange} {...props} ref={ref} />
}
