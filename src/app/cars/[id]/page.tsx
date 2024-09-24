import { getCarAndAuthor } from '@/libs/firebase/firestore/cars'
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
    queryFn: () => getCarAndAuthor(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetail carId={params.id} />
    </HydrationBoundary>
  )
}
