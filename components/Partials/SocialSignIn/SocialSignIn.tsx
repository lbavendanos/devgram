import { FaGithub } from 'react-icons/fa'
import firebase from 'firebase/app'
import { app, githubAuthProvider } from '@/utils/firebase/firebase'

interface Props {
  githubSigIn?: boolean
  onGithubSignInSuccess?: (
    user: firebase.User,
    credential: firebase.auth.AuthCredential
  ) => void
  onGithubSignInError?: (error: Error) => void
}

export default function SocialSigIn({
  githubSigIn,
  onGithubSignInSuccess,
  onGithubSignInError,
}: Props): JSX.Element {
  const handleGithubSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const { user, credential } = await app
        .auth()
        .signInWithPopup(githubAuthProvider)

      if (user && credential && onGithubSignInSuccess) {
        onGithubSignInSuccess(user, credential)
      }
    } catch (error) {
      if (onGithubSignInError) {
        onGithubSignInError(error)
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="text-center mb-2">
        <h1 className="font-mono text-3xl text-black">Devgram</h1>
        <p className="font-mono text-md text-gray-600">
          the social network for developers
        </p>
      </div>
      {githubSigIn && (
        <div className="flex justify-center">
          <button
            className="font-mono rounded transition-colors duration-300 ease-in-out focus:outline-none bg-gray-600 hover:bg-gray-800 text-white flex items-center px-5 py-1"
            onClick={handleGithubSignIn}
          >
            <FaGithub />
            <span className="ml-2">Login with GitHub</span>
          </button>
        </div>
      )}
    </div>
  )
}
