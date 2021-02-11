import { useEffect, useState } from 'react'
import firebase from 'firebase'
import { app } from '@/utils/firebase/firebase'
import { AuthContext } from '@/contexts/AuthContext'

interface Props {
  children: JSX.Element
}

export default function AuthProvider({ children }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = app.auth().onIdTokenChanged((user) => {
      setUser(user)
      setLoading(true)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
