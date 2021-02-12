import Link from 'next/link'
import { FaHome, FaHeart, FaWpexplorer } from 'react-icons/fa'
import UserDropdown from '@/components/Partials/UserDropdown/UserDropdown'
import { useAuth } from '@/contexts/AuthContext'
import GithubButton from '../GithubButton/GithubButton'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { user } = useAuth()
  const router = useRouter()

  const handleGithubSignInSuccess = () => {
    router.push('/')
  }

  const handleGithubSignInError = (error: Error) => {
    console.log(error)
  }

  return (
    <header className="sticky z-40 top-0 border-b border-gray-300">
      <div className="container mx-auto flex p-4">
        <div className="flex-1">
          <Link href="/">
            <a className="outline-none" role="button" tabIndex={0}>
              <h1 className="font-mono text-xl text-black">Devgram</h1>
            </a>
          </Link>
        </div>
        {user ? (
          <nav className="flex-1">
            <ul className="flex justify-end">
              <li className="" data-testid="home">
                <Link href="/">
                  <a className="block outline-none" role="button" tabIndex={0}>
                    <FaHome className="w-6 h-6" />
                  </a>
                </Link>
              </li>
              <li className="ml-6" data-testid="explorer">
                <a className="block outline-none">
                  <FaWpexplorer className="w-6 h-6" />
                </a>
              </li>
              <li className="ml-6" data-testid="activity">
                <a className="block outline-none">
                  <FaHeart className="w-6 h-6" />
                </a>
              </li>
              <li className="ml-6" data-testid="user">
                <UserDropdown />
              </li>
            </ul>
          </nav>
        ) : (
          <div className="flex-1">
            <div className="flex justify-end">
              <GithubButton
                className="text-xs text-center px-3"
                onGithubSignInSuccess={handleGithubSignInSuccess}
                onGithubSignInError={handleGithubSignInError}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
