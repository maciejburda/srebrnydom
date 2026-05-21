import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Home, Heart, Activity, Armchair } from './Icons'

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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
`

const Group = styled.div`
  background: ${colors.white};
  border: 1px solid rgba(36, 62, 80, 0.10);
  border-radius: 14px;
  padding: 22px 22px 24px;
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
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px dashed rgba(36, 62, 80, 0.14);
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

const GroupTitle = styled.h3`
  font-family: 'Nunito', sans-serif;
  font-size: 1.02em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0;
  line-height: 1.25;
  letter-spacing: 0;
  text-transform: none;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.9em;
  line-height: 1.5;
  color: ${colors.text};

  &::before {
    content: '';
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${colors.accent};
    margin-top: 8px;
  }
`

const groups = [
  {
    icon: Home,
    title: 'Komfort i wyżywienie',
    items: [
      'Komfortowe zakwaterowanie w 2-, 3- lub 4-osobowych pokojach z prywatną łazienką',
      'Pełne wyżywienie z 4 posiłkami dziennie i możliwością wyboru diety',
      'Nieograniczony dostęp do napojów zimnych i ciepłych',
      'Telewizja satelitarna w przestrzeniach wspólnych',
      'Bogata biblioteka książek z opcją zamówienia nowych tytułów',
    ],
  },
  {
    icon: Heart,
    title: 'Opieka i bezpieczeństwo',
    items: [
      'Całodobowe wsparcie wykwalifikowanego personelu',
      'Regularne dyżury pielęgniarek i systematyczny nadzór lekarski',
      'Indywidualny plan opieki i wsparcie adaptacyjne',
      'Aktywny system przyzywowy w każdym pokoju',
    ],
  },
  {
    icon: Activity,
    title: 'Aktywizacja i rehabilitacja',
    items: [
      'Warsztaty oparte na metodyce Montessori',
      'Grupowe zajęcia rehabilitacyjne',
      'Sala gimnastyczna przystosowana do potrzeb seniorów',
      'Spacery dostosowane do pory roku',
      'Indywidualna rehabilitacja z fizjoterapeutą (za dodatkową opłatą)',
    ],
  },
  {
    icon: Armchair,
    title: 'Codzienne udogodnienia',
    items: [
      'Pranie, suszenie oraz prasowanie odzieży',
      'Pomoc w zakupach lub dowóz do sklepu',
      'Usługi dodatkowe dostępne poza pakietem podstawowym',
    ],
  },
]

const BenefitsGroups = () => (
  <Section>
    <Lede>
      Pakiet podstawowy obejmuje wszystko, czego senior potrzebuje w codziennym
      życiu – od komfortowego pokoju i pełnego wyżywienia, po całodobową opiekę
      i bogaty program aktywizacji.
    </Lede>
    <Grid>
      {groups.map(({ icon: Icon, title, items }) => (
        <Group key={title}>
          <Head>
            <IconCircle>
              <Icon size={20} />
            </IconCircle>
            <GroupTitle>{title}</GroupTitle>
          </Head>
          <List>
            {items.map((item, i) => (
              <Item key={i}>{item}</Item>
            ))}
          </List>
        </Group>
      ))}
    </Grid>
  </Section>
)

export default BenefitsGroups
