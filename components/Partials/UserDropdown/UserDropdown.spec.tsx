import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import firebase from 'firebase'
import { Auth, useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/hooks/profile'
import UserDropdown from './UserDropdown'
import { Profile } from '@/types'

jest.mock('@/contexts/AuthContext')
jest.mock('@/hooks/profile')

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
const mockUseProfile = useProfile as jest.MockedFunction<typeof useProfile>

beforeEach(() => {
  jest.clearAllMocks()

  const auth: Auth = {
    user: { uid: '1' } as firebase.User,
    loading: true,
  }

  const profile: Profile = {
    name: 'foo',
    username: 'bar',
    avatar_url: '',
  } as Profile

  mockUseAuth.mockReturnValue(auth)
  mockUseProfile.mockReturnValue({ profile })
})

describe('UserDropdown component', () => {
  it('render toggle and menu', async () => {
    render(<UserDropdown />)

    const toggle = screen.getByTestId('toggle')

    fireEvent.click(toggle)

    await waitFor(() => {
      const menu = screen.getByTestId('menu')

      expect(toggle).toBeInTheDocument()
      expect(menu).toBeInTheDocument()
    })
  })
})
