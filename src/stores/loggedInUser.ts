import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
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
  onSubscribeAuthorization: () => onAuthStateChanged((user) => set({ firebaseUser: user })),
  signIn: signInWithGoogle,
  signOut: signOutWithGoogle
}))
