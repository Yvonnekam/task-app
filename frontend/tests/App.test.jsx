import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../src/App.jsx'
import React from 'react'

describe('App Component', () => {
  it('renders title', () => {
    render(<App />)
    
    expect(screen.getByRole('heading', { name: /Create Task/i })).toBeTruthy()
  })
})