import React from 'react'
import styled from 'styled-components'

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
`

const Trees = styled.div`
  position: absolute;
  max-width: 2070px;
  width: 100%;
  height: 500px;
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
  vertical-align: bottom;
  padding-bottom: 32px;
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 32sp;
  margin: 10px 50px;
  color: white;
  text-shadow: 1px 1px 4px rgba(34, 34, 34, 0.85);
`

const Hero = props => {
  return (
    <Container>    
      <HeroImage style={{ backgroundImage: `url("${ props.heroImg}")` }}>
        <TitleContainer>
          <Title>{props.title}</Title>
        </TitleContainer>
      </HeroImage>
      <Trees style={{ backgroundImage: `url("${props.treesImg}")` }}/>
    </Container>
  )
}

export default Hero
