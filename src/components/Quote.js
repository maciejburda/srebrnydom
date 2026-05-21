import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Figure = styled.figure`
  position: relative;
  margin: 2rem 0 1.5rem;
  padding: 44px 40px 32px;
  background: #fbf7f2;
  border: 1px solid rgba(36, 62, 80, 0.08);
  border-radius: 14px;
  overflow: hidden;
  hyphens: none;

  &::before {
    content: '\\201C';
    position: absolute;
    top: -32px;
    left: 14px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-weight: 500;
    font-size: 220px;
    line-height: 1;
    color: ${colors.primary};
    opacity: 0.1;
    pointer-events: none;
    user-select: none;
  }

  @media (max-width: 600px) {
    padding: 36px 22px 24px;
    border-radius: 12px;

    &::before {
      font-size: 160px;
      top: -22px;
      left: 8px;
    }
  }
`

const Body = styled.blockquote`
  position: relative;
  margin: 0;
  padding: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-weight: 500;
  font-size: 1.45em;
  line-height: 1.45;
  color: ${colors.primary};
  letter-spacing: 0.005em;

  & p {
    margin: 0;
  }

  & p + p {
    margin-top: 0.6em;
  }

  @media (max-width: 600px) {
    font-size: 1.2em;
  }
`

const Attribution = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
  font-family: 'Lato', sans-serif;
  font-size: 0.72em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: ${colors.primary};

  &::before {
    content: '';
    flex-shrink: 0;
    width: 32px;
    height: 1px;
    background: ${colors.primary};
  }
`

const AttributionMeta = styled.span`
  color: ${colors.textLight};
  font-weight: 700;
  letter-spacing: 0.18em;
`

const Quote = ({ author, meta, children }) => (
  <Figure>
    <Body>{children}</Body>
    {(author || meta) && (
      <Attribution>
        {author}
        {meta && <AttributionMeta>· {meta}</AttributionMeta>}
      </Attribution>
    )}
  </Figure>
)

export default Quote
