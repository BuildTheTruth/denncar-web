import useToast from '@/hooks/useToast'
import { UserParams } from '@/interfaces/user'
import { deleteUser, getUser, getUsers, updateUser } from '@/libs/firebase/firestore/users'
import { queryOptions, useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'

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

export const useUsers = () => {
  const { data: users } = useSuspenseQuery(usersQueryOptions())

  return { users }
}

export const useUser = (id = '') => {
  const toast = useToast()

  const { data: user, refetch } = useQuery(userQueryOptions(id))

  const updateUserMutation = useMutation({
    mutationFn: (params: Partial<UserParams>) => updateUser(id, params),
    onSuccess: () => {
      toast.success('마이프로필 수정 완료')
      refetch()
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(id)
  })

  return { user, updateUserMutation, deleteUserMutation }
}
