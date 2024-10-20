import { getUser, getUsers } from '@/libs/firebase/firestore/users'
import { queryOptions } from '@tanstack/react-query'

export const usersKeys = {
  all: ['users'] as const,
  detail: (userId: string) => [...usersKeys.all, userId] as const
}

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: usersKeys.all,
    queryFn: () => getUsers()
  })

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id
  })
