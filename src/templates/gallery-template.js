import React from 'react'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import { Gallery } from "gatsby-gallery-simple"

class GalleryTemplate extends React.Component {
  render() {

    return (
      <Layout location={this.props.location}>
        
        <Wrapper>
            <Gallery/> 
        </Wrapper>

      </Layout>
    )
  }
}

export default GalleryTemplate