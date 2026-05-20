import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Card = styled.aside`
  margin: 1.75rem 0 1.25rem;
  padding: 24px 26px 22px;
  background: linear-gradient(135deg, #f5fafd 0%, #fff5f8 100%);
  border: 1px solid rgba(36, 62, 80, 0.08);
  border-radius: 16px;
  text-align: left;
  hyphens: none;
`

const Eyebrow = styled.div`
  font-size: 0.72em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${colors.textLight};
  margin-bottom: 6px;
`

const Title = styled.h3`
  font-family: 'Nunito', sans-serif;
  font-size: 1.2em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 16px;
  line-height: 1.2;
  text-transform: none;
  letter-spacing: 0;
`

const List = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px 18px;
  margin: 0;

  @media (min-width: 540px) {
    grid-template-columns: max-content 1fr;
  }
`

const Term = styled.dt`
  font-size: 0.78em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${colors.textLight};
  align-self: start;
  padding-top: 2px;
`

const Detail = styled.dd`
  margin: 0;
  font-size: 0.95em;
  line-height: 1.5;
  color: ${colors.text};
`

const FactCard = ({ eyebrow, title, items }) => (
  <Card>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    {title && <Title>{title}</Title>}
    <List>
      {items.map(({ label, value }) => (
        <React.Fragment key={label}>
          <Term>{label}</Term>
          <Detail>{value}</Detail>
        </React.Fragment>
      ))}
    </List>
  </Card>
)

export default FactCard
