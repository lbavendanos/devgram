import { app, db, githubAuthProvider } from '@/utils/firebase/firebase'
import { FaGithub } from 'react-icons/fa'
import { User } from '@/types'

interface Props {
  githubSigIn?: boolean
  onGithubSignInSuccess?: (user: User) => void
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
      const {
        user: firebaseUser,
        additionalUserInfo: githubInfo,
      } = await app.auth().signInWithPopup(githubAuthProvider)

      if (firebaseUser && githubInfo) {
        const { isNewUser } = githubInfo
        const { uid } = firebaseUser
        const { username } = githubInfo
        const { profile } = githubInfo
        const user: User = { ...profile, username, uid } as User

        if (isNewUser) {
          try {
            await db.collection('users').doc(uid).set(user)
          } catch (error) {
            console.error('Error adding document: ', error)
          }
        }

        if (onGithubSignInSuccess) {
          onGithubSignInSuccess(user)
        }
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
