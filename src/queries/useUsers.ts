import { User, UserParams } from '@/interfaces/user'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

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

export const useUser = (id: string) => {
  const { data: user } = useSuspenseQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => getDocByCollection<User>(COLLECTION_KEY, id)
  })

  const updateCarMutation = useMutation({
    mutationFn: (params: Partial<UserParams>) => updateDocOnCollection(COLLECTION_KEY, id, params)
  })

  const deleteCarMutation = useMutation({
    mutationFn: () => deleteDocOnCollection(COLLECTION_KEY, id)
  })

  return { user, updateCarMutation, deleteCarMutation }
}
