type AutoInsertedField = 'id' | 'createdAt' | 'updatedAt'

export interface BaseDoc {
  id: string
  updatedAt?: string
  createdAt: string
}

export type OmitAutoInsertedField<T> = Omit<T, AutoInsertedField>

export type WithId<T> = T & { id: string }
