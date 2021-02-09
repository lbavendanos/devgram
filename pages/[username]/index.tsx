import { useRouter } from 'next/router'

export default function Profile(): JSX.Element {
  const router = useRouter()
  const { username } = router.query

  return <div>{username}</div>
}
