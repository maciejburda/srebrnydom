import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Section = styled.section`
  margin: 1.75rem 0 1.5rem;
  text-align: left;
  hyphens: none;
`

const Eyebrow = styled.h3`
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin: 0 0 1.2em;
  padding: 0;
  font-family: 'Lato', sans-serif;
  font-size: 0.9em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textLight};
  text-align: left;
  line-height: 1.4;

  &::before {
    content: '';
    flex-shrink: 0;
    width: 2px;
    background: ${colors.accent};
    border-radius: 2px;
    margin: 2px 0;
  }
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`

const Pill = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: ${colors.primaryLight};
  border: 1px solid rgba(36, 62, 80, 0.08);
  color: ${colors.primary};
  border-radius: 999px;
  font-size: 0.85em;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: background 200ms ease, transform 200ms ease;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.accent};
  }

  &:hover {
    background: #fff4f8;
    transform: translateY(-1px);
  }
`

const PillRow = ({ eyebrow, items }) => (
  <Section>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <List>
      {items.map(item => (
        <Pill key={item}>{item}</Pill>
      ))}
    </List>
  </Section>
)

export default PillRow
