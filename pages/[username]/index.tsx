import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { db } from '@/utils/firebase/admin'
import { Profile } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import CustomLayout from '@/components/Layouts/CustomLayout/CustomLayout'

interface Props {
  profile: Profile
}

interface Params extends ParsedUrlQuery {
  username: string
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<Params>
) => {
  let profile: Profile | null = null
  const { params } = context

  if (params) {
    const { username } = params

    if (username) {
      try {
        const documentSnapshot = await db
          .collection('profiles')
          .where('username', '==', username)
          .limit(1)
          .get()

        if (documentSnapshot.empty) {
          profile = null
          console.log(`No matching documents with ${username} username.`)
        } else {
          documentSnapshot.forEach((documentData) => {
            profile = documentData.data() as Profile
          })
        }
      } catch (error) {
        console.log('Error getting document:', error)
      }
    }
  }

  if (!profile) {
    return {
      notFound: true,
    }
  }

  return {
    props: { profile },
  }
}

export default function ProfilePage({ profile }: Props) {
  const { loading } = useAuth()

  if (!loading) return <div className="font-mono">Loading...</div>

  return (
    <CustomLayout title={profile.name}>
      <div className="container mx-auto font-mono">
        <div className="flex m-4">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-36 sm:h-36 overflow-hidden rounded-full border border-gray-300">
              <img src={profile.avatar_url} alt={profile.name} />
            </div>
          </div>
          <div className="flex-1 ml-4">
            <div>
              <h1 className="text-2xl">{profile.username}</h1>
            </div>
            <div>
              <button className="btn btn-gray px-4 py-1">Follow</button>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-2 mb-5">
          <h3 className="font-bold text-sm">{profile.name}</h3>
          <p className="text-xs">{profile.bio}</p>
        </div>
        <div className="grid grid-cols-3 border border-l-0 border-r-0 border-gray-400 py-2">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-md">0</span>
            <span className="text-sm">publications</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-md">0</span>
            <span className="text-sm">followers</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-md">0</span>
            <span className="text-sm">followed</span>
          </div>
        </div>
      </div>
    </CustomLayout>
  )
}
