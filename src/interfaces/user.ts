import { BaseDoc, OmitAutoInsertedField } from '@/interfaces/base'

export interface User extends BaseDoc {
  uid: string
  name: string
  phoneNumber?: string
  email?: string
  kakaoId?: string
  profileUrl?: string
  numberOfCars: number
}

export type UserParams = OmitAutoInsertedField<User>
