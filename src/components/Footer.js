import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import { colors, media } from '../tokens'
import useSiteImages from "../hooks/use-site-images"
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram } from './Icons'

const FooterWrapper = styled.footer`
  text-align: left;
  padding-top: 8px;
  background-color: ${colors.primary};
  color: ${colors.textLightest};
  margin: 0 auto;

  & nav {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    max-width: 1100px;
    margin: 0 auto;
    padding-bottom: 8px;

    .footer-col {
      flex: 1 auto;
      display: inline-flex;
      flex-direction: column;
      padding-left: 5em;
      padding-bottom: 2em;
    }
  }

  & a {
    color: ${colors.textLightest};
    font-weight: bold;

    &:hover {
      color: ${colors.textLightestHover};
    }
  }

  .footer-col > p {
    margin: 0;
  }

  .footer-title {
    font-size: 18sp;
    margin: 1.5rem 0 1rem;
  }

  .footer-item {
    color: ${colors.textLightest};

    & a {
      padding: 0.25rem 0;
      display: block;
    }
  }

  .footer-heart {
    color: ${colors.heartFooter};
  }

  .footer-item-text {
    padding: 0.1rem 0;
    color: ${colors.textLightest};
  }

  .footer-header {
    order: 1;
    margin: 0 0.25rem;
    margin-right: 0.25rem;
    padding: 0.25rem;
  }

  .footer-column-items {
    grid-template-columns: 1fr;
    display: grid;
  }

  .footer-bottom {
    background-color: ${colors.accent};
    padding: 19px;
  }

  .footer-bottom-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
  }

  .footer-bottom-title {
    margin: 0;
    font-size: 0.83em;
  }

  .footer-cookie-link {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    font: inherit;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .footer-cookie-link:hover,
  .footer-cookie-link:focus {
    opacity: 0.7;
  }

  .footer-icon {
    display: inline-flex;
    vertical-align: middle;
    margin-right: 0.45em;
    color: ${colors.textLightest};
  }

  @media (max-width: 564px) {
    .footer-col:first-child {
      width: 100%;
    }
  }
`
const LogoImage = styled(GatsbyImage)`
  height: 0px;
  width: 0px;
  @media ${media.medium} {
    height: 200px;
    width: 200px;
  }
`

const Footer = () => {
  const { footerLinks, footerLinksIcon } = useSiteMetadata()
  const iconImage = useSiteImages(footerLinksIcon).gatsbyImageData

  const iconFor = item => {
    if (item.url.startsWith('tel:')) return <Phone size={14} />
    if (item.url.startsWith('mailto:')) return <Mail size={14} />
    if (item.url.includes('google.com/maps')) return <MapPin size={14} />
    if (item.label === 'Facebook') return <Facebook size={14} />
    if (item.label === 'LinkedIn') return <Linkedin size={14} />
    if (item.label === 'Twitter') return <Twitter size={14} />
    if (item.label === 'Instagram') return <Instagram size={14} />
    return null
  }

  const FooterItem = ({ item }) => {
    const icon = iconFor(item)
    if (item.url.startsWith('/')) {
      return (
        <span className="footer-item">
          <Link className="footer-link" to={item.url}>
            {icon && <span className="footer-icon">{icon}</span>}
            {item.label}
          </Link>
        </span>
      )
    }
    return (
      <span className="footer-item">
        <a className="footer-link" href={item.url} target="_blank" rel="noreferrer">
          {icon && <span className="footer-icon">{icon}</span>}
          {item.label}
        </a>
      </span>
    )
  }

  const FooterColumn = ({ column }) => {
    return (
      <div className="footer-col">
        <h3 className="footer-title" key={column.sectionName}>
          {column.sectionName}
        </h3>
        <div className="footer-column-items">
          {column.links.map((item, i) => {
            return <FooterItem item={item} key={`footer-column-item-${i}`} />
          })}
        </div>
      </div>
    )
  }

  const handleCookieSettings = () => {
    if (typeof window === 'undefined') return
    import('cookie-though').then(mod => mod.show())
  }

  const FooterEnd = () => {
    return (
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <h3 className="footer-bottom-title">
            © SREBRNYDOM.PL {new Date().getFullYear()} - WSZELKIE PRAWA ZASTRZEŻONE.
          </h3>
          <button
            type="button"
            className="footer-cookie-link"
            onClick={handleCookieSettings}
          >
            Aktualizuj ciasteczka
          </button>
        </div>
      </div>
    )
  }

  return (
    <FooterWrapper>
      <nav>
        <LogoImage image={iconImage} alt="Srebrny Dom logo"/>

        {footerLinks.map((column, i) => {
          return <FooterColumn column={column} key={`footer-column-${i}`} />
        })}
      </nav>
      <FooterEnd/>
    </FooterWrapper> 
  )
}

export default Footer
