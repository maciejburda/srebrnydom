import React from 'react'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import useSiteImages from '../hooks/use-site-images'
import useSiteMetadata from "../hooks/use-site-config"
import { Gallery } from "gatsby-gallery-simple"

class GalleryTemplate extends React.Component {
  render() {
    // const { homepageImage, trees } = useSiteMetadata()
    // const homeImage = useSiteImages(homepageImage).fluid.src
    // const treesImage = useSiteImages(trees).fluid.src

    return (
      <Layout location={this.props.location}>
        {/* <Hero
          heroImg={homeImage}
          treesImg={treesImage}
          title="Galeria"
        /> */}

        <Wrapper>
            <Gallery/> 
        </Wrapper>

      </Layout>
    )
  }
}

export default GalleryTemplate