import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

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
})
