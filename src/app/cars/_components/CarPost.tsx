'use client'

import { CAR_IMAGE_URL_SPLITTER } from '@/constants/splitters'
import { Car } from '@/interfaces/car'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

interface Props {
  car: Car
}

export default function CarPost({ car }: Props) {
  const router = useRouter()
  const imageUrls = car.imageUrl.split(CAR_IMAGE_URL_SPLITTER)

  const handleSettingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  const handleCardClick = () => {
    router.push(`/cars/${car.id}`)
  }

  return (
    <Card sx={{ width: 360 }} onClick={handleCardClick}>
      <CardHeader
        action={
          <IconButton aria-label="setting" onClick={handleSettingClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={car.model}
        subheader={
          <div>
            <span>
              {car.launch.length > 4
                ? `${car.launch.slice(0, 4)}/${car.launch.slice(4)}`
                : car.launch}
            </span>{' '}
            <span>{car.mileage.toLocaleString()}km</span>
          </div>
        }
      />
      <CardMedia
        component="img"
        src={imageUrls?.[0] ?? '/logo.svg'}
        height={240}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography fontSize={24} fontWeight={600}>
          {car.price.toLocaleString()} 만원
        </Typography>
      </CardContent>
    </Card>
  )
}
