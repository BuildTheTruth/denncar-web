'use client'

import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  dialog: ReactNode
}

export default function StoryLayout({ children, dialog }: Props) {
  return (
    <Container>
      {children}
      {dialog}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
