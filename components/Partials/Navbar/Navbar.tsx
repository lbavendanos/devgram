import Link from 'next/link'
import { FaHome, FaHeart, FaWpexplorer } from 'react-icons/fa'
import UserDropdown from '../UserDropdown/UserDropdown'

export default function Navbar(): JSX.Element {
  return (
    <header className="sticky z-40 top-0 border-b border-gray-300">
      <div className="container mx-auto flex p-4">
        <div className="flex-1">
          <h1 className="font-mono text-xl text-black">Devgram</h1>
        </div>
        <nav className="flex-1">
          <ul className="flex justify-end">
            <li className="" data-testid="home">
              <Link href="/">
                <a className="block" role="button" tabIndex={0}>
                  <FaHome className="w-6 h-6" />
                </a>
              </Link>
            </li>
            <li className="ml-6" data-testid="explorer">
              <a className="block">
                <FaWpexplorer className="w-6 h-6" />
              </a>
            </li>
            <li className="ml-6" data-testid="activity">
              <a className="block">
                <FaHeart className="w-6 h-6" />
              </a>
            </li>
            <li className="ml-6" data-testid="user">
              <UserDropdown />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
