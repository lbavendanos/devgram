import firebase from 'firebase'
import { createContext, useContext } from 'react'

export interface Auth {
  user: firebase.User | null
  loading: boolean
}

export const AuthContext = createContext<Auth>({ user: null, loading: false })

export const useAuth = (): Auth => {
  return useContext(AuthContext)
}
