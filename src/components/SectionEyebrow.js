import styled from 'styled-components'
import { colors } from '../tokens'

const SectionEyebrow = styled.h2`
  display: flex;
  align-items: stretch;
  gap: 12px;
  margin: 3em 0 1.6em;
  padding: 0;
  font-family: 'Lato', sans-serif;
  font-size: 1em;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.textLight};
  text-align: left;
  line-height: 1.4;

  &::before {
    content: '';
    flex-shrink: 0;
    width: 3px;
    background: ${colors.accent};
    border-radius: 2px;
    margin: 2px 0;
  }
`

export default SectionEyebrow
