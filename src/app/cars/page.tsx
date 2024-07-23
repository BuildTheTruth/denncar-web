'use client'

import useCollection from '@/hooks/firestore/useCollection'

export default function CarsPage() {
  const { data: cars } = useCollection<Car>('cars')

  return (
    <div>
      {cars?.map((car) => (
        <div key={car.id}>{car.model}</div>
      ))}
    </div>
  )
}
