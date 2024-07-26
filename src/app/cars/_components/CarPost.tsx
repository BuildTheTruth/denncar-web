'use client'

import { Car } from '@/interfaces/car'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const IMAGE_URLS_SPLITTER = '||'

interface Props {
  car: Car
}

export default function CarPost({ car }: Props) {
  const imageUrls = car.imageUrl.split(IMAGE_URLS_SPLITTER)

  return (
    <Card sx={{ minWidth: 360 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={car.model}
        subheader={
          <div>
            <span>{`${car.launch.slice(0, 4)}/${car.launch.slice(4)}`}</span>{' '}
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
      <CardContent>
        <Typography variant="body2">{car.price.toLocaleString()} 원</Typography>
      </CardContent>
    </Card>
  )
}
