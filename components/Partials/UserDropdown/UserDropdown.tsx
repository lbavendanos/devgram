import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Dropdown from 'react-overlays/Dropdown'
import { app } from '@/utils/firebase/client'
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/hooks/profile'

export default function UserDropdown() {
  const { user } = useAuth()
  const { profile } = useProfile(user)
  const [show, setShow] = useState(false)
  const router = useRouter()

  const handleToggle = (nextShow: boolean) => {
    setShow(nextShow)
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    await app.auth().signOut()
    router.push('/')
  }

  return profile ? (
    <Dropdown show={show} onToggle={handleToggle}>
      {({ props }) => (
        <div {...props}>
          <Dropdown.Toggle>
            {({ props, toggle }) => (
              <a
                {...props}
                id="user-menu"
                className="outline-none"
                role="button"
                tabIndex={0}
                data-testid="toggle"
                onClick={(e) => toggle(true, e)}
              >
                <div className="w-6 h-6 overflow-hidden rounded-full border border-gray-300">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full"
                  />
                </div>
              </a>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {({ props }) => (
              <div
                {...props}
                className="flex flex-col font-mono text-sm bg-white rounded border border-gray-100 shadow-sm w-44"
                role="menu"
                data-testid="menu"
              >
                <Link href={`/${profile.username}`}>
                  <a
                    className="hover:bg-gray-100 outline-none"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="px-3 py-1.5">
                      <span className="">Profile</span>
                    </div>
                  </a>
                </Link>

                <a className="hover:bg-gray-100">
                  <div className="px-3 py-1.5">
                    <span className="">Saved</span>
                  </div>
                </a>

                <hr />

                <a
                  className="hover:bg-gray-100"
                  onClick={handleSignOut}
                  role="button"
                  tabIndex={0}
                >
                  <div className="px-3 py-1.5">
                    <span className="">Sign out</span>
                  </div>
                </a>
              </div>
            )}
          </Dropdown.Menu>
        </div>
      )}
    </Dropdown>
  ) : (
    <div
      className="w-6 h-6 overflow-hidden rounded-full border border-gray-300 bg-gray-200"
      data-testid="loading"
    />
  )
}
