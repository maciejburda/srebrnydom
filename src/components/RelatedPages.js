import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors } from '../tokens'
import config from '../../data/siteConfig'

const Wrapper = styled.section`
  margin: 3em 0 1em;
  padding-top: 1.5em;
  border-top: 1px solid #ececec;
`

const Heading = styled.h2`
  margin: 0 0 1.6em 0;
  font-size: 0.85em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textLight};
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em;
`

const Pill = styled(Link)`
  background: ${colors.primaryLight};
  color: ${colors.primary};
  padding: 0.5em 1em;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.92em;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: #fff;
    border-color: ${colors.primary};
  }
`

const RelatedPages = ({ slug }) => {
  const items = (config.relatedPages && config.relatedPages[slug]) || []
  if (items.length === 0) return null
  return (
    <Wrapper>
      <Heading>Sprawdź też</Heading>
      <List>
        {items.map(item => (
          <li key={item.url}>
            <Pill to={item.url}>{item.label}</Pill>
          </li>
        ))}
      </List>
    </Wrapper>
  )
}

export default RelatedPages
