import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User
} from 'firebase/auth'
import { auth } from '.'

export async function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, provider)
    return user
  } catch (error) {
    console.error('Error signing in with Google', error)
  }
}

export async function signOutWithGoogle() {
  try {
    return auth.signOut()
  } catch (error) {
    console.error('Error signing out with Google', error)
  }
}
