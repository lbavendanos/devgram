import { AppProps } from 'next/app'
import AuthProvider from '@/components/Providers/AuthProvider/AuthProvider'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
