import React, { useCallback, useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { colors } from '../tokens'

const Grid = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-rows: 10rem;
  grid-gap: 0.5rem;
`

const YearSection = styled.section`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const YearEyebrow = styled.div`
  font-size: 0.78em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: ${colors.textLight};
  margin: 0 0 6px;
`

const YearHeading = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 0.75rem;
  line-height: 1.15;
`

const Tile = styled.button`
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  overflow: hidden;
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 12px -8px rgba(36, 62, 80, 0.35);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  & .gatsby-image-wrapper {
    position: absolute !important;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.5s, filter 0.25s;
  }

  &:hover {
    box-shadow: 0 16px 30px -16px rgba(36, 62, 80, 0.4);
    transform: translateY(-2px);
  }

  &:hover .gatsby-image-wrapper {
    transform: scale(1.08);
    filter: saturate(1.2);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  cursor: zoom-out;
`

const ModalImg = styled.img`
  max-width: 92vw;
  max-height: 92vh;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
`

const NavBtn = styled.button`
  position: absolute;
  top: 64px;
  bottom: 0;
  width: 20vw;
  ${({ $side }) =>
    $side === 'left'
      ? 'left: 0; justify-content: flex-start; padding-left: 16px;'
      : 'right: 0; justify-content: flex-end; padding-right: 16px;'}
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  line-height: 1;
`

const imageAlt = name => {
  if (!name) return ''
  return name
    .replace(/^\d+[-_]/, '')   // strip leading "01-" sort prefix
    .replace(/[-_]+/g, ' ')     // dashes/underscores → spaces
    .replace(/\.[^.]+$/, '')    // strip extension if present
    .trim()
    .replace(/^(.)/, c => c.toUpperCase())
}

// Year boundaries are baked into filenames:
// image_a*..image_t* were taken in 2020,
// image_w* onward were taken in 2019.
const imageYear = name => (name >= 'image_w' ? 2019 : 2020)

const Gallery = () => {
  const data = useStaticQuery(graphql`
    query GalleryImages {
      allFile(
        filter: { sourceInstanceName: { eq: "gallery" } }
        sort: { name: ASC }
      ) {
        nodes {
          id
          name
          publicURL
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 600
              placeholder: BLURRED
            )
          }
        }
      }
    }
  `)

  const images = data.allFile.nodes.filter(n => n.childImageSharp)
  const groups = images
    .reduce((acc, image) => {
      const year = imageYear(image.name)
      const bucket = acc.find(g => g.year === year)
      if (bucket) bucket.images.push(image)
      else acc.push({ year, images: [image] })
      return acc
    }, [])
    .sort((a, b) => b.year - a.year)
  const [openIndex, setOpenIndex] = useState(null)

  const goPrev = useCallback(
    () => setOpenIndex(i => (i - 1 + images.length) % images.length),
    [images.length]
  )
  const goNext = useCallback(
    () => setOpenIndex(i => (i + 1) % images.length),
    [images.length]
  )

  useEffect(() => {
    if (openIndex === null) return
    const onKey = e => {
      if (e.key === 'Escape') setOpenIndex(null)
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, goPrev, goNext])

  return (
    <>
      {groups.map(group => (
        <YearSection key={group.year}>
          <YearEyebrow>Rok</YearEyebrow>
          <YearHeading>{group.year}</YearHeading>
          <Grid>
            {group.images.map(image => {
              const flatIndex = images.indexOf(image)
              return (
                <Tile
                  key={image.id}
                  type="button"
                  onClick={() => setOpenIndex(flatIndex)}
                  aria-label={`Pokaż zdjęcie: ${imageAlt(image.name)}`}
                >
                  <GatsbyImage image={getImage(image)} alt={imageAlt(image.name)} />
                </Tile>
              )
            })}
          </Grid>
        </YearSection>
      ))}
      {openIndex !== null && (
        <Overlay onClick={() => setOpenIndex(null)}>
          <ModalImg src={images[openIndex].publicURL} alt={imageAlt(images[openIndex].name)} loading="lazy" />
          {images.length > 1 && (
            <>
              <NavBtn
                type="button"
                $side="left"
                onClick={e => {
                  e.stopPropagation()
                  goPrev()
                }}
                aria-label="Previous image"
              >
                ‹
              </NavBtn>
              <NavBtn
                type="button"
                $side="right"
                onClick={e => {
                  e.stopPropagation()
                  goNext()
                }}
                aria-label="Next image"
              >
                ›
              </NavBtn>
            </>
          )}
          <CloseBtn
            type="button"
            onClick={e => {
              e.stopPropagation()
              setOpenIndex(null)
            }}
            aria-label="Close"
          >
            ×
          </CloseBtn>
        </Overlay>
      )}
    </>
  )
}

export default Gallery
