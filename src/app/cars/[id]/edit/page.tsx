'use client'

import CarForm from '@/app/cars/_components/CarForm'
import { CarParams } from '@/interfaces/car'
import { useCar } from '@/queries/useCars'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default function CarEditPage({ params }: Props) {
  const { updateCarMutation, car } = useCar(params.id)

  if (!car) {
    return notFound()
  }

  const handleSubmit = (params: CarParams) => {
    updateCarMutation.mutate(params)
  }

  return (
    <CarForm
      onSubmit={handleSubmit}
      defaultValues={{
        no: car.no,
        color: car.color,
        model: car.model,
        manufacturer: car.manufacturer,
        mileage: car.mileage,
        launch: car.launch,
        price: car.price,
        imageUrl: car.imageUrl,
        region: car.region,
        authorId: car.authorId
      }}
      submitButtonName="수정"
    />
  )
}
