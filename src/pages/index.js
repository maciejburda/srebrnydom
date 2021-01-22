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
      <SEO title="Strona Główna" />
      <Hero heroImg={homeImage} treesImg={treesImage} title="Dom Seniora w Sercu Kaszub"/>
      <Wrapper>
        <Content>
          W dzisiejszych czasach wielu ludzi mimo najszczerszych chęci często nie jesteśmy w stanie zapewnić naszym rodzicom, babciom lub dziadkom odpowiedniej opieki, jakiej te osoby wymagają. Obowiązki zawodowe, rodzinne, a często zamieszkanie w znacznej odległości od naszych najbliższych nie dają nam fizycznej możliwości należytego zatroszczenia się o ich los. W takich sytuacjach wybór profesjonalnej placówki opiekuńczej często jest najlepszym rozwiązaniem. W ten sposób możemy zapewnić naszym bliskim seniorom komfortowe warunki zamieszkania, opiekę medyczno-rehabilitacyjną, a także odpowiednią pomoc w wykonywaniu codziennych czynności.
        </Content>
        <Content>
          Jako specjaliści i pasjonaci doskonale rozumiemy potrzebę stworzenia miejsca, w którym nasi podopieczni poczują się jak w domu. Dlatego w <i>Srebrnym Domu</i> tworzymy bezpieczne i przyjazne warunki maksymalnie zbliżone do tych znanych z codziennego życia. Oferowana przez naszą kameralną placówkę prywatna opieka nad osobami starszymi uwzględnia zarówno pielęgnację, jak i pomoc medyczną świadczoną przez wykwalifikowaną kadrę. Zapewniamy również ciepłą, domową atmosferę i spokój w przyjemnych pomieszczeniach, dostosowanych do potrzeb osób starszych i niepełnosprawnych.
        </Content>
        <Content>
          <i>Srebrny Dom</i> znajduje się w środku lasu, nieopodal miejscowości Swornegacie w gminie Chojnice, w województwie pomorskim. Jest położony w centrum 5ha działki leśnej, a dookoła nie ma żadnej zabudowy mieszkaniowej ani usługowej, co gwarantuje spokój. Dodatkowo, bezpośrednie położenie w sąsiedztwie Parku Narodowego „Bory Tucholskie” w Zaborskim Parku Krajobrazowym, powoduje, że miejsce to cieszy się wyjątkowymi walorami przyrodniczymi i zdrowotnymi. Wspaniała okolica sprzyja spacerom i relaksowi na świeżym powietrzu.
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
