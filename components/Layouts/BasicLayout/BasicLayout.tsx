import Head from 'next/head'
import Footer from '@/components/Partials/Footer/Footer'

interface Props {
  title: string
  className?: string
  navbar?: JSX.Element
  children?: JSX.Element
}

export default function BasicLayout({
  title,
  className,
  navbar,
  children,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {navbar}
      <main className={`flex-grow flex bg-gray-100 ${className}`}>
        {children}
      </main>
      <Footer className="mt-auto" />
    </div>
  )
}
