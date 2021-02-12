import { render, screen } from '@testing-library/react'
import BasicLayout from './BasicLayout'

describe('BasicLayout component', () => {
  it('render children and navbar', () => {
    const nav = <nav>navigation</nav>

    render(
      <BasicLayout title="foo" navbar={nav}>
        <div>bar</div>
      </BasicLayout>
    )

    const children = screen.getByText('bar')
    const navbar = screen.getByText('navigation')

    expect(children).toBeInTheDocument()
    expect(navbar).toBeInTheDocument()
  })
})
