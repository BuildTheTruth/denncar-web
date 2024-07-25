import CarCard from '@/components/Card'
import type { Car } from '@/interfaces/car'
import { getDocsByCollection } from '@/libs/firebase/firestore'
import { Grid } from '@mui/material'

export default async function CarsPage() {
  const cars = await getDocsByCollection<Car>('cars')

  return (
    <Grid container spacing={2} padding={2}>
      {cars.map((car) => (
        <Grid item xs key={car.id}>
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  )
}
