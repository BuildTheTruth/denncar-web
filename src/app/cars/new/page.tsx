'use client'

import CarForm from '@/app/cars/_components/CarForm'
import { CarParams } from '@/interfaces/car'
import { useCars } from '@/libs/tanstack/queries/cars'

export default function NewCarPage() {
  const { createCarMutation } = useCars()

  const handleSubmit = (params: CarParams) => {
    createCarMutation.mutate(params)
  }

  return <CarForm onSubmit={handleSubmit} submitButtonName="등록" />
}
