'use client'

import UserForm from '@/app/my/_components/UserForm'
import Loading from '@/components/Loading'
import { UserParams } from '@/interfaces/user'
import { useUser } from '@/queries/useUsers'
import { useLoggedInUserStore } from '@/stores/loggedInUser'

export default function MyPage() {
  const { firebaseUser } = useLoggedInUserStore()
  const { user, updateUserMutation } = useUser(firebaseUser?.uid)

  if (!user) {
    return <Loading />
  }

  const handleSubmit = (params: UserParams) => {
    updateUserMutation.mutate(params)
  }

  return <UserForm defaultValues={user} onSubmit={handleSubmit} />
}
