import { Story } from '@/interfaces/story'
import { getDocByCollection } from '@/libs/firebase/firestore'

const COLLECTION_KEY = 'stories'

export const getStory = async (storyId: string): Promise<Story | null> =>
  getDocByCollection(COLLECTION_KEY, storyId)
