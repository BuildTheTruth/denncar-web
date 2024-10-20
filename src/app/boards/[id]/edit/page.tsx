'use client'

import BoardForm from '@/app/boards/_components/BoardForm'
import { BoardParams } from '@/interfaces/board'
import { useBoard } from '@/libs/tanstack/queries/boards'
import { useUser } from '@/libs/tanstack/queries/users'
import { useLoggedInUserStore } from '@/stores/loggedInUser'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default function BoardEditPage({ params }: Props) {
  const { updateBoardMutation, board } = useBoard(params.id)
  const { firebaseUser } = useLoggedInUserStore()
  const { user } = useUser(firebaseUser?.uid)

  if (!board || !user) {
    return notFound()
  }

  const handleSubmit = (params: BoardParams) => {
    updateBoardMutation.mutate(params)
  }

  return (
    <BoardForm
      onSubmit={handleSubmit}
      defaultValues={board}
      submitButtonName="수정"
      author={user}
    />
  )
}
