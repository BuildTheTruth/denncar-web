import type { Car } from '@/interfaces/car'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { getCarWithAuthor } from '@/libs/firebase/firestore/cars'
import { queryOptions } from '@tanstack/react-query'

const COLLECTION_KEY = 'cars'

export const carsKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (carId: string) => [...carsKeys.all, carId] as const
}

export const carsQueryOptions = () =>
  queryOptions({
    queryKey: carsKeys.all,
    queryFn: () => getDocsByCollection<Car>(COLLECTION_KEY)
  })

export const carQueryOptions = (id: string) =>
  queryOptions({
    queryKey: carsKeys.detail(id),
    queryFn: () => getCarWithAuthor(id)
  })
