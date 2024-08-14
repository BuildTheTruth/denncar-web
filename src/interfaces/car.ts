import { BaseDoc, OmitAutoInsertedField } from '@/interfaces/base'

export interface Car extends BaseDoc {
  model: string
  color: string
  manufacturer: string
  mileage: number
  launch: string
  price: number
  imageUrl: string
  no: string
  region: string
  authorId: string
}

export type CarParams = OmitAutoInsertedField<Car>
