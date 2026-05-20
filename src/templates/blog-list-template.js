import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import PostsList from '../components/PostsList'
import Pagination from '../components/Pagination'
import Seo from '../components/SEO'
import CtaCard from '../components/CtaCard'
import { colors } from '../tokens'

const Header = styled.header`
  text-align: center;
  margin: 0 0 1.5rem;
`

const Eyebrow = styled.div`
  font-size: 0.78em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: ${colors.textLight};
  margin-bottom: 10px;
`

const Title = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 2.2em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 14px;
  line-height: 1.15;
`

const Lede = styled.p`
  font-size: 1em;
  line-height: 1.55;
  color: ${colors.textLight};
  margin: 0 auto;
  max-width: 540px;
`

class BlogList extends React.Component {
  render() {
    const posts = this.props.data.posts.edges
    const { pageContext } = this.props

    return (
      <Layout location={this.props.location}>
        <Wrapper>
          <Header>
            <Eyebrow>Blog Srebrnego Domu</Eyebrow>
            <Title>Opowieści i refleksje o starości</Title>
            <Lede>
              Dzielimy się tym, co dzieje się w naszym domu, oraz przemyśleniami
              o opiece nad seniorami, metodzie Montessori i codzienności na
              Kaszubach.
            </Lede>
          </Header>
          <PostsList posts={posts} />
        </Wrapper>

        <Pagination
          nbPages={pageContext.nbPages}
          currentPage={pageContext.currentPage}
        />

        {pageContext.currentPage === pageContext.nbPages && (
          <CtaCard
            eyebrow="Pomyśl o swoim bliskim"
            title="Chętnie odpowiemy na Twoje pytania"
            sub="Sprawdź ofertę i cennik Srebrnego Domu lub skontaktuj się z nami osobiście."
            primaryLabel="Zobacz cennik"
            primaryHref="/cennik/"
            secondaryLabel="Skontaktuj się"
            secondaryHref="/kontakt/"
          />
        )}
      </Layout>
    )
  }
}

export default BlogList

export const Head = ({ pageContext }) => {
  const path =
    pageContext.currentPage === 1 ? '/' : `/pages/${pageContext.currentPage}/`
  return <Seo path={path} />
}

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    posts: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        internal: { contentFilePath: { regex: "//content/posts//" } }
        frontmatter: { published: { ne: false }, unlisted: { ne: true } }
      }
      limit: $limit
      skip: $skip
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
            cover {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 280
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`
