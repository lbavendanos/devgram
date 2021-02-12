import { render, screen } from '@testing-library/react'
import GithubButton from './GithubButton'

describe('GithubButton component', () => {
  it('render button', () => {
    render(<GithubButton />)

    const name = screen.getByText('Login with GitHub')
    const icon = screen.getByTestId('icon')

    expect(name).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })
})
