import { useEffect, useState } from 'react'
import { app, db } from '@/utils/firebase/firebase'
import { AuthContext } from '@/contexts/AuthContext'
import { User } from '@/types'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'
import BasicLayout from '@/components/Layouts/BasicLayout/BasicLayout'
import SocialSigIn from '@/components/Partials/SocialSignIn/SocialSignIn'

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const hanbleGithubSingInError = (error: Error) => {
    console.log(error)
  }

  const onAuthStateChanged = () => {
    return app.auth().onAuthStateChanged(async (firebaseUser) => {
      setLoading(false)

      let newUser: User | null = null

      if (firebaseUser) {
        try {
          const documentSnapshot = await db
            .collection('users')
            .doc(firebaseUser.uid)
            .get()

          newUser = documentSnapshot.exists
            ? (documentSnapshot.data() as User)
            : null
        } catch (error) {
          console.log('Error getting document:', error)
        }
      }

      setUser(newUser)
      setLoading(true)
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged()

    return unsubscribe
  }, [])

  return loading ? (
    user ? (
      <AuthContext.Provider value={user}>
        <AuthLayout></AuthLayout>
      </AuthContext.Provider>
    ) : (
      <BasicLayout className="flex justify-center items-center">
        <SocialSigIn
          githubSigIn
          onGithubSignInError={hanbleGithubSingInError}
        />
      </BasicLayout>
    )
  ) : (
    <div>Loading...</div>
  )
}
