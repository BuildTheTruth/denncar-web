import { WithId } from '@/interfaces/base'
import { Story, StoryParams } from '@/interfaces/story'
import {
  deleteDocFromCollection,
  getDocFromCollection,
  getDocsFromCollection,
  setDocInCollection,
  updateDocInCollection
} from '@/libs/firebase/firestore'

const COLLECTION_KEY = 'stories'

export const getStories = () => getDocsFromCollection<Story>(COLLECTION_KEY)

export const getStory = async (storyId: string): Promise<Story | null> =>
  getDocFromCollection(COLLECTION_KEY, storyId)

export const addStoryWithId = ({ id, ...params }: WithId<StoryParams>) =>
  setDocInCollection(COLLECTION_KEY, id, params)

export const updateStory = (id: string, params: Partial<StoryParams>) =>
  updateDocInCollection(COLLECTION_KEY, id, params)

export const deleteStory = (id: string) => deleteDocFromCollection(COLLECTION_KEY, id)
