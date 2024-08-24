import { User } from '@/interfaces/user'
import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
import { addDocInCollection } from '@/libs/firebase/firestore'
import { addUser, getUser } from '@/libs/firebase/firestore/user'
import { User as FirebaseUser } from 'firebase/auth'
import { create } from 'zustand'

interface LoggedInUserStore {
  firebaseUser: FirebaseUser | null
  me: User | null
  onSubscribeAuthorization: () => void
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useLoggedInUserStore = create<LoggedInUserStore>((set) => ({
  firebaseUser: null,
  me: null,
  onSubscribeAuthorization: () =>
    onAuthStateChanged(async (firebaseUser) => {
      set({ firebaseUser })
      if (!firebaseUser) return
      const registeredUser = await getUser(firebaseUser.uid)
      if (!registeredUser) addUser(firebaseUser)
      else set({ me: registeredUser })
    }),
  signIn: signInWithGoogle,
  signOut: signOutWithGoogle
}))
