
import { render, screen } from '@testing-library/react'
import App from '../src/App.jsx'
import React from 'react'

test('renders title', () => {
  render(<App />)
  expect(screen.getByText(/Create Task/i)).toBeTruthy()
})
