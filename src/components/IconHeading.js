import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import { Heart, Stethoscope, Activity, Home, Leaf, PineTree } from './Icons'

const iconMap = {
  heart: Heart,
  stethoscope: Stethoscope,
  activity: Activity,
  home: Home,
  leaf: Leaf,
  pine: PineTree,
}

const Heading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.7em;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid #ececec;
  font-weight: 800;
  line-height: 1.2;
  font-size: 1.7em;
`

const IconCircle = styled.span`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: ${colors.accent};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
`

const IconHeading = ({ icon, children }) => {
  const Icon = iconMap[icon]
  return (
    <Heading>
      {Icon && (
        <IconCircle>
          <Icon size={22} />
        </IconCircle>
      )}
      <span>{children}</span>
    </Heading>
  )
}

export default IconHeading
