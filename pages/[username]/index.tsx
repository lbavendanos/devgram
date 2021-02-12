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
      <div>{profile.username}</div>
    </CustomLayout>
  )
}
