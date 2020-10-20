import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import { colors, media } from '../tokens'
import useSiteImages from "../hooks/use-site-images"

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
    background-color: #f6b3cd;
    padding: 19px;
  }

  .footer-bottom-title {
    max-width: 1100px;
    margin: 0 auto;
    font-size: 0.83em;
  }

  @media (max-width: 564px) {
    .footer-col:first-child {
      width: 100%;
    }
  }
`
const LogoImage = styled(Image)`
  height: 80px;
  width: 80px;
  @media ${media.medium} {
    height: 200px;
    width: 200px;
  }
`

const Footer = () => {
  const { footerLinks, footerLinksIcon } = useSiteMetadata()
  const iconSrc = useSiteImages(footerLinksIcon).fluid

  const FooterItem = ({ item }) => {
    if (item.url.startsWith('/')) {
      return (
        <span className="footer-item">
          <Link className="footer-link" to={item.url}>
            {item.label}
          </Link>
        </span>
      )
    }
    return (
      <span className="footer-item">
        <a className="footer-link" href={item.url} target="_blank" rel="noreferrer">
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

  const FooterEnd = () => {
    return (
      <div className="footer-bottom">
        <h3 className="footer-bottom-title">
          © SREBRNYDOM.PL {new Date().getFullYear()} - WSZELKIE PRAWA ZASTRZEŻONE.
        </h3>
      </div>
    )
  }

  return (
    <FooterWrapper>
      <nav>
        <LogoImage fluid={iconSrc}/>

        {footerLinks.map((column, i) => {
          return <FooterColumn column={column} key={`footer-column-${i}`} />
        })}
      </nav>
      <FooterEnd/>
    </FooterWrapper> 
  )
}

export default Footer
