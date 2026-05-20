import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { colors } from '../tokens'
import useSiteMetadata from '../hooks/use-site-config'
import useSiteImages from '../hooks/use-site-images'
import TagList from './TagList'
import Flag from './Flag/Flag'
import { ReadingTime, Bull } from './Commons'
import { ChevronLeft, ChevronRight } from './Icons'

const PreviewContainer = styled.aside`
  display: flex;
  flex-wrap: wrap;
  max-width: 770px;
  width: 80%;
  margin: 0px auto 30px auto;
  top: 20px;
  position: relative;

  @media (max-width: 780px) {
    width: 100%;
    padding: 25px;
  }
`

const Preview = styled.article`
  cursor: pointer;
  flex: 1 1 300px;
  background-color: ${colors.backgroundArticle};
  box-shadow: 0 0 0 0, 0 6px 12px rgba(0, 0, 0, 0.1);
  margin: 20px 20px;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 0 0 0, 0 6px 12px ${colors.grey300};
    transition: all 0.3s ease;
    transform: translate3D(0, -1px, 0);
  }

  @media (min-width: 780px) {
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`

const PreviewCover = styled.div`
  width: auto;
  height: 200px;
  background: #c5d2d9 no-repeat 50%;
  background-size: cover;
  border-radius: 5px 5px 0 0;
`

const PreviewContent = styled.div`
  padding: 20px;

  header {
    padding: 0 0 10px 0;
  }
  section {
    padding-bottom: 10px;
  }
  footer {
    font-size: 0.8em;
  }
`

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textLight};
  padding: 0 0 0.5em 0;

  &.next {
    justify-content: flex-end;
  }
`

const PrevNextPost = props => {
  const { previous, next } = props
  const articles = [previous, next].filter(i => i).map(item => ({ node: item }))
  const { siteCover, defaultLang } = useSiteMetadata()
  const { fluid } = useSiteImages(siteCover)

  return (
    <Fragment>
      <PreviewContainer>
        {articles.map((article, i) => {
          const { excerpt } = article.node
          const timeToRead = article.node.fields && article.node.fields.timeToRead
          const {
            tags,
            cover,
            title,
            slug,
            language,
          } = article.node.frontmatter
          const heroImg = (cover && cover.publicURL) || fluid.src
          const isNext = next && article.node === next

          return (
            <Preview key={`prev-next-${i}`}>
              <Link to={`/blog/${slug}/`} aria-label={`View ${title} article`}>
                <PreviewCover style={{ backgroundImage: `url("${heroImg}")` }} />
                <PreviewContent>
                  <Eyebrow className={isNext ? 'next' : ''}>
                    {isNext ? (
                      <>Następny post <ChevronRight size={14} /></>
                    ) : (
                      <><ChevronLeft size={14} /> Poprzedni post</>
                    )}
                  </Eyebrow>
                  <header>
                    <h2>
                      {defaultLang !== language && <Flag language={language} />}
                      {title}
                    </h2>
                  </header>
                  <section>
                    <p>{excerpt}</p>
                  </section>
                  <footer>
                    <ReadingTime min={timeToRead} />
                    {Array.isArray(tags) && (
                      <>
                        <Bull />
                        <TagList tags={tags} noLink={true} />
                      </>
                    )}
                  </footer>
                </PreviewContent>
              </Link>
            </Preview>
          )
        })}
      </PreviewContainer>
    </Fragment>
  )
}

export default PrevNextPost
