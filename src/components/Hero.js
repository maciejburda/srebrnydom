import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 500px;
  max-width: 1440px;
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
  max-width: 1440px;
  width: 100%;
  height: 500px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;
`

const Hero = props => {
  return (
    <Container>    
      <HeroImage style={{ backgroundImage: `url("${ props.heroImg}")` }}/>
      <Trees style={{ backgroundImage: `url("${props.treesImg}")` }}/>
    </Container>
  )
}

export default Hero
