import React, { Fragment } from 'react'

import PostsListItem from './PostsListItem'
import useSiteMetadata from '../hooks/use-site-config'

const PostsList = ({ posts }) => {
  const { defaultLang } = useSiteMetadata()

  return (
    <Fragment>
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
    </Fragment>
  )
}
export default PostsList
