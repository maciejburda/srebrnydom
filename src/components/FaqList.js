import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import { ChevronDown } from './Icons'
import SectionEyebrow from './SectionEyebrow'

const Wrapper = styled.section`
  margin: 3em 0 1em;
`

const Heading = styled(SectionEyebrow)`
  margin-top: 0;
`

const Item = styled.div`
  margin-bottom: 1.5em;
`

const Question = styled.h3`
  font-size: 1.1em;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.6em;
`

const QuestionChevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  color: ${colors.accent};
  transform: translateY(1px);
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
          <Question>
            <QuestionChevron aria-hidden="true">
              <ChevronDown size={14} />
            </QuestionChevron>
            {item.q}
          </Question>
          <Answer>{item.a}</Answer>
        </Item>
      ))}
    </Wrapper>
  )
}

export default FaqList
