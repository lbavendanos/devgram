import { render, screen } from '@testing-library/react'
import CustomLayout from './CustomLayout'

describe('CustomLayout component', () => {
  it('render children', () => {
    render(
      <CustomLayout title="foo">
        <div>bar</div>
      </CustomLayout>
    )

    const children = screen.getByText('bar')

    expect(children).toBeInTheDocument()
  })
})
