import { BaseDoc, OmitAutoInsertedField } from '@/interfaces/base'

export interface User extends BaseDoc {
  name: string
  phoneNumber?: string
  email?: string
  kakaoId?: string
  photoURL?: string
  numberOfCars: number
}

export type UserParams = OmitAutoInsertedField<User>
