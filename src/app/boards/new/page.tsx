'use client'

import BoardForm from '@/app/boards/_components/BoardForm'
import { BoardParams } from '@/interfaces/board'
import { useBoards } from '@/queries/useBoards'

export default function NewCarPage() {
  const { createBoardMutation } = useBoards()

  const handleSubmit = (params: BoardParams) => {
    createBoardMutation.mutate(params)
  }

  return <BoardForm onSubmit={handleSubmit} />
}
