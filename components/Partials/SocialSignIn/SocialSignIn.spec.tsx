import { render, screen } from '@testing-library/react'
import SocialSigIn from './SocialSignIn'

describe('SocialSigIn component', () => {
  it('render content', () => {
    render(<SocialSigIn githubSigIn />)

    const title = screen.getByText('Devgram')
    const description = screen.getByText('the social network for developers')
    const githubButton = screen.getByText('Login with GitHub')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(githubButton).toBeInTheDocument()
  })
})
