interface Props {
  className: string
}

export default function Footer({ className }: Props): JSX.Element {
  return (
    <footer className={`text-gray-700 ${className}`}>
      <div className="bg-gray-800">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <span className="creator text-gray-200 text-sm text-center sm:text-left">
            © 2021 lbavendanos
          </span>
        </div>
      </div>
    </footer>
  )
}
