import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  dialog: ReactNode
}

export default function CarLayout({ children, dialog }: Props) {
  return (
    <>
      {children}
      {dialog}
    </>
  )
}
