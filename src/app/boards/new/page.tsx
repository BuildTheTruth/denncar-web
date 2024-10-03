'use client'

import BoardForm from '@/app/boards/_components/BoardForm'
import Loading from '@/components/Loading'
import { BoardParams } from '@/interfaces/board'
import { useBoards } from '@/queries/useBoards'
import { useUser } from '@/queries/useUsers'
import { useLoggedInUserStore } from '@/stores/loggedInUser'

export default function NewBoardPage() {
  const { createBoardMutation } = useBoards()
  const { firebaseUser } = useLoggedInUserStore()
  const { user } = useUser(firebaseUser?.uid)

  if (!user) {
    return <Loading />
  }

  const handleSubmit = (params: BoardParams) => {
    createBoardMutation.mutate(params)
  }

  return <BoardForm onSubmit={handleSubmit} author={user} submitButtonName="등록" />
}
