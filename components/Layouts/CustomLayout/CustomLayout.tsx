import Navbar from '@/components/Partials/Navbar/Navbar'
import BasicLayout from '../BasicLayout/BasicLayout'

interface Props {
  title: string
  className?: string
  children?: JSX.Element
}

export default function CustomLayout({
  title,
  className,
  children,
}: Props): JSX.Element {
  return (
    <BasicLayout navbar={<Navbar />} title={title} className={className}>
      {children}
    </BasicLayout>
  )
}
