import { FIREBASE_STORAGE_ALT, FIREBASE_STORAGE_BASE_URL } from '@/constants/urls'

export const extractImagePath = (url: string) => {
  const [path] = decodeURIComponent(url)
    .replace(`${FIREBASE_STORAGE_BASE_URL}/`, '')
    .replace(`${FIREBASE_STORAGE_ALT}&`, '')
    .split('?')

  return path
}

export const extractFirstImageUrl = (html: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const imgTag = doc.querySelector('img')
  return imgTag ? imgTag.getAttribute('src') : null
}
