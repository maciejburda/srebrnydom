import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 500px;
`

const HeroImage = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  max-width: 1140px;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60%;
    background: linear-gradient(
      to top,
      rgba(36, 62, 80, 0.78) 0%,
      rgba(36, 62, 80, 0.55) 28%,
      rgba(36, 62, 80, 0.18) 65%,
      rgba(36, 62, 80, 0) 100%
    );
    pointer-events: none;
  }
`

const Trees = styled.div`
  position: absolute;
  max-width: 2070px;
  width: 100%;
  height: 500px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-repeat: repeat-x;
  background-position: center;
  background-size: cover;
  z-index: 1;
`

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
  padding-bottom: 40px;
`

const Title = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: 0.01em;
  margin: 0 24px;
  color: ${colors.white};
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.45),
    0 8px 24px rgba(0, 0, 0, 0.35);
`

const TitleRule = styled.span`
  display: block;
  width: 56px;
  height: 3px;
  margin: 14px auto 0;
  background: ${colors.accent};
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
`

const Hero = props => {
  return (
    <Container>
      <HeroImage style={{ backgroundImage: `url("${props.heroImg}")` }}>
        <TitleContainer>
          <Title>{props.title}</Title>
          <TitleRule aria-hidden="true" />
        </TitleContainer>
      </HeroImage>
      <Trees style={{ backgroundImage: `url("${props.treesImg}")` }} />
    </Container>
  )
}

export default Hero
