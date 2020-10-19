/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import useSiteImages from '../hooks/use-site-images'
import Hero from '../components/Hero'
import useSiteMetadata from "../hooks/use-site-config"

const MainTitle = styled.h1`
  margin: 16px;
  line-height: 1.5;
  text-align: center;
  font-size: 2rem;
`

const Content = styled.span`
  display: block;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 16px;
`

const SubTitle = styled.h2`
  padding-top: 40px;
  line-height: 1.2;
  border-top: 1px solid #ececec;
  margin-bottom: 32px;
`

const CircleWrapper = styled.div`
  margin-top: 40px;
  display: flex;
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
  const { homepageImage, trees, circle1, circle2, circle3, circle4, circle5 } = useSiteMetadata()
  const homeImage = useSiteImages(homepageImage).fluid.src
  const treesImage = useSiteImages(trees).fluid.src
  const circle1Img = useSiteImages(circle1).fluid.src
  const circle2Img = useSiteImages(circle2).fluid.src
  const circle3Img = useSiteImages(circle3).fluid.src
  const circle4Img = useSiteImages(circle4).fluid.src
  const circle5Img = useSiteImages(circle5).fluid.src

  return (
    <Layout location={props.location} noCover={true}>
      <SEO title="Strona Główna" />
      <Hero heroImg={homeImage} treesImg={treesImage} title="Dom Seniora w Sercu Kaszub"/>
      <Wrapper>
        <Content>
          Mimo najszczerszych chęci bliscy często nie są w stanie zapewnić rodzicom, babci lub dziadkowi odpowiedniej opieki. Praca zawodowa, rodzina, często zamieszkanie w znacznej odległości  nie daje fizycznej możliwości opiekowania się nimi. Opieka nad starszymi osobami to zajęcie niezwykle absorbujące wymagające jednocześnie dużej ilości czasu oraz cierpliwości.
        </Content>
        <Content>
          W takiej sytuacji wybór placówki prywatnej jest najlepszym możliwym rozwiązaniem. Wielu seniorów tylko w domu opieki może otrzymać pomoc w wykonywaniu codziennych czynności.  Spędzenie jesieni życia w takiej placówce, z dala od znajomych ulic, osób i środowiska, z którym seniorzy są związani emocjonalnie, łączy się z dużym stresem. Często prowadzi też do zniechęcenia i wycofania się z aktywnego życia. Jako specjaliści i pasjonaci doskonale rozumiemy potrzebę stworzenia miejsca, w którym nasi podopieczni poczują się jak w domu. Dlatego w naszym <i>Srebrnym Domu</i>  zapewnimy  nie tylko opiekę.
        </Content>
        <Content>
          Tworzymy w nim warunki maksymalnie zbliżone do tych znanych z codziennego życia. Oferowana przez naszą placówkę prywatna opieka nad osobami starszymi uwzględnia zarówno pielęgnację, jak i pomoc medyczną. Zapewniamy też domową atmosferę i spokój w przyjemnych pomieszczeniach. Dzięki którym nasi mieszkańcy mogą wypoczywać, nawiązywać kontakty towarzyskie oraz wypełniać czas rozrywką i aktywnymi zajęciami.
        </Content>
        <Content>
          <i>Srebrny Dom</i> znajduje się w środku lasu, nieopodal miejscowości Swornegacie w gminie Chojnice, w województwie pomorskim. Wyjątkowe walory przyrodnicze i zdrowotne z uwagi na położenie w sąsiedztwie Parku Narodowego „Bory Tucholskie” w Zaborskim Parku Krajobrazowym. Wspaniała okolica sprzyja spacerom i relaksowi na świeżym powietrzu. Dużym atutem jest położenie w centrum prawie 5ha działki leśnej. Nie ma wokół żadnej zabudowy mieszkaniowej ani usługowej co gwarantuje spokój. Wokół budynku mamy 800 m2 płaskiej  powierzchni w polbruku. Mogą na niej spędzać czas ci podopieczni, którym ograniczona sprawność nie pozwala na długie wędrówki. Doskonałe warunki zapewnia też wnętrze budynku – przystosowane do potrzeb osób niepełnosprawnych.
        </Content>
        <Content>
        Prywatna opieka nad osobami starszymi, którą zapewniamy, jest realizowana przez wykwalifikowany, życzliwy i w pełni zaangażowany personel, który wspiera seniorów i dzieli się z nimi uśmiechem. 
        </Content>

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
            <CircleText>Komofortowe<br/>pomieszczenia</CircleText>
          </Cell>
        </CircleWrapper>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
