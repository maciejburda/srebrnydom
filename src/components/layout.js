import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import 'prismjs/themes/prism-tomorrow.css'
import { GlobalStyle } from './Commons'
import { media } from '../tokens'
import './cookie-though-layout.css'

const SiteContent = styled.div`
  margin: 0 0;

  @media ${media.medium} {
    margin: 0 0 60px 0;
  }
`

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <GlobalStyle />
        <Header />
        <SiteContent>{children}</SiteContent>
        <Footer />
        <CookieConsent />
      </>
    )
  }
}

export default Template
