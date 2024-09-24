import { Car } from '@/interfaces/car'
import { getDocByCollection } from '@/libs/firebase/firestore'
import { getUser } from '@/libs/firebase/firestore/users'

const COLLECTION_KEY = 'cars'

export const getCarAndAuthor = async (carId: string) => {
  const car = await getDocByCollection<Car>(COLLECTION_KEY, carId)
  if (!car) return { car, author: null }
  const author = await getUser(car.authorId)
  return { car, author }
}
