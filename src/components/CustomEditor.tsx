import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { Editor, EditorProps } from '@toast-ui/react-editor'
import { useRef } from 'react'

export default function CustomEditor({ onChange, ...props }: EditorProps) {
  const editorRef = useRef<Editor>(null)

  const handleChange = () => {
    const html = editorRef.current?.getInstance().getHTML()
    onChange?.(html)
  }

  return <Editor plugins={[colorSyntax]} onChange={handleChange} {...props} ref={editorRef} />
}
