import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Section = styled.section`
  max-width: 720px;
  margin: 28px auto 60px;
  padding: 0 16px;
  text-align: left;
  hyphens: none;
`

const Card = styled.div`
  position: relative;
  background: linear-gradient(140deg, ${colors.primary} 0%, #1a3144 100%);
  color: ${colors.white};
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 24px 48px -28px rgba(36, 62, 80, 0.55);

  &::before {
    content: '';
    position: absolute;
    top: -70px;
    right: -70px;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(246, 179, 205, 0.42), transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -90px;
    left: -90px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(255, 220, 78, 0.12), transparent 70%);
    pointer-events: none;
  }
`

const Content = styled.div`
  position: relative;
`

const Eyebrow = styled.div`
  font-size: 0.72em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: ${colors.accent};
  margin-bottom: 14px;
`

const Title = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: 1.75em;
  font-weight: 700;
  margin: 0 0 14px;
  color: ${colors.white};
  line-height: 1.2;
  border: none !important;
  padding: 0 !important;
`

const Sub = styled.p`
  font-size: 0.98em;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 auto 26px;
  max-width: 480px;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`

const buttonBase = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95em;
  text-decoration: none !important;
  letter-spacing: 0.02em;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease,
    border-color 220ms ease;
`

const PrimaryButton = styled.a`
  ${buttonBase}
  background: ${colors.accent};
  color: ${colors.primary} !important;

  &::after {
    content: '→';
    transition: transform 220ms ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 26px -12px rgba(246, 179, 205, 0.65);
    text-decoration: none !important;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`

const SecondaryButton = styled.a`
  ${buttonBase}
  background: transparent;
  color: ${colors.white} !important;
  border: 1px solid rgba(255, 255, 255, 0.38);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.6);
    text-decoration: none !important;
  }
`

const CtaCard = ({
  eyebrow,
  title,
  sub,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}) => (
  <Section>
    <Card>
      <Content>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Title>{title}</Title>
        {sub && <Sub>{sub}</Sub>}
        <Buttons>
          {primaryHref && (
            <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          )}
          {secondaryHref && (
            <SecondaryButton href={secondaryHref}>
              {secondaryLabel}
            </SecondaryButton>
          )}
        </Buttons>
      </Content>
    </Card>
  </Section>
)

export default CtaCard
