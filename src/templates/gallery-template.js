import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import Seo from '../components/SEO'
import Gallery from '../components/Gallery'
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

class GalleryTemplate extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Wrapper>
          <Header>
            <Eyebrow>Wnętrza i otoczenie</Eyebrow>
            <Title>Galeria Srebrnego Domu</Title>
            <Lede>
              Zajrzyj do naszych pokoi, części wspólnych i otaczającego lasu na
              Kaszubach. Kliknij dowolne zdjęcie, aby otworzyć je w widoku
              pełnoekranowym.
            </Lede>
          </Header>
          <Gallery />
        </Wrapper>
        <CtaCard
          eyebrow="Spodobało Ci się?"
          title="Sprawdź ofertę i cennik"
          sub="Zobacz pełen zakres opieki oraz pakiety cenowe Srebrnego Domu."
          primaryLabel="Sprawdź cennik"
          primaryHref="/cennik/"
          secondaryLabel="Skontaktuj się"
          secondaryHref="/kontakt/"
        />
      </Layout>
    )
  }
}

export default GalleryTemplate

export const Head = () => (
  <Seo
    title="Galeria Zdjęć - Srebrny Dom"
    description="Zdjęcia domu seniora w miejscowości Swornegacie w województwie pomorskim."
    path="/galeria/"
  />
)
