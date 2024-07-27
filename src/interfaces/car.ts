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
  carNo: string
  region: string
  createdBy: string
}

export type CarParams = Omit<Car, 'id' | 'creaedAt' | 'updatedAt'>
