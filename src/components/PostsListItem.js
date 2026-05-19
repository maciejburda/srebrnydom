import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Flag from './Flag/Flag'
import TagList from './TagList'
import useSiteMetadata from '../hooks/use-site-config'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Bull, ReadingTime } from './Commons'
import { Clock, Tag } from './Icons'

const Post = styled.article`
  border-bottom: 1px solid rgba(214, 209, 230, 0.5);
  padding-bottom: 1.25rem;

  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-areas:
    "thumb header"
    "thumb body"
    "thumb footer";
  gap: 1.25em;
  align-items: start;
  padding-top: 1.25rem;

  @media (max-width: 564px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "thumb"
      "header"
      "body"
      "footer";
    gap: 0.75em;
  }
`

const Thumb = styled.div`
  grid-area: thumb;
  width: 140px;
  height: 105px;
  border-radius: 6px;
  overflow: hidden;
  background: ${colors.primaryLight};

  & .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 564px) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
`

const PostHeader = styled.header`
  grid-area: header;
  padding: 0;
`

const Excerpt = styled.p`
  line-height: 1.45;
  padding-bottom: 0.5em;
  grid-area: body;
  margin: 0;
`

const PostTitleLink = styled(Link)`
  color: ${colors.primary};
  &:hover {
    text-decoration: underline;
  }
`

const FooterArea = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const FooterLine = styled.div`
  color: ${colors.textLight};
  font-size: 0.8em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4em;
`

const MetaIcon = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${colors.textLight};
  margin-right: 0.25em;
`

const ReadPost = styled(Link)`
  display: inline-block;
  font-size: 0.75rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 2;
  color: ${colors.primary};
  padding: 0 0.25em;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`

const PostsListItem = props => {
  const { title, excerpt, slug, language, tags, timeToRead, cover } = props
  const { defaultLang } = useSiteMetadata()
  const image = cover && cover.childImageSharp && getImage(cover.childImageSharp)

  return (
    <Post>
      <Link to={`/blog/${slug}/`} aria-label={`View ${title} article`}>
        <Thumb>
          {image && <GatsbyImage image={image} alt={title} />}
        </Thumb>
      </Link>

      <PostHeader>
        <h2 style={{ margin: 0 }}>
          <PostTitleLink to={`/blog/${slug}/`}>
            {defaultLang !== language && <Flag language={language} />}
            {title}
          </PostTitleLink>
        </h2>
      </PostHeader>

      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />

      <FooterArea>
        <FooterLine>
          {timeToRead != null && (
            <>
              <MetaIcon><Clock size={14} /></MetaIcon>
              <ReadingTime min={timeToRead} />
            </>
          )}
          {Array.isArray(tags) && tags.length > 0 && (
            <>
              <Bull />
              <MetaIcon><Tag size={14} /></MetaIcon>
              <TagList tags={tags} />
            </>
          )}
        </FooterLine>
        <ReadPost to={`/blog/${slug}/`} aria-label={`View ${title} article`}>
          Przeczytaj Post ›
        </ReadPost>
      </FooterArea>
    </Post>
  )
}
export default PostsListItem
