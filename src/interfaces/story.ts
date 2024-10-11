import { BaseDoc, OmitAutoInsertedField } from '@/interfaces/base'

export interface Story extends BaseDoc {
  authorId: string
  authorPhotoUrl: string
  title: string
  thumnailUrl: string
  description: string
}

export type StoryParams = OmitAutoInsertedField<Story>
