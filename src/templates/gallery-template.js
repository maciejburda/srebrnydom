import React from 'react'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import { Gallery } from "gatsby-gallery-simple"

class GalleryTemplate extends React.Component {
  render() {

    return (
      <Layout location={this.props.location}>
        <SEO
          title="Galeria"
          description="Zdjęcia srebrnego domu seniora w miejscowości Swornegacie."
          path="galeria"
        />
        <Wrapper>
            <Gallery/> 
        </Wrapper>

      </Layout>
    )
  }
}

export default GalleryTemplate