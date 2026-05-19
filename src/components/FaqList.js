import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 3em 0 1em;
`

const Heading = styled.h2`
  margin-bottom: 1em;
`

const Item = styled.div`
  margin-bottom: 1.5em;
`

const Question = styled.h3`
  font-size: 1.1em;
  margin-bottom: 0.5em;
`

const Answer = styled.p`
  margin: 0;
  line-height: 1.6;
`

const FaqList = ({ items, heading = 'Najczęściej zadawane pytania' }) => {
  if (!items || items.length === 0) return null
  return (
    <Wrapper>
      <Heading>{heading}</Heading>
      {items.map((item, i) => (
        <Item key={i}>
          <Question>{item.q}</Question>
          <Answer>{item.a}</Answer>
        </Item>
      ))}
    </Wrapper>
  )
}

export default FaqList
