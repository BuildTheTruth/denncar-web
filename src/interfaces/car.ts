export interface Car {
  id: string
  model: string
  color: string
  manufacturer: string
  mileage: number
  year: string
  price: number
  imageUrls: string
  createdAt: string
}

export type CarParams = Omit<Car, 'id'>
