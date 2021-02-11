import { useAuth } from '@/contexts/AuthContext'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'
import BasicLayout from '@/components/Layouts/BasicLayout/BasicLayout'
import SocialAuth from '@/components/Partials/SocialAuth/SocialAuth'

export default function Home(): JSX.Element {
  const { user, loading } = useAuth()

  const hanbleGithubSingInError = (error: Error) => {
    console.log(error)
  }

  if (!loading) return <div className="font-mono">Loading...</div>

  return user ? (
    <AuthLayout></AuthLayout>
  ) : (
    <BasicLayout className="flex justify-center items-center">
      <SocialAuth githubSigIn onGithubSignInError={hanbleGithubSingInError} />
    </BasicLayout>
  )
}
