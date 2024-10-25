import { Car, CarParams } from '@/interfaces/car'
import { User } from '@/interfaces/user'
import {
  addDocInCollection,
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'
import { getUser } from '@/libs/firebase/firestore/users'

const COLLECTION_KEY = 'cars'

export const getCarWithAuthor = async (
  carId: string
): Promise<{
  car: Car | null
  author: User | null
}> => {
  const car = await getDocByCollection<Car>(COLLECTION_KEY, carId)
  if (!car) return { car: null, author: null }
  const author = await getUser(car.authorId)
  return { car, author }
}

export const getCars = () => getDocsByCollection<Car>(COLLECTION_KEY)

export const addCar = (params: CarParams) => addDocInCollection(COLLECTION_KEY, params)

export const updateCar = (id: string, params: Partial<CarParams>) =>
  updateDocOnCollection(COLLECTION_KEY, id, params)

export const deleteCar = (id: string) => deleteDocOnCollection(COLLECTION_KEY, id)
