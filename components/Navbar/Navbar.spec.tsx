import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar component', () => {
  it('render navigation', () => {
    render(<Navbar />)

    const home = screen.getByTestId('home')
    const activity = screen.getByTestId('activity')
    const user = screen.getByTestId('user')

    expect(home).toBeInTheDocument()
    expect(activity).toBeInTheDocument()
    expect(user).toBeInTheDocument()
  })
})
