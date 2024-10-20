import useToast from '@/hooks/useToast'
import type { CarParams } from '@/interfaces/car'
import {
  addDocInCollection,
  deleteDocOnCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { deleteDirectoryInStorage } from '@/libs/firebase/storage'
import { carQueryOptions, carsKeys, carsQueryOptions } from '@/libs/tanstack/options/cars'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const COLLECTION_KEY = 'cars'

export const useCars = () => {
  const toast = useToast()
  const router = useRouter()

  const { data: cars, refetch } = useSuspenseQuery(carsQueryOptions())

  const createCarMutation = useMutation({
    mutationFn: (params: CarParams) => addDocInCollection(COLLECTION_KEY, params),
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

  const {
    data: { car, author },
    refetch
  } = useSuspenseQuery(carQueryOptions(id))

  const updateCarMutation = useMutation({
    mutationFn: (params: Partial<CarParams>) => updateDocOnCollection(COLLECTION_KEY, id, params),
    onSuccess: () => {
      toast.success('차량 수정 완료')
      router.replace(`/cars/${id}`)
      refetch()
    }
  })

  const deleteCarMutation = useMutation({
    mutationFn: () => deleteDocOnCollection(COLLECTION_KEY, id),
    onSuccess: () => {
      if (!car) return
      toast.success('차량 삭제 완료')
      router.replace('/cars')
      queryClient.invalidateQueries({ queryKey: carsKeys.all })
      deleteDirectoryInStorage(`/images/cars/${car.no}`)
    }
  })

  return { car, author, updateCarMutation, deleteCarMutation }
}
