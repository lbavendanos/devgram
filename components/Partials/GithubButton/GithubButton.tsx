import firebase from 'firebase'
import { app, db, githubAuthProvider } from '@/utils/firebase/client'
import { FaGithub } from 'react-icons/fa'

interface Props {
  className?: string
  onGithubSignInSuccess?: (user: firebase.User) => void
  onGithubSignInError?: (error: Error) => void
}

export default function GithubButton({
  className,
  onGithubSignInSuccess,
  onGithubSignInError,
}: Props) {
  const handleGithubSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const { user, additionalUserInfo } = await app
        .auth()
        .signInWithPopup(githubAuthProvider)

      if (user && additionalUserInfo) {
        const { isNewUser } = additionalUserInfo

        if (isNewUser) {
          try {
            const { uid } = user
            const { username } = additionalUserInfo
            const { profile } = additionalUserInfo
            const documentData = {
              ...profile,
              username,
              uid,
            }

            await db.collection('profiles').doc(uid).set(documentData)
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
    <button
      className={`btn btn-gray flex items-center px-5 py-1 ${className}`}
      onClick={handleGithubSignIn}
    >
      <FaGithub data-testid="icon" />
      <span className="ml-2">Login with GitHub</span>
    </button>
  )
}
