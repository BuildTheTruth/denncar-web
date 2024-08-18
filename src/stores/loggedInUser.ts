import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
import { addDocInCollection, getDocByCollection } from '@/libs/firebase/firestore'
import { getUser } from '@/libs/firebase/firestore/user'
import { User as FirebaseUser } from 'firebase/auth'
import { create } from 'zustand'

interface LoggedInUserStore {
  firebaseUser: FirebaseUser | null
  onSubscribeAuthorization: () => void
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useLoggedInUserStore = create<LoggedInUserStore>((set) => ({
  firebaseUser: null,
  onSubscribeAuthorization: () => onAuthStateChanged((firebaseUser) => set({ firebaseUser })),
  signIn: async () => {
    const user = await signInWithGoogle()
    if (!user) return
    const registeredUser = await getUser(user.uid)
    if (registeredUser) return
    addDocInCollection('users', {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      numberOfCars: 0
    })
  },
  signOut: signOutWithGoogle
}))
