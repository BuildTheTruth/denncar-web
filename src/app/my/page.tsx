'use client'

import UserForm from '@/app/my/_components/UserForm'
import Loading from '@/components/Loading'
import { useLoggedInUserStore } from '@/stores/loggedInUser'

export default function MyPage() {
  const { me } = useLoggedInUserStore()

  if (!me) return <Loading />

  return <UserForm defaultValues={me} />
}
