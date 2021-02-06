import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer component', () => {
  it('render creator', () => {
    render(<Footer />)

    const title = screen.getByText('© 2021 lbavendanos')

    expect(title).toBeInTheDocument()
  })
})
