import React from 'react'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import Gallery from '../components/Gallery'
import RelatedPages from '../components/RelatedPages'

class GalleryTemplate extends React.Component {
  render() {

    return (
      <Layout location={this.props.location}>
        <Wrapper>
            <h1>Galeria Zdjęć</h1>
            <Gallery/>
            <RelatedPages slug="galeria" />
        </Wrapper>

      </Layout>
    )
  }
}

export default GalleryTemplate

export const Head = () => (
  <SEO
    title="Galeria Zdjęć - Srebrny Dom"
    description="Zdjęcia domu seniora w miejscowości Swornegacie w województwie pomorskim."
    path="/galeria/"
  />
)