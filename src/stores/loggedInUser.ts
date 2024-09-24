import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
import { addUser, getUser } from '@/libs/firebase/firestore/users'
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
  onSubscribeAuthorization: () =>
    onAuthStateChanged(async (firebaseUser) => {
      set({ firebaseUser })
      if (!firebaseUser) return
      const registeredUser = await getUser(firebaseUser.uid)
      if (!registeredUser) addUser(firebaseUser)
    }),
  signIn: signInWithGoogle,
  signOut: signOutWithGoogle
}))
