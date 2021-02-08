import Head from 'next/head'
import Footer from '@/components/Partials/Footer/Footer'

interface Props {
  className?: string
  children?: JSX.Element
}

export default function BasicLayout({
  className,
  children,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Devgram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`flex-grow flex bg-gray-100 ${className}`}>
        {children}
      </main>
      <Footer className="mt-auto" />
    </div>
  )
}
