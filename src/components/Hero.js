import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 500px;
  max-width: 1440px;
`

const HeroImage = styled.div`
  width: 100%;
  height: 500px;
  max-width: 1140px;
  margin: 0 auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const LeftTrees = styled.div`
  position: absolute;
  left: 7.15%;
  /* float: left; */
  width: 200px;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;
`

const RightTrees = styled.div`
  position: absolute;
  right: 7.15%;
  /* float: right; */
  width: 200px;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;
  padding-left: 180px;
`

const Hero = props => {
  return (
    <Container>    
      <HeroImage style={{ backgroundImage: `url("${ props.heroImg}")` }}>
        <LeftTrees style={{ backgroundImage: `url("${props.leftTrees}")` }}/>
        <RightTrees style={{ backgroundImage: `url("${props.rightTrees}")` }}/>
      </HeroImage>
    </Container>
  )
}

export default Hero
