/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import useSiteImages from '../hooks/use-site-images'
import Hero from '../components/Hero'
import useSiteMetadata from "../hooks/use-site-config"

const Content = styled.span`
  display: block;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 16px;
`

const CircleWrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  margin-top: 16px;
  padding-bottom: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Cell = styled.div`
  display: table-cell;
  text-align: center;
`

const Circle = styled.div`
  margin: 0 auto;
  border-radius: 50%;
  width: 92px;
  height: 92px;
  background-color: #eff5fa;
`
const CircleText = styled.div`
  margin-top: 22px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: 0.4px;
  text-align: center;
`

const NotFoundPage = props => {
  const { homepageImage, trees, health24, doctor, physio, nature, comfort } = useSiteMetadata()
  const homeImage = useSiteImages(homepageImage).fluid.src
  const treesImage = useSiteImages(trees).fluid.src
  const circle1Img = useSiteImages(health24).fluid.src
  const circle2Img = useSiteImages(doctor).fluid.src
  const circle3Img = useSiteImages(physio).fluid.src
  const circle4Img = useSiteImages(nature).fluid.src
  const circle5Img = useSiteImages(comfort).fluid.src

  return (
    <Layout location={props.location} noCover={true}>
      <SEO title="Dom seniora, opieka, spokojna starość - pomorskie - Srebrny Dom"
           description="Nasz luksusowy dom spokojnej starości położony jest na malowniczych Kaszubach w województwie pomorskim. Zapewniamy seniorom profesjonalną i całodobową opiekę."
      />
      <Hero heroImg={homeImage} treesImg={treesImage} title="Dom Opieki nad seniorami - Srebrny Dom"/>
      <Wrapper>
        <Content>
          Zajmowanie się rodzicami, babciami oraz dziadkami (zwłaszcza tymi potrzebującymi wsparcia w wykonywaniu codziennych czynności) to dla wielu osób spore wyzwanie. Dzieci czy wnuki często mieszkają w sporej odległości od najbliższych, a dodatkowo są przytłoczone obowiązkami zawodowymi oraz zobowiązaniami rodzinnymi, przez co nie są w stanie sprawować całodobowej opieki. Rozwiązanie takiej trudnej sytuacji stanowi zdecydowanie się na profesjonalną luksusową placówkę opiekuńczą - taką, jak prowadzony przez nas dom seniora na Kaszubach. Posiadamy zezwolenie nr 114 w rejestrze placówek zapewniających całodobową opiekę osobom niepełnosprawnym, przewlekle chorym lub osobom w starszym wieku Wojewody Pomorskiego.
        </Content>
        <Content>
          Luksusowy dom opieki dla seniorów na Kaszubach.
        </Content>
        <Content>
          Prowadzony przez nas na terenie województwa pomorskiego dom seniora zapewni starszym i schorowanym osobom nie tylko komfortowe warunki pobytu ze stała opieką medyczno - rehabilitacyjną, ale również pomoc w wykonywaniu codziennych czynności. Kładziemy nacisk na tworzenie bezpiecznych oraz przyjaznych warunków życia, by żaden senior nie czuł się u nas nieswojo. Pomieszczenia dostosowaliśmy do potrzeb osób starszych oraz niepełnosprawnych, co zapewnia komfortowy wypoczynek. Oferowana przez naszą luksusową placówkę opieka obejmuje również troskę o zdrowie – dbamy o pielęgnację pensjonariuszy i dysponujemy kadrą świadczącą pomoc medyczną.
        </Content>
        <Content>
          Kaszuby - bliskość natury
        </Content>
        <Content>
          Prowadzony przez nas luksusowy dom spokojnej starości znajduje się w środku lasu, nieopodal miejscowości Swornegacie w gminie Chojnice. Jest położony w centrum ogromnej działki leśnej, spokój i możliwość wypoczynku w komfortowych warunkach gwarantuje brak zabudowy mieszkaniowej oraz usługowej wokół. Bezpośrednie położenie w sąsiedztwie Parku Narodowego „Bory Tucholskie” w Zaborskim Parku Krajobrazowym powoduje, że prowadzony przez nas dom seniora cieszy się wyjątkowymi walorami przyrodniczymi i zdrowotnymi.
        </Content>
        <Content>
          Zapewniamy, że stworzyliśmy luksusowe miejsce, w którym każda osoba starsza, schorowana czy niepełnosprawna wymagające opieki poczują się jak we własnym domu.
        </Content>
      </Wrapper>
      <CircleWrapper>
          <Cell>
            <Circle style={{ backgroundImage: `url("${circle1Img}")` }}/>
            <CircleText>Całodobowa<br/>opieka medyczna</CircleText>
          </Cell>
          <Cell>
            <Circle style={{ backgroundImage: `url("${circle2Img}")` }}/>
            <CircleText>Regularne<br/>wizyty lekarskie</CircleText>
          </Cell>
          <Cell>
            <Circle style={{ backgroundImage: `url("${circle3Img}")` }}/>
            <CircleText>Opieka<br/>fizjoterapeutyczna</CircleText>
          </Cell>
          <Cell>
            <Circle style={{ backgroundImage: `url("${circle4Img}")` }}/>
            <CircleText>Bliskość<br/>natury</CircleText>
          </Cell>
          <Cell>
            <Circle style={{ backgroundImage: `url("${circle5Img}")` }}/>
            <CircleText>Komfortowe<br/>pomieszczenia</CircleText>
          </Cell>
        </CircleWrapper>
    </Layout>
  )
}

export default NotFoundPage
