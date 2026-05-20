import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Clock } from './Icons'

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  margin: 2rem 0 1.25rem;
  text-align: left;
  hyphens: none;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }
`

const Card = styled.article`
  position: relative;
  background: ${({ $featured }) =>
    $featured
      ? 'linear-gradient(168deg, #fff4f8 0%, #ffffff 58%)'
      : '#ffffff'};
  border: 1px solid
    ${({ $featured }) =>
      $featured ? 'rgba(246, 179, 205, 0.7)' : 'rgba(36, 62, 80, 0.10)'};
  border-radius: 18px;
  padding: 32px 26px 28px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $featured }) =>
    $featured
      ? '0 24px 50px -30px rgba(246, 179, 205, 0.85), 0 4px 12px -6px rgba(36, 62, 80, 0.06)'
      : '0 12px 28px -20px rgba(36, 62, 80, 0.20)'};
  transition: transform 240ms ease, box-shadow 240ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 26px 48px -22px rgba(36, 62, 80, 0.24);
  }
`

const Badge = styled.span`
  position: absolute;
  top: -12px;
  left: 22px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: ${colors.primary};
  color: ${colors.white};
  font-size: 0.68em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  padding: 8px 13px;
  border-radius: 999px;
  box-shadow: 0 8px 16px -8px rgba(36, 62, 80, 0.35);

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.accent};
  }
`

const Eyebrow = styled.div`
  font-size: 0.72em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${colors.textLight};
  margin-bottom: 10px;
`

const Title = styled.h3`
  font-family: 'Nunito', sans-serif;
  font-size: 1.4em;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0 0 6px;
  line-height: 1.2;
  letter-spacing: 0;
  text-transform: none;
`

const Tagline = styled.div`
  font-size: 0.92em;
  line-height: 1.45;
  color: ${colors.textLight};
  margin-bottom: 22px;
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
  margin: 2px 0 4px;
`

const Price = styled.span`
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 3.5em;
  letter-spacing: -0.035em;
  color: ${colors.primary};
  line-height: 1;
`

const Currency = styled.span`
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 1.15em;
  color: ${colors.primary};
  margin-left: 4px;
`

const Period = styled.span`
  font-size: 0.92em;
  color: ${colors.textLight};
  margin-left: 6px;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 22px;
`

const MinStay = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${colors.primary};
  padding: 6px 12px;
  background: ${colors.primaryLight};
  border-radius: 999px;
`

const Discount = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.8em;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: ${colors.primary};
  padding: 6px 12px;
  background: rgba(246, 179, 205, 0.35);
  border-radius: 999px;
`

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: rgba(36, 62, 80, 0.09);
  margin: 4px 0 18px;
`

const Highlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 11px;
  font-size: 0.92em;
  line-height: 1.5;
  color: ${colors.text};
  text-align: left;

  &::before {
    content: '';
    flex-shrink: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.accent};
    margin-top: 9px;
    box-shadow: 0 0 0 3px rgba(246, 179, 205, 0.25);
  }
`

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${colors.primary};
  color: ${colors.white} !important;
  padding: 13px 22px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95em;
  text-decoration: none !important;
  letter-spacing: 0.02em;
  margin-top: auto;
  transition: background 220ms ease, transform 220ms ease, box-shadow 220ms ease;

  &::after {
    content: '→';
    font-size: 1.05em;
    transition: transform 220ms ease;
  }

  &:hover {
    background: #142634;
    transform: translateY(-1px);
    box-shadow: 0 12px 24px -12px rgba(36, 62, 80, 0.45);
    text-decoration: none !important;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`

const PricingCards = () => (
  <Grid>
    <Card>
      <Eyebrow>Opieka wytchnieniowa</Eyebrow>
      <Title>Pobyt krótkoterminowy</Title>
      <Tagline>
        Wsparcie na czas urlopu, wyjazdu lub rekonwalescencji bliskiej osoby.
      </Tagline>
      <PriceRow>
        <Price>300</Price>
        <Currency>zł</Currency>
        <Period>/ doba</Period>
      </PriceRow>
      <MetaRow>
        <MinStay>
          <Clock size={14} />
          Minimum 7 dni
        </MinStay>
      </MetaRow>
      <Divider />
      <Highlights>
        <HighlightItem>
          Komfortowy pokój 2- lub 3-osobowy z prywatną łazienką
        </HighlightItem>
        <HighlightItem>
          Cztery posiłki dziennie z możliwością wyboru diety
        </HighlightItem>
        <HighlightItem>
          Całodobowa opieka opiekuńczo-pielęgnacyjna
        </HighlightItem>
        <HighlightItem>
          Stały kontakt z rodziną – pełen zasięg GSM i szybki internet
        </HighlightItem>
      </Highlights>
      <CtaButton href="/kontakt/">Zarezerwuj pobyt</CtaButton>
    </Card>

    <Card $featured>
      <Badge>Najczęściej wybierane</Badge>
      <Eyebrow>Stała opieka</Eyebrow>
      <Title>Pobyt długoterminowy</Title>
      <Tagline>
        Dom, w którym senior poczuje się bezpiecznie każdego dnia.
      </Tagline>
      <PriceRow>
        <Price>6&nbsp;500</Price>
        <Currency>zł</Currency>
        <Period>/ miesiąc</Period>
      </PriceRow>
      <MetaRow>
        <MinStay>
          <Clock size={14} />
          Minimum 1 miesiąc
        </MinStay>
        <Discount>−20% na usługi dodatkowe</Discount>
      </MetaRow>
      <Divider />
      <Highlights>
        <HighlightItem>
          Personalizowany pokój z elementami wystroju z domu
        </HighlightItem>
        <HighlightItem>
          Indywidualny plan opieki i wsparcie adaptacyjne
        </HighlightItem>
        <HighlightItem>
          Pełen program Montessori oraz rehabilitacji grupowej
        </HighlightItem>
        <HighlightItem>
          20% rabatu na wszystkie usługi spoza pakietu podstawowego
        </HighlightItem>
      </Highlights>
      <CtaButton href="/kontakt/">Umów wizytę</CtaButton>
    </Card>
  </Grid>
)

export default PricingCards
