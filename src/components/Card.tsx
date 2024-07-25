'use client'

import { Car } from '@/interfaces/car'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

interface Props {
  car: Car
}

export default function CarCard({ car }: Props) {
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
            <span>{`${car.year.slice(0, 4)}/${car.year.slice(4)}`}</span>{' '}
            <span>{car.mileage.toLocaleString()}km</span>
          </div>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2">{car.price.toLocaleString()} 원</Typography>
      </CardContent>
    </Card>
  )
}
