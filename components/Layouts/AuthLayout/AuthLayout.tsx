import Head from 'next/head'
import Footer from '@/components/Partials/Footer/Footer'
import Navbar from '@/components/Partials/Navbar/Navbar'

interface Props {
  title: string
  className?: string
  children?: JSX.Element
}

export default function AuthLayout({
  title,
  className,
  children,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className={`flex-grow flex bg-gray-100 ${className}`}>
        {children}
      </main>
      <Footer className="mt-auto" />
    </div>
  )
}
