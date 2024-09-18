import { Car } from '@/interfaces/car'
import { getDocByCollection } from '@/libs/firebase/firestore'
import { getUser } from '@/libs/firebase/firestore/user'
import { carsKeys } from '@/queries/useCars'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import CarDetail from './_components/CarDetail'

interface Props {
  params: { id: string }
}

export default async function CarPage({ params }: Props) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: carsKeys.detail(params.id),
    queryFn: async () => {
      const car = await getDocByCollection<Car>('cars', params.id)
      if (!car) return { car: null, user: null }
      const author = await getUser(car.authorId)
      return { car, author }
    }
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetail carId={params.id} />
    </HydrationBoundary>
  )
}
