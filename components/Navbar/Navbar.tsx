import { FaHome, FaHeart } from 'react-icons/fa'

export default function Navbar(): JSX.Element {
  return (
    <header className="sticky z-40 top-0 border-b border-gray-300">
      <div className="container mx-auto flex p-4">
        <div className="flex-1">
          <h1 className="font-mono text-xl text-black">Devgram</h1>
        </div>
        <nav className="flex-1">
          <ul className="flex justify-end">
            <li className="">
              <a className="block" data-testid="home">
                <FaHome className="w-6 h-6" />
              </a>
            </li>
            <li className="ml-6">
              <a className="block" data-testid="activity">
                <FaHeart className="w-6 h-6" />
              </a>
            </li>
            <li className="ml-6">
              <a className="block" data-testid="user">
                <div className="w-6 h-6 overflow-hidden rounded-full border border-gray-300">
                  <img
                    src="https://avatars.githubusercontent.com/u/28379400?s=60&v=4"
                    alt="user"
                    className="w-full h-full"
                  />
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
