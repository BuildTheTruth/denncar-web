import { carQueryOptions } from '@/queries/useCars'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import CarDetail from './_components/CarDetail'

interface Props {
  params: { id: string }
}

export default async function CarPage({ params }: Props) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(carQueryOptions(params.id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetail carId={params.id} />
    </HydrationBoundary>
  )
}
