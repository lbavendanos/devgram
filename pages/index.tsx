import { useAuth } from '@/contexts/AuthContext'
import CustomLayout from '@/components/Layouts/CustomLayout/CustomLayout'
import BasicLayout from '@/components/Layouts/BasicLayout/BasicLayout'
import GithubButton from '@/components/Partials/GithubButton/GithubButton'

export default function Home(): JSX.Element {
  const { user, loading } = useAuth()
  const title = 'Devgram'

  const handleGithubSignInError = (error: Error) => {
    console.log(error)
  }

  if (!loading) return <div className="font-mono">Loading...</div>

  return user ? (
    <CustomLayout title={title}></CustomLayout>
  ) : (
    <BasicLayout title={title} className="flex justify-center items-center">
      <div className="container mx-auto">
        <div className="text-center mb-2">
          <h1 className="font-mono text-3xl text-black">Devgram</h1>
          <p className="font-mono text-md text-gray-600">
            the social network for developers
          </p>
        </div>
        <div className="flex justify-center">
          <GithubButton onGithubSignInError={handleGithubSignInError} />
        </div>
      </div>
    </BasicLayout>
  )
}
