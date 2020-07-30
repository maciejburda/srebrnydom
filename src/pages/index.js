/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import useSiteImages from '../hooks/use-site-images'
import Hero from '../components/Hero'
import useSiteMetadata from "../hooks/use-site-config"

const MainTitle = styled.h1`
  line-height: 1.5;
  text-align: center;
  font-size: 3rem;
`

const Ghost = styled.span`
  display: block;
  line-height: 1.5;
  text-align: center;
  font-size: 7rem;
`

const SubTitle = styled.h2`
  padding-top: 40px;
  line-height: 1.2;
  border-top: 1px solid #ececec;
  margin-top: 44px;
`

const NotFoundPage = props => {
  const { homepageImage } = useSiteMetadata()
  const homeImage = useSiteImages(homepageImage).fluid.src

  return (
      
    <Layout location={props.location} noCover={true}>
      <SEO title="Home Page" />
      <Hero
          heroImg={homeImage}
          title="Strona Główna"
        />
      <Wrapper>
        <MainTitle>Gówna</MainTitle>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
