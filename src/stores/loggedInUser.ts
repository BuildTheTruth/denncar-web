import { User } from '@/interfaces/user'
import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
import { User as FirebaseUser } from 'firebase/auth'
import { create } from 'zustand'

interface LoggedInUserStore {
  me: User | null
  firebaseUser: FirebaseUser | null
  onSubscribeAuthorization: () => void
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useLoggedInUserStore = create<LoggedInUserStore>((set) => ({
  me: null,
  firebaseUser: null,
  onSubscribeAuthorization: () =>
    onAuthStateChanged((user) =>
      set({
        firebaseUser: user,
        ...(user && { me: { id: user.uid, name: user.displayName ?? user.uid, numberOfCars: 0 } })
      })
    ),
  signIn: signInWithGoogle,
  signOut: signOutWithGoogle
}))
