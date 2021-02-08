import { AuthContext } from '@/contexts/AuthContext'
import { app } from '@/utils/firebase/firebase'
import { useContext, useEffect, useRef, useState } from 'react'

export default function UserDropdown(): JSX.Element {
  const user = useContext(AuthContext)
  const [dropdown, setDropdown] = useState<boolean>(false)
  const dropdownElement = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    setDropdown((state) => !state)
  }

  const handleMenuBlur = () => {
    setDropdown(false)
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    setDropdown(false)
    await app.auth().signOut()
  }

  useEffect(() => {
    if (dropdown && dropdownElement.current) {
      dropdownElement.current.focus()
    }
  }, [dropdown, dropdownElement])

  return (
    <div className="relative">
      <a
        className="block outline-none"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        data-testid="toggle"
      >
        <div className="w-6 h-6 overflow-hidden rounded-full border border-gray-300">
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        </div>
      </a>
      <div
        ref={dropdownElement}
        className={`absolute z-10 flex flex-col font-mono text-sm bg-white rounded border border-gray-100 shadow-sm outline-none w-44 mt-3 right-0 ${
          dropdown ? 'block' : 'hidden'
        }`}
        tabIndex={-1}
        onBlur={handleMenuBlur}
        data-testid="menu"
      >
        <a className="hover:bg-gray-100">
          <div className="px-3 py-1.5">
            <span className="">Profile</span>
          </div>
        </a>
        <a className="hover:bg-gray-100">
          <div className="px-3 py-1.5">
            <span className="">Saved</span>
          </div>
        </a>
        <hr />
        <a className="hover:bg-gray-100" onClick={handleSignOut} role="button">
          <div className="px-3 py-1.5">
            <span className="">Sign out</span>
          </div>
        </a>
      </div>
    </div>
  )
}
