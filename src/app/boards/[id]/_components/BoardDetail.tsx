'use client'

import styled from '@emotion/styled'

interface Props {
  boardId: string
}

export default function BoardDetail({ boardId }: Props) {
  return <Container>{boardId}</Container>
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
