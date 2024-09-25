import { BaseDoc } from '@/interfaces/base'

export interface Board extends BaseDoc {
  authorId: string
  authorPhotoUrl: string
  title: string
  imageUrl: string
  description: string
}
