import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import CustomLayout from '@/components/Layouts/CustomLayout/CustomLayout'

export default function Profile(): JSX.Element {
  const { loading } = useAuth()
  const router = useRouter()
  const { username } = router.query

  if (!loading) return <div className="font-mono">Loading...</div>

  return (
    <CustomLayout title="Devgram">
      <div>{username}</div>
    </CustomLayout>
  )
}
