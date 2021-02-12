import firebase from 'firebase'
import { app, db, githubAuthProvider } from '@/utils/firebase/firebase'
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
  const handleGithubSignIn = async (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <a
      className={`
        font-mono
        rounded
        transition-colors
        duration-300
        ease-in-out
        focus:outline-none
        bg-gray-600
        hover:bg-gray-800
        text-white
        flex
        items-center
        px-5
        py-1
        ${className}`}
      role="button"
      tabIndex={0}
      onClick={handleGithubSignIn}
    >
      <FaGithub />
      <span className="ml-2">Login with GitHub</span>
    </a>
  )
}
