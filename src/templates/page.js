import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Content from '../components/Content'
import FaqList from '../components/FaqList'
import RelatedPages from '../components/RelatedPages'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import useSiteImages from '../hooks/use-site-images'
import useSiteMetadata from "../hooks/use-site-config"

const PageTemplate = props => {
  const page = props.data.page

  const { trees } = useSiteMetadata()
  const treesImage = useSiteImages(trees).fluid.src

  return (
    <Layout location={props.location}>
      <Hero
        heroImg={page.frontmatter.cover && page.frontmatter.cover.publicURL}
        treesImg={treesImage}
        title={page.frontmatter.title}
      />

      <Wrapper>
        <article>
          <Content date={page.frontmatter.date}>{props.children}</Content>
          <FaqList items={page.frontmatter.faq} />
          <RelatedPages slug={page.frontmatter.slug} />
        </article>
      </Wrapper>
    </Layout>
  )
}

export default PageTemplate

export const Head = ({ data }) => {
  const page = data.page
  return (
    <SEO
      title={page.frontmatter.seoTitle}
      description={page.frontmatter.seoContent}
      path={`/${page.frontmatter.slug}/`}
      cover={page.frontmatter.cover && page.frontmatter.cover.publicURL}
      faq={page.frontmatter.faq}
    />
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt
      frontmatter {
        title
        seoTitle
        seoContent
        date(formatString: "MMMM DD, YYYY")
        slug
        disqus
        cover {
          publicURL
        }
        faq {
          q
          a
        }
      }
    }
  }
`
