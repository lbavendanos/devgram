import { render, screen } from '@testing-library/react'
import firebase from 'firebase'
import { Auth, useAuth } from '@/contexts/AuthContext'
import Navbar from './Navbar'

jest.mock('@/contexts/AuthContext')
jest.mock('@/components/Partials/UserDropdown/UserDropdown', () => {
  return function DummyUserDropdown() {
    return <div>DummyUserDropdown</div>
  }
})

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

beforeEach(() => {
  jest.clearAllMocks()

  const auth: Auth = {
    user: { displayName: 'foo' } as firebase.User,
    loading: true,
  }

  mockUseAuth.mockReturnValue(auth)
})

describe('Navbar component', () => {
  it('render logo', () => {
    render(<Navbar />)

    const logo = screen.getByText('Devgram')

    expect(logo).toBeInTheDocument()
  })

  it('render navigation', () => {
    render(<Navbar />)

    const home = screen.getByTestId('home')
    const explorer = screen.getByTestId('explorer')
    const activity = screen.getByTestId('activity')
    const user = screen.getByTestId('user')

    expect(home).toBeInTheDocument()
    expect(explorer).toBeInTheDocument()
    expect(activity).toBeInTheDocument()
    expect(user).toBeInTheDocument()
  })

  it('render social login', () => {
    const auth: Auth = {
      user: null,
      loading: true,
    }

    mockUseAuth.mockReturnValue(auth)

    render(<Navbar />)

    const githubButton = screen.getByText('Login with GitHub')

    expect(githubButton).toBeInTheDocument()
  })
})
