import dayjs from 'dayjs'
import { DocumentData, Timestamp } from 'firebase/firestore'

export const extractDateByDoucmentData = ({
  name,
  data,
  template = 'YYYY.MM.DD hh:mm:ss'
}: {
  name: 'createdAt' | 'updatedAt'
  data: DocumentData
  template?: string
}) => ({
  [name]: dayjs((data[name] as Timestamp).toDate()).format(template)
})
