import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const Section = styled.section`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 16px;
  text-align: left;
  hyphens: none;
`

const Inner = styled.div`
  position: relative;
  background: linear-gradient(125deg, #f4faff 0%, #fff5f8 100%);
  border: 1px solid rgba(36, 62, 80, 0.08);
  border-radius: 18px;
  padding: 28px 24px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, rgba(246, 179, 205, 0.4), transparent 70%);
    pointer-events: none;
  }
`

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, 1fr);
  gap: 18px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 14px;
  }
`

const Stat = styled.div`
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    right: -9px;
    top: 14%;
    bottom: 14%;
    width: 1px;
    background: rgba(36, 62, 80, 0.12);
  }

  &:last-of-type::after {
    display: none;
  }

  @media (max-width: 640px) {
    &::after {
      display: none;
    }
  }
`

const Value = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 2.4em;
  letter-spacing: -0.035em;
  color: ${colors.primary};
  line-height: 1.05;
`

const Label = styled.div`
  margin-top: 8px;
  font-size: 0.74em;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.textLight};
  line-height: 1.35;
`

const StatsStrip = ({ items }) => (
  <Section>
    <Inner>
      <Grid $count={items.length}>
        {items.map(({ value, label }) => (
          <Stat key={label}>
            <Value>{value}</Value>
            <Label>{label}</Label>
          </Stat>
        ))}
      </Grid>
    </Inner>
  </Section>
)

export default StatsStrip
