export interface Car {
  id: string
  model: string
  color: string
  manufacturer: string
  mileage: number
  launch: string
  price: number
  imageUrl: string
  createdAt: string
  updatedAt?: string
  no: string
  region: string
  authorId: string
}

export type CarParams = Omit<Car, 'id' | 'createdAt' | 'updatedAt'>
