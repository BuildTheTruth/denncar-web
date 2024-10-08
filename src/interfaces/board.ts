import { BaseDoc, OmitAutoInsertedField } from '@/interfaces/base'

export interface Board extends BaseDoc {
  authorId: string
  authorPhotoUrl: string
  title: string
  thumnailUrl: string
  description: string
}

export type BoardParams = OmitAutoInsertedField<Board>
