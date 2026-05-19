import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-rows: 10rem;
  grid-gap: 0.5rem;
`

const Tile = styled.button`
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  overflow: hidden;
  background: transparent;

  & .gatsby-image-wrapper {
    position: absolute !important;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.5s, filter 0.25s;
  }

  &:hover .gatsby-image-wrapper {
    transform: scale(1.1);
    filter: saturate(1.3);
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
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (openIndex === null) return
    const onKey = e => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  return (
    <>
      <Grid>
        {images.map((image, index) => (
          <Tile
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`View image ${image.name}`}
          >
            <GatsbyImage image={getImage(image)} alt={image.name} />
          </Tile>
        ))}
      </Grid>
      {openIndex !== null && (
        <Overlay onClick={() => setOpenIndex(null)}>
          <ModalImg src={images[openIndex].publicURL} alt={images[openIndex].name} />
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
