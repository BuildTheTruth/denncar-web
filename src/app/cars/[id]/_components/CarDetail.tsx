'use client'

import { CAR_IMAGE_URL_SPLITTER } from '@/constants/splitters'
import { useCar } from '@/queries/useCars'
import styled from '@emotion/styled'
import { Box, Divider, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
      <CarInfoWrapper>
        <Box sx={{ display: 'flex', m: 1 }}>
          <Box>
            <Typography fontWeight={600} variant="h5">
              {car.model}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>{car.mileage} km</Typography>
              <DotDivider />
              <Typography>
                {car.launch.slice(0, 4)}년 {car.launch.slice(4)}월{' '}
              </Typography>
              <DotDivider />
              <Typography>{car.color}</Typography>
              <DotDivider />
              <Typography>{car.no}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'end', alignItems: 'center' }}>
            <Typography variant="h6" color="red">
              {car.price}만원
            </Typography>
          </Box>
        </Box>
        <SwiperWrapper>
          <Swiper
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true
            }}
            autoplay={{ delay: 3000 }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {imageUrls.map((imageUrl) => (
              <SwiperSlide key={imageUrl}>
                <img src={imageUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
      </CarInfoWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: fiex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const CarInfoWrapper = styled.div`
  margin: 16px 0;
`

const DotDivider = styled(Divider)`
  margin: 4px 8px;
  border: 1px solid black;
`

const SwiperWrapper = styled.div`
  margin: 24px 0;
  height: 600px;
  width: 800px;
`
