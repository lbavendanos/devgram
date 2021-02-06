export default function Navbar(): JSX.Element {
  return (
    <nav className="sticky z-40 top-0">
      <ul className="grid grid-cols-3 gap-x-0.5">
        <li className="text-center">
          <a data-testid="home">home</a>
        </li>
        <li className="text-center">
          <a data-testid="activity">activity</a>
        </li>
        <li className="text-center">
          <a data-testid="user">user</a>
        </li>
      </ul>
    </nav>
  )
}
