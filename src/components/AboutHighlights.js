import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Heart, Activity, PineTree } from './Icons'

const Section = styled.section`
  margin: 2.5rem 0 1.5rem;
  text-align: left;
  hyphens: none;
`

const Lede = styled.p`
  font-size: 0.95em;
  line-height: 1.55;
  color: ${colors.textLight};
  margin: 0 0 1.5rem;
  text-align: left;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
`

const Card = styled.div`
  background: ${colors.white};
  border: 1px solid rgba(36, 62, 80, 0.1);
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  transition: border-color 220ms ease, transform 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    border-color: rgba(246, 179, 205, 0.65);
    transform: translateY(-2px);
    box-shadow: 0 14px 28px -22px rgba(36, 62, 80, 0.18);
  }
`

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

const IconCircle = styled.span`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: ${colors.accent};
  color: ${colors.primary};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h3`
  font-family: 'Nunito', sans-serif;
  font-size: 1em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0;
  line-height: 1.25;
  letter-spacing: 0;
  text-transform: none;
`

const Body = styled.p`
  margin: 0;
  font-size: 0.9em;
  line-height: 1.55;
  color: ${colors.text};
  text-align: left;
`

const highlights = [
  {
    icon: Heart,
    title: 'Rodzinna firma od 2019 r.',
    body:
      'Srebrny Dom zrodził się z naszych osobistych doświadczeń w wieloletniej opiece nad bliskimi.',
  },
  {
    icon: Activity,
    title: 'Metoda Montessori',
    body:
      'Personel jest szkolony w pracy z seniorami w duchu „Pomóż mi to zrobić samodzielnie".',
  },
  {
    icon: PineTree,
    title: 'Bliskość natury Kaszub',
    body:
      'Las, cisza i sąsiedztwo Parku Narodowego „Bory Tucholskie" – warunki sprzyjające codziennej regeneracji.',
  },
]

const AboutHighlights = () => (
  <Section>
    <Lede>
      Tworzymy ciepłe miejsce, w którym seniorzy bezpiecznie rozwijają swój
      potencjał i wspólnie spędzają czas — w rodzinnej atmosferze i otoczeniu
      Kaszub.
    </Lede>
    <Grid>
      {highlights.map(({ icon: Icon, title, body }) => (
        <Card key={title}>
          <Head>
            <IconCircle>
              <Icon size={20} />
            </IconCircle>
            <Title>{title}</Title>
          </Head>
          <Body>{body}</Body>
        </Card>
      ))}
    </Grid>
  </Section>
)

export default AboutHighlights
