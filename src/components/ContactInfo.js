import React from 'react'
import styled from 'styled-components'
import { colors } from '../tokens'
import useSiteMetadata from '../hooks/use-site-config'
import { MapPin, Phone, Mail } from './Icons'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin: 1.2em 0;
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.9em;
  padding: 0.5em 0;
`

const IconCircle = styled.span`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: ${colors.accent};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  margin-top: 2px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1em;
`

const Label = styled.span`
  color: ${colors.textLight};
  font-size: 0.78em;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

const Value = styled.span`
  font-weight: 600;
  line-height: 1.4;
  color: ${colors.primary};

  a { color: inherit; }
  a:hover { text-decoration: underline; }
`

const ContactInfo = () => {
  const { business } = useSiteMetadata()
  const mapsUrl = `https://www.google.com/maps/place/${business.latitude},${business.longitude}`

  return (
    <Wrapper>
      <Row>
        <IconCircle><MapPin size={16} /></IconCircle>
        <Body>
          <Label>Adres</Label>
          <Value>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {business.streetAddress}<br />
              {business.postalCode} {business.addressLocality}
            </a>
          </Value>
        </Body>
      </Row>

      <Row>
        <IconCircle><Phone size={16} /></IconCircle>
        <Body>
          <Label>Rezerwacja pobytu (9:00–17:00)</Label>
          <Value>
            <a href={`tel:${business.telephone}`}>{business.telephone}</a>
          </Value>
        </Body>
      </Row>

      <Row>
        <IconCircle><Phone size={16} /></IconCircle>
        <Body>
          <Label>Telefon do Srebrnego Domu (9:00–19:00)</Label>
          <Value>
            <a href={`tel:${business.secondaryTelephone}`}>{business.secondaryTelephone}</a>
          </Value>
        </Body>
      </Row>

      <Row>
        <IconCircle><Mail size={16} /></IconCircle>
        <Body>
          <Label>E-mail</Label>
          <Value>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </Value>
        </Body>
      </Row>
    </Wrapper>
  )
}

export default ContactInfo
