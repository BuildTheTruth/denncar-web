import useToast from '@/hooks/useToast'
import type { Car, CarParams } from '@/interfaces/car'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { getCarAndAuthor } from '@/libs/firebase/firestore/cars'
import { getUser } from '@/libs/firebase/firestore/users'
import { deleteDirectoryInStorage } from '@/libs/firebase/storage'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const COLLECTION_KEY = 'cars'

export const carsKeys = {
  all: [COLLECTION_KEY] as const,
  detail: (carId: string) => [...carsKeys.all, carId] as const
}

export const useCars = () => {
  const toast = useToast()
  const router = useRouter()

  const { data: cars, refetch } = useSuspenseQuery({
    queryKey: carsKeys.all,
    queryFn: () => getDocsByCollection<Car>(COLLECTION_KEY)
  })

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
  } = useSuspenseQuery({
    queryKey: carsKeys.detail(id),
    queryFn: () => getCarAndAuthor(id)
  })

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
