import { Car } from '@/interfaces/car'
import { User } from '@/interfaces/user'
import { getDocByCollection } from '@/libs/firebase/firestore'
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
