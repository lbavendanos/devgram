import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'

export default function Profile(): JSX.Element {
  const { loading } = useAuth()
  const router = useRouter()
  const { username } = router.query

  if (!loading) return <div className="font-mono">Loading...</div>

  return (
    <AuthLayout title="Devgram">
      <div>{username}</div>
    </AuthLayout>
  )
}
