import { User } from '@/interfaces/user'
import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
import { addDocInCollection } from '@/libs/firebase/firestore'
import { getUser } from '@/libs/firebase/firestore/user'
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
      const { displayName, uid, email } = firebaseUser
      const registeredUser = await getUser(uid)
      set({ me: registeredUser })
      if (registeredUser) return
      addDocInCollection('users', { name: displayName, numberOfCars: 0, uid, email })
    }),
  signIn: signInWithGoogle,
  signOut: signOutWithGoogle
}))
