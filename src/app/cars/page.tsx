'use client'

import { useCars } from '@/queries/useCars'

export default function CarsPage() {
  const { cars } = useCars()

  return (
    <div>
      {cars?.map((car) => (
        <div key={car.id}>{car.model}</div>
      ))}
    </div>
  )
}
