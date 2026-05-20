import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Box = styled.aside`
  margin: 1.75rem 0 0.75rem;
  padding: 20px 24px;
  background: #fafbfc;
  border: 1px solid rgba(36, 62, 80, 0.08);
  border-left: 3px solid ${colors.accent};
  border-radius: 12px;
  text-align: left;
  hyphens: none;
`

const Heading = styled.div`
  font-size: 0.72em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: ${colors.textLight};
  margin-bottom: 12px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  column-gap: 22px;
  row-gap: 8px;

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 8px;
  }
`

const Item = styled.li`
  position: relative;
  font-size: 0.9em;
  color: ${colors.text};
  padding-left: 18px;
  line-height: 1.45;

  &::before {
    content: '×';
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.accent};
    font-weight: 700;
    font-size: 1.15em;
    line-height: 1.3;
  }
`

const exclusions = [
  'Leki, pieluchomajtki, okulary, aparaty słuchowe',
  'Transport do lekarzy specjalistów',
  'Indywidualne wizyty fryzjera lub kosmetyczki',
  'Osobiste zakupy',
]

const Exclusions = () => (
  <Box>
    <Heading>Oferta nie obejmuje</Heading>
    <List>
      {exclusions.map((item, i) => (
        <Item key={i}>{item}</Item>
      ))}
    </List>
  </Box>
)

export default Exclusions
