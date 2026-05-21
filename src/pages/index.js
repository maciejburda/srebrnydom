/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import TextColumn from '../components/TextColumn'
import SectionEyebrow from '../components/SectionEyebrow'
import Seo from '../components/SEO'
import useSiteImages from '../hooks/use-site-images'
import Hero from '../components/Hero'
import useSiteMetadata from '../hooks/use-site-config'
import HomeFeatures from '../components/HomeFeatures'
import StatsStrip from '../components/StatsStrip'
import CtaCard from '../components/CtaCard'

const Content = styled.p`
  line-height: 1.5;
  text-align: justify;
  margin: 0 0 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

const IntroWrapper = styled(Wrapper)`
  padding-bottom: 24px;
`

const yearsOfExperience = new Date().getFullYear() - 2019

const homeStats = [
  { value: '114', label: 'Zezwolenie Wojewody Pomorskiego' },
  { value: '1,2 ha', label: 'Ogrodzonej leśnej działki' },
  { value: '600 m²', label: 'Powierzchni domu' },
  { value: yearsOfExperience, label: 'Lat doświadczenia' },
]

const NotFoundPage = props => {
  const { homepageImage, trees } = useSiteMetadata()
  const homeImage = useSiteImages(homepageImage).fluid.src
  const treesImage = useSiteImages(trees).fluid.src

  return (
    <Layout location={props.location} noCover={true}>
      <Hero
        heroImg={homeImage}
        treesImg={treesImage}
        title="Dom Opieki nad seniorami - Srebrny Dom"
      />
      <IntroWrapper>
        <Content>
          Zajmowanie się rodzicami, babciami oraz dziadkami (zwłaszcza tymi
          potrzebującymi wsparcia w wykonywaniu codziennych czynności) to dla
          wielu osób spore wyzwanie. Dzieci czy wnuki często mieszkają w sporej
          odległości od najbliższych, a dodatkowo są przytłoczone obowiązkami
          zawodowymi oraz zobowiązaniami rodzinnymi, przez co nie są w stanie
          sprawować całodobowej opieki. Rozwiązanie takiej trudnej sytuacji
          stanowi zdecydowanie się na profesjonalną luksusową placówkę
          opiekuńczą - taką, jak prowadzony przez nas dom seniora na Kaszubach.
          Posiadamy zezwolenie nr 114 w rejestrze placówek zapewniających
          całodobową opiekę osobom niepełnosprawnym, przewlekle chorym lub
          osobom w starszym wieku Wojewody Pomorskiego.
        </Content>
      </IntroWrapper>
      <HomeFeatures />
      <TextColumn>
        <SectionEyebrow>
          Luksusowy dom opieki dla seniorów na Kaszubach
        </SectionEyebrow>
        <Content>
          Prowadzony przez nas na terenie województwa pomorskiego dom seniora
          zapewni starszym i schorowanym osobom nie tylko komfortowe warunki
          pobytu ze stała opieką medyczno - rehabilitacyjną, ale również pomoc
          w wykonywaniu codziennych czynności. Kładziemy nacisk na tworzenie
          bezpiecznych oraz przyjaznych warunków życia, by żaden senior nie
          czuł się u nas nieswojo. Pomieszczenia dostosowaliśmy do potrzeb osób
          starszych oraz niepełnosprawnych, co zapewnia komfortowy wypoczynek.
          Oferowana przez naszą luksusową placówkę opieka obejmuje również
          troskę o zdrowie – dbamy o pielęgnację pensjonariuszy i dysponujemy
          kadrą świadczącą pomoc medyczną.
        </Content>
      </TextColumn>
      <StatsStrip items={homeStats} />
      <TextColumn>
        <SectionEyebrow>Kaszuby – bliskość natury</SectionEyebrow>
        <Content>
          Prowadzony przez nas luksusowy dom spokojnej starości znajduje się w
          środku lasu, nieopodal miejscowości Swornegacie w gminie Chojnice.
          Jest położony w centrum ogromnej działki leśnej, spokój i możliwość
          wypoczynku w komfortowych warunkach gwarantuje brak zabudowy
          mieszkaniowej oraz usługowej wokół. Bezpośrednie położenie w
          sąsiedztwie Parku Narodowego „Bory Tucholskie” w Zaborskim Parku
          Krajobrazowym powoduje, że prowadzony przez nas dom seniora cieszy
          się wyjątkowymi walorami przyrodniczymi i zdrowotnymi.
        </Content>
        <Content>
          Zapewniamy, że stworzyliśmy luksusowe miejsce, w którym każda osoba
          starsza, schorowana czy niepełnosprawna wymagające opieki poczują się
          jak we własnym domu.
        </Content>
      </TextColumn>
      <CtaCard
        eyebrow="Porozmawiajmy"
        title="Sprawdź, jak możemy zadbać o Twojego bliskiego"
        sub="Zobacz pełen cennik pakietów lub umów wizytę — chętnie pomożemy dopasować opiekę do potrzeb i możliwości Twojej rodziny."
        primaryLabel="Zobacz cennik"
        primaryHref="/cennik/"
        secondaryLabel="Skontaktuj się"
        secondaryHref="/kontakt/"
      />
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => (
  <Seo
    title="Dom seniora pomorskie – opieka całodobowa - Srebrny Dom"
    description="Luksusowy prywatny dom seniora na Kaszubach w pomorskim. Całodobowa opieka, rehabilitacja i metoda Montessori dla Twoich bliskich."
    translations={[{ language: 'en', link: '/en/', hreflang: 'en' }]}
  />
)
