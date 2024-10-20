import { carsQueryOptions } from '@/queries/useCars'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import CarPostList from './_components/CarPostList'

export default async function CarsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(carsQueryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarPostList />
    </HydrationBoundary>
  )
}
