import useToast from '@/hooks/useToast'
import type { Car, CarParams } from '@/interfaces/car'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const carsKeys = {
  all: ['cars'] as const,
  detail: (carId: string) => [...carsKeys.all, carId] as const
}

export const useCars = () => {
  const toast = useToast()
  const router = useRouter()

  const { data: cars, refetch } = useSuspenseQuery({
    queryKey: carsKeys.all,
    queryFn: () => getDocsByCollection<Car>('cars')
  })

  const createCarMutation = useMutation({
    mutationFn: (params: CarParams) => addDocInCollection('cars', params),
    onSuccess: () => {
      toast.success('차량 등록 완료')
      router.replace('/cars')
      refetch()
    }
  })

  return { cars, createCarMutation }
}

export const useCar = (id: string) => {
  const toast = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: car, refetch } = useSuspenseQuery({
    queryKey: carsKeys.detail(id),
    queryFn: () => getDocByCollection<Car>('cars', id)
  })

  const updateCarMutation = useMutation({
    mutationFn: (params: Partial<CarParams>) => updateDocOnCollection('cars', id, params),
    onSuccess: () => {
      toast.success('차량 수정 완료')
      router.replace(`/cars/${id}`)
      refetch()
    }
  })

  const deleteCarMutation = useMutation({
    mutationFn: () => deleteDocOnCollection('cars', id),
    onSuccess: () => {
      toast.success('차량 삭제 완료')
      router.replace('/cars')
      queryClient.invalidateQueries({ queryKey: carsKeys.all })
    }
  })

  return { car, updateCarMutation, deleteCarMutation }
}
