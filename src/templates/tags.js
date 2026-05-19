import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import PostsList from '../components/PostsList'
import Wrapper from '../components/Wrapper'
import Seo from '../components/SEO'
import Hero from '../components/Hero'

const PageTitle = styled.h2`
  padding-bottom: 10px;
`

class Tags extends React.Component {
  render() {
    const pageTitle = `#${this.props.pageContext.tag}`
    const posts = this.props.data.posts.edges

    return (
      <Layout location={this.props.location}>
        <Hero title={pageTitle} />

        <Wrapper>
          <PageTitle>Posts tagged as {this.props.pageContext.tag}</PageTitle>
          <PostsList posts={posts} />
        </Wrapper>
      </Layout>
    )
  }
}

export default Tags

export const Head = ({ pageContext }) => (
  <Seo title={`Top blog posts on ${pageContext.tag}`} />
)

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    posts: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          tags: { eq: $tag }
          published: { ne: false }
          unlisted: { ne: true }
        }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            timeToRead
          }
          frontmatter {
            title
            tags
            language
            slug
          }
        }
      }
    }
  }
`
