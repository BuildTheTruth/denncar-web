import type { Car, CarParams } from '@/interfaces/car'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { useMutation, useQuery } from 'react-query'

const carsKeys = {
  all: ['cars'] as const
}

export const useCars = () => {
  const { data: cars, refetch } = useQuery({
    queryKey: carsKeys.all,
    queryFn: () => getDocsByCollection<Car>('cars')
  })

  const createCarMutation = useMutation({
    mutationFn: (params: CarParams) => addDocInCollection('cars', params),
    onSuccess: () => refetch()
  })

  const deleteCarMutation = useMutation({
    mutationFn: (id: string) => deleteDocOnCollection('cars', id),
    onSuccess: () => refetch()
  })

  const updateCarMutation = useMutation({
    mutationFn: ({ id, ...params }: Partial<CarParams> & { id: string }) =>
      updateDocOnCollection('cars', id, params),
    onSuccess: () => refetch()
  })

  return { cars, createCarMutation, deleteCarMutation, updateCarMutation }
}
