import { getDocsByCollection } from '@/libs/firebase/firestore'
import { useQuery } from 'react-query'

const carsKeys = {
  all: ['cars'] as const
}

export const useCars = () => {
  const { data: cars } = useQuery({
    queryKey: carsKeys.all,
    queryFn: () => getDocsByCollection<Car>('cars')
  })

  return { cars }
}
