import { render, screen } from '@testing-library/react'
import { AuthContext } from '@/contexts/AuthContext'
import UserDropdown from './UserDropdown'

describe('UserDropdown component', () => {
  it('render toggle and menu', () => {
    const user = { name: 'foo', email: 'foo@bar', avatar: 'bar' }

    render(
      <AuthContext.Provider value={user}>
        <UserDropdown />
      </AuthContext.Provider>
    )

    const toggle = screen.getByTestId('toggle')
    const avatar = screen.getByAltText(user.name)
    const menu = screen.getByTestId('menu')

    expect(toggle).toBeInTheDocument()
    expect(avatar).toBeInTheDocument()
    expect(menu).toBeInTheDocument()
  })
})
