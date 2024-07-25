import { getDocsByCollection } from '@/libs/firebase/firestore'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import CarPostList from './components/CarPostList'
import { carsKeys } from '@/queries/useCars'

export default async function CarsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: carsKeys.all,
    queryFn: () => getDocsByCollection('cars')
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarPostList />
    </HydrationBoundary>
  )
}
