import { WithId } from '@/interfaces/base'
import { Story, StoryParams } from '@/interfaces/story'
import {
  deleteDocOnCollection,
  getDocByCollection,
  getDocsByCollection,
  setDocInCollection,
  updateDocOnCollection
} from '@/libs/firebase/firestore'

const COLLECTION_KEY = 'stories'

export const getStories = () => getDocsByCollection<Story>(COLLECTION_KEY)

export const getStory = async (storyId: string): Promise<Story | null> =>
  getDocByCollection(COLLECTION_KEY, storyId)

export const addStoryWithId = ({ id, ...params }: WithId<StoryParams>) =>
  setDocInCollection(COLLECTION_KEY, id, params)

export const updateStory = (id: string, params: Partial<StoryParams>) =>
  updateDocOnCollection(COLLECTION_KEY, id, params)

export const deleteStory = (id: string) => deleteDocOnCollection(COLLECTION_KEY, id)
