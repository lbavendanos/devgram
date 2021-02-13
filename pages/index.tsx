import { useAuth } from '@/contexts/AuthContext'
import CustomLayout from '@/components/Layouts/CustomLayout/CustomLayout'
import BasicLayout from '@/components/Layouts/BasicLayout/BasicLayout'
import GithubButton from '@/components/Partials/GithubButton/GithubButton'
import { FaHeart, FaRegComment } from 'react-icons/fa'

export default function HomePage() {
  const { user, loading } = useAuth()
  const title = 'Devgram'

  const handleGithubSignInError = (error: Error) => {
    console.log(error)
  }

  if (!loading) return <div className="font-mono">Loading...</div>

  return user ? (
    <CustomLayout title={title}>
      <div className="container mx-auto">
        <article>
          <div className="flex w-full font-mono p-3">
            <div className="flex-shrink-0 mr-3">
              <div className="w-12 h-12 overflow-hidden rounded-full border border-gray-300">
                <img
                  src="https://placeimg.com/640/480/tech/grayscale"
                  alt="tech grayscale"
                  className="object-fill w-full h-full"
                />
              </div>
            </div>
            <div className="flex-grow flex items-center">
              <h3 className="text-sm font-medium">tech.grayscale</h3>
            </div>
          </div>
          <div className="w-full sm:h-full divide-gray-300">
            <img
              src="https://placeimg.com/640/640/tech/grayscale"
              alt="tech grayscale"
              className="w-full h-full"
            />
          </div>
          <div className="w-full p-3">
            <section className="flex mb-1">
              <FaHeart className="w-6 h-6 mr-3" />
              <FaRegComment className="w-6 h-6" />
            </section>
            <section className="mb-1">
              <h3 className="font-bold">0 likes</h3>
            </section>
            <section className="mb-3">
              <p className="leading-tight">
                <span className="font-semibold">tech.grayscale</span>&nbsp;is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book
              </p>
            </section>
            <section>
              <h5 className="text-gray-500 text-xs">13 HOURS AGO</h5>
            </section>
          </div>
        </article>
      </div>
    </CustomLayout>
  ) : (
    <BasicLayout title={title} className="flex justify-center items-center">
      <div className="container mx-auto">
        <div className="text-center mb-2">
          <h1 className="font-mono text-3xl text-black">Devgram</h1>
          <p className="font-mono text-md text-gray-600">
            the social network for developers
          </p>
        </div>
        <div className="flex justify-center">
          <GithubButton onGithubSignInError={handleGithubSignInError} />
        </div>
      </div>
    </BasicLayout>
  )
}
