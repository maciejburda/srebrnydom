import React from 'react'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import useSiteImages from '../hooks/use-site-images'

const Container = styled.div`
  width: 100%;
  height: 500px;
  max-width: 1440px;
`

const HeroImage = styled.div`
  position: relative;
  display: table;
  width: 100%;
  height: 500px;
  max-width: 1140px;
  margin: 0 auto;
  overflow: hidden;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const LeftTrees = styled.div`
  float: left;
  width: 200px;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const RightTrees = styled.div`
  float: right;
  width: 200px;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const Hero = props => {
  const { siteCover } = useSiteMetadata()
  const { fluid } = useSiteImages(siteCover)
  const heroImg = props.heroImg || fluid.src

  return (
    <Container>
      <HeroImage style={{ backgroundImage: `url("${heroImg}")` }}/>
    </Container>
  )
}

export default Hero
