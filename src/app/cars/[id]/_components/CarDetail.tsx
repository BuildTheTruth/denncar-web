'use client'

import { CAR_IMAGE_URL_SPLITTER } from '@/constants/splitters'
import { useCar } from '@/queries/useCars'
import styled from '@emotion/styled'
import { notFound } from 'next/navigation'

interface Props {
  carId: string
}

export default function CarDetail({ carId }: Props) {
  const { car } = useCar(carId)

  if (!car) {
    return notFound()
  }

  const imageUrls = car.imageUrl.split(CAR_IMAGE_URL_SPLITTER)

  return (
    <Container>
      {imageUrls.map((src, index) => (
        <CarImage key={index} src={src} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const CarImage = styled.img`
  width: 500px;
  height: 500px;
`
