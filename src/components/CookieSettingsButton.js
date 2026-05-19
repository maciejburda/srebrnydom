import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  display: inline-block;
  margin: 0.5rem 0;
  padding: 0.6rem 1.25rem;
  font-family: inherit;
  font-size: 1rem;
  color: #ffffff;
  background: #222222;
  border: 1px solid #222222;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  &:hover,
  &:focus {
    background: #ffffff;
    color: #222222;
  }
`

const CookieSettingsButton = ({ children = 'Zarządzaj plikami cookies' }) => {
  const handleClick = () => {
    if (typeof window === 'undefined') return
    import('cookie-though').then(mod => mod.show())
  }
  return (
    <Button type="button" onClick={handleClick}>
      {children}
    </Button>
  )
}

export default CookieSettingsButton
