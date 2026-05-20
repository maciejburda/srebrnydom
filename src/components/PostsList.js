import React from 'react'
import styled from 'styled-components'

import PostsListItem from './PostsListItem'
import useSiteMetadata from '../hooks/use-site-config'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  margin: 0.5rem 0 1.5rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
`

const PostsList = ({ posts }) => {
  const { defaultLang } = useSiteMetadata()

  return (
    <Grid>
      {posts.map(post => {
        const props = {
          title: post.node.frontmatter.title,
          excerpt: post.node.excerpt,
          slug: post.node.frontmatter.slug,
          timeToRead: post.node.fields && post.node.fields.timeToRead,
          language: post.node.frontmatter.language || defaultLang,
          tags: post.node.frontmatter.tags || [],
          cover: post.node.frontmatter.cover,
        }
        return <PostsListItem key={props.slug} {...props} />
      })}
    </Grid>
  )
}

export default PostsList
