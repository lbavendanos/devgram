import Head from 'next/head'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Devgram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main></main>
      <Footer className="mt-auto" />
    </div>
  )
}
