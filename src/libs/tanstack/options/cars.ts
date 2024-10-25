import { getCars, getCarWithAuthor } from '@/libs/firebase/firestore/cars'
import { queryOptions } from '@tanstack/react-query'

export const carsKeys = {
  all: ['cars'] as const,
  detail: (carId: string) => [...carsKeys.all, carId] as const
}

export const carsQueryOptions = () =>
  queryOptions({
    queryKey: carsKeys.all,
    queryFn: getCars
  })

export const carQueryOptions = (id: string) =>
  queryOptions({
    queryKey: carsKeys.detail(id),
    queryFn: () => getCarWithAuthor(id)
  })
