import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'

const tones = {
  accent: {
    border: colors.accent,
    bg: '#fff5f8',
    label: colors.primary,
  },
  primary: {
    border: colors.primary,
    bg: colors.primaryLight,
    label: colors.primary,
  },
  neutral: {
    border: 'rgba(36, 62, 80, 0.18)',
    bg: '#fafbfc',
    label: colors.textLight,
  },
}

const Box = styled.aside`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin: 1.75rem 0 0.75rem;
  padding: 18px 22px;
  background: ${({ $tone }) => tones[$tone].bg};
  border: 1px solid rgba(36, 62, 80, 0.08);
  border-left: 3px solid ${({ $tone }) => tones[$tone].border};
  border-radius: 12px;
  text-align: left;
  hyphens: none;
`

const IconCircle = styled.span`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: ${colors.accent};
  color: ${colors.primary};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`

const Body = styled.div`
  flex: 1;
`

const Eyebrow = styled.div`
  font-size: 0.72em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: ${({ $tone }) => tones[$tone].label};
  margin-bottom: 6px;
`

const Title = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 1.05em;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 1.3;
  margin-bottom: 6px;
`

const Content = styled.div`
  font-size: 0.94em;
  line-height: 1.55;
  color: ${colors.text};

  & p {
    margin: 0;
  }

  & p + p {
    margin-top: 0.5em;
  }
`

const Callout = ({ tone = 'accent', icon: Icon, eyebrow, title, children }) => (
  <Box $tone={tone}>
    {Icon && (
      <IconCircle>
        <Icon size={18} />
      </IconCircle>
    )}
    <Body>
      {eyebrow && <Eyebrow $tone={tone}>{eyebrow}</Eyebrow>}
      {title && <Title>{title}</Title>}
      <Content>{children}</Content>
    </Body>
  </Box>
)

export default Callout
