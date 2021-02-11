import { useEffect, useState } from 'react'
import Dropdown from 'react-overlays/Dropdown'
import Link from 'next/link'
import { app, db } from '@/utils/firebase/firebase'
import { useAuth } from '@/contexts/AuthContext'
import { Profile } from '@/types'

export default function UserDropdown(): JSX.Element {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [show, setShow] = useState(false)

  const handleToggle = (nextShow: boolean) => {
    setShow(nextShow)
  }

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    app.auth().signOut()
  }

  const fetchProfile = async (id: string) => {
    let profile = null

    try {
      const documentSnapshot = await db.collection('profiles').doc(id).get()

      profile = documentSnapshot.exists
        ? (documentSnapshot.data() as Profile)
        : null
    } catch (error) {
      console.log('Error getting document:', error)
    }

    return profile
  }

  useEffect(() => {
    if (user) {
      fetchProfile(user.uid).then((profile) => {
        setProfile(profile)
      })
    }
  }, [user])

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
