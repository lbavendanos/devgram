import { render, screen } from '@testing-library/react'
import SocialAuth from './SocialAuth'

describe('SocialAuth component', () => {
  it('render content', () => {
    render(<SocialAuth githubSigIn />)

    const title = screen.getByText('Devgram')
    const description = screen.getByText('the social network for developers')
    const githubButton = screen.getByText('Login with GitHub')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(githubButton).toBeInTheDocument()
  })
})
