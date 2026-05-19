import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import config from '../../data/siteConfig'

const Wrapper = styled.section`
  margin: 3em 0 1em;
  padding-top: 1.5em;
  border-top: 1px solid #ececec;
`

const Heading = styled.h2`
  margin-bottom: 0.5em;
  font-size: 1.2em;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`

const Item = styled.li`
  margin: 0;
`

const RelatedPages = ({ slug }) => {
  const items = (config.relatedPages && config.relatedPages[slug]) || []
  if (items.length === 0) return null
  return (
    <Wrapper>
      <Heading>Sprawdź też</Heading>
      <List>
        {items.map(item => (
          <Item key={item.url}>
            <Link to={item.url}>{item.label}</Link>
          </Item>
        ))}
      </List>
    </Wrapper>
  )
}

export default RelatedPages
