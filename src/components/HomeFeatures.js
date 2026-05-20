import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import useSiteMetadata from '../hooks/use-site-config'
import useSiteImages from '../hooks/use-site-images'

const Section = styled.section`
  max-width: 960px;
  margin: 10px auto 48px;
  padding: 0 16px;
`

const Eyebrow = styled.div`
  text-align: center;
  font-size: 0.78em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: ${colors.textLight};
  margin-bottom: 28px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px 20px;
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 26px 14px;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  transition: transform 240ms ease;

  &:hover {
    transform: translateY(-3px);
  }
`

const Circle = styled.div`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background-color: ${colors.primaryLight};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 14px 26px -18px rgba(36, 62, 80, 0.25);
`

const Label = styled.div`
  font-size: 0.92em;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 1.3;
  letter-spacing: 0.005em;
  max-width: 170px;
`

const HomeFeatures = () => {
  const { health24, doctor, physio, nature, comfort } = useSiteMetadata()
  const health24Img = useSiteImages(health24).fluid.src
  const doctorImg = useSiteImages(doctor).fluid.src
  const physioImg = useSiteImages(physio).fluid.src
  const natureImg = useSiteImages(nature).fluid.src
  const comfortImg = useSiteImages(comfort).fluid.src

  const features = [
    {
      image: health24Img,
      label: (
        <>
          Całodobowa opieka
          <br />i wsparcie w codziennym
          <br />
          funkcjonowaniu
        </>
      ),
    },
    {
      image: doctorImg,
      label: (
        <>
          Regularne
          <br />
          wizyty lekarskie
        </>
      ),
    },
    {
      image: physioImg,
      label: (
        <>
          Opieka
          <br />
          fizjoterapeutyczna
        </>
      ),
    },
    {
      image: natureImg,
      label: (
        <>
          Bliskość
          <br />
          natury
        </>
      ),
    },
    {
      image: comfortImg,
      label: (
        <>
          Komfortowe
          <br />
          pomieszczenia
        </>
      ),
    },
  ]

  return (
    <Section>
      <Eyebrow>Co u nas znajdziesz</Eyebrow>
      <Grid>
        {features.map((f, i) => (
          <Item key={i}>
            <Circle style={{ backgroundImage: `url("${f.image}")` }} />
            <Label>{f.label}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  )
}

export default HomeFeatures
