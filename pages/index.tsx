import firebase from 'firebase/app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { app } from '@/utils/firebase/firebase'
import { AuthContext } from '@/contexts/AuthContext'
import { User } from '@/types'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'
import BasicLayout from '@/components/Layouts/BasicLayout/BasicLayout'
import SocialSigIn from '@/components/Partials/SocialSignIn/SocialSignIn'

export default function Home(): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const handleGithubSignInSuccess = () => {
    router.push('/')
  }

  const hanbleGithubSingInError = (error: Error) => {
    console.log(error)
  }

  const transformUserAuth = (userAuth: firebase.User) => {
    const name = userAuth.displayName || ''
    const email = userAuth.email || ''
    const avatar = userAuth.photoURL || ''

    return { name, email, avatar }
  }

  useEffect(() => {
    app.auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth ? transformUserAuth(userAuth) : null)
    })
  }, [])

  return user ? (
    <AuthContext.Provider value={user}>
      <AuthLayout></AuthLayout>
    </AuthContext.Provider>
  ) : (
    <BasicLayout className="flex justify-center items-center">
      <SocialSigIn
        githubSigIn
        onGithubSignInSuccess={handleGithubSignInSuccess}
        onGithubSignInError={hanbleGithubSingInError}
      />
    </BasicLayout>
  )
}
