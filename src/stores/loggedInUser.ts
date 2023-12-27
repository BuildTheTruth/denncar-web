import { onAuthStateChanged, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth'
import { User } from 'firebase/auth'
import { create } from 'zustand'

interface LoggedInUserStore {
  loggedInUser: User | null
  onSubscribeAuthorization: () => void
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useLoggedInUserStore = create<LoggedInUserStore>((set) => ({
  loggedInUser: null,
  onSubscribeAuthorization: () => onAuthStateChanged((user) => set({ loggedInUser: user })),
  signIn: () => signInWithGoogle(),
  signOut: () => signOutWithGoogle()
}))
