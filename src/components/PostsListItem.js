import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Flag from './Flag/Flag'
import useSiteMetadata from '../hooks/use-site-config'
import { colors } from '../tokens'
import { Clock } from './Icons'

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border: 1px solid rgba(36, 62, 80, 0.1);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none !important;
  color: inherit;
  transition: transform 240ms ease, box-shadow 240ms ease,
    border-color 240ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(246, 179, 205, 0.65);
    box-shadow: 0 22px 40px -24px rgba(36, 62, 80, 0.28);
    text-decoration: none !important;
  }

  &:hover .post-cover .gatsby-image-wrapper {
    transform: scale(1.05);
    filter: saturate(1.1);
  }

  &:hover .read-button {
    background: #142634;
  }

  &:hover .read-button::after {
    transform: translateX(4px);
  }
`

const CoverArea = styled.div.attrs({ className: 'post-cover' })`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${colors.primaryLight};

  & .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease, filter 0.3s ease;
  }

  & img {
    object-fit: cover !important;
  }
`

const PlaceholderCover = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${colors.primaryLight} 0%, #fff5f8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Nunito', sans-serif;
  font-size: 0.78em;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${colors.textLight};
`

const FlagOverlay = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 6px;
  padding: 4px 6px;
  line-height: 0;
  box-shadow: 0 4px 10px -4px rgba(36, 62, 80, 0.3);
`

const Body = styled.div`
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Tag = styled.span`
  background: rgba(246, 179, 205, 0.35);
  color: ${colors.primary};
  font-size: 0.68em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 4px 10px;
  border-radius: 999px;
`

const Title = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: 1.22em;
  font-weight: 700;
  line-height: 1.25;
  color: ${colors.primary};
  margin: 2px 0 0;
`

const Excerpt = styled.p`
  font-size: 0.9em;
  line-height: 1.5;
  color: ${colors.text};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Meta = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed rgba(36, 62, 80, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const TimeInfo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8em;
  color: ${colors.textLight};
  font-weight: 600;
`

const ReadButton = styled.span.attrs({ className: 'read-button' })`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: ${colors.primary};
  color: ${colors.white};
  padding: 9px 16px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.78em;
  letter-spacing: 0.04em;
  transition: background 200ms ease;

  &::after {
    content: '→';
    font-size: 1.05em;
    transition: transform 220ms ease;
  }
`

const PostsListItem = props => {
  const { title, excerpt, slug, language, tags, timeToRead, cover } = props
  const { defaultLang } = useSiteMetadata()
  const image = cover && cover.childImageSharp && getImage(cover.childImageSharp)
  const displayTags = Array.isArray(tags) ? tags.slice(0, 2) : []

  return (
    <Card to={`/blog/${slug}/`}>
      <CoverArea>
        {image ? (
          <GatsbyImage image={image} alt={title} />
        ) : (
          <PlaceholderCover>Srebrny Dom</PlaceholderCover>
        )}
        {defaultLang !== language && (
          <FlagOverlay>
            <Flag language={language} />
          </FlagOverlay>
        )}
      </CoverArea>

      <Body>
        {displayTags.length > 0 && (
          <TagRow>
            {displayTags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagRow>
        )}
        <Title>{title}</Title>
        <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
        <Meta>
          <TimeInfo>
            <Clock size={13} />
            {timeToRead != null ? `${timeToRead} min czytania` : 'Artykuł'}
          </TimeInfo>
          <ReadButton>Czytaj</ReadButton>
        </Meta>
      </Body>
    </Card>
  )
}

export default PostsListItem
