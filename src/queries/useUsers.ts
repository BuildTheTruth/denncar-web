import useToast from '@/hooks/useToast'
import { User, UserParams } from '@/interfaces/user'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { getUser } from '@/libs/firebase/firestore/users'
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const COLLECTION_KEY = 'users'

export const usersKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (userId: string) => [...usersKeys.all, userId] as const
}

export const useUsers = () => {
  const { data: users } = useSuspenseQuery({
    queryKey: usersKeys.all,
    queryFn: () => getDocsByCollection<User>(COLLECTION_KEY)
  })

  const createUserMutation = useMutation({
    mutationFn: (params: UserParams) => addDocInCollection(COLLECTION_KEY, params)
  })

  return { users, createUserMutation }
}

export const useUser = (id = '') => {
  const toast = useToast()

  const { data: user, refetch } = useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id
  })

  const updateUserMutation = useMutation({
    mutationFn: (params: Partial<UserParams>) => updateDocOnCollection(COLLECTION_KEY, id, params),
    onSuccess: () => {
      toast.success('마이프로필 수정 완료')
      refetch()
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteDocOnCollection(COLLECTION_KEY, id)
  })

  return { user, updateUserMutation, deleteUserMutation }
}
