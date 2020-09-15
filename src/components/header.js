/* eslint-disable react-hooks/rules-of-hooks */

import React from "react"
import Link from "../components/Link"
import styled from "styled-components"
import { injectIntl } from "gatsby-plugin-intl"

import useSiteMetadata from "../hooks/use-site-config"
import { colors, media, typography } from "../tokens"
import useSiteImages from "../hooks/use-site-images"
import { ms } from "../styles/helpers"

import Text, { TextStyle, StyledText } from "./Text"
import MobileHeader from "./MobileHeader"

const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  z-index: 1000;
  background-color: ${colors.primaryLight};

  @media ${media.medium} {
    position: sticky;
  }
`

const HeaderNav = styled.nav`
  display: grid;
  grid-template-areas: "logo settings";
  grid-template-columns: 1fr auto;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${ms(0)};

  @media ${media.medium} {
    padding: 0 ${ms(8)};
    grid-template-areas:
      "logo settings"
      "logo navigation";
  }
`

const HeaderLinksContainer = styled.ul`
  display: none;

  @media ${media.medium} {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    grid-area: navigation;
    justify-content: flex-end;
    align-items: center;
  }
`

const LinkItem = styled.li`
  margin: 0 ${ms(2)} 0 0;
  &:last-of-type {
    margin: 0;
  }
`

const HeaderLink = styled(Link)`
  &.active {
    ${StyledText} {
      font-weight: ${typography.weights.bold};
    }
  }
`

const HeaderLinkText = styled(Text)`
  font-weight: ${typography.weights.regular};
`

const HeaderSetting = styled.div`
  display: none;
  @media ${media.medium} {
    display: block;
    grid-area: settings;
    justify-self: flex-end;
    align-self: center;
  }
`

const LogoWrapper = styled.div`
  grid-area: logo;
  margin: 0 0 0 -${ms(0)};

  @media ${media.medium} {
    margin: 0 0 0 -${ms(6)};
  }
`

const LogoImage = styled.img`
  height: 80px;
  width: 80px;
  @media ${media.medium} {
    height: 140px;
    width: 140px;
  }
`

const StyledMobileHeader = styled(MobileHeader)`
  z-index: 30;
  top: 0px;
  position: relative;
  color: ${colors.textLightest};
  grid-area: settings;

  @media ${media.medium} {
    display: none;
  }
`

const Header = ({ intl }) => {
  const { headerLinks, siteTitle, headerLinksIcon } = useSiteMetadata()
  const iconSrc = headerLinksIcon
    ? useSiteImages(headerLinksIcon).fluid.src
    : null

  return (
    <HeaderWrapper>
      <HeaderNav>
        <LogoWrapper>
          <Link to={`/`} aria-label={`View home page`}>
            {iconSrc && <LogoImage src={iconSrc} alt={siteTitle} />}
          </Link>
        </LogoWrapper>
        <HeaderSetting/>
        <HeaderLinksContainer>
          {headerLinks.map((headerLink, i) => (
            <LinkItem key={`header-link-${i}`}>
              <HeaderLink
                to={headerLink.url}
                aria-label={`View ${headerLink.label} page`}
              >
                <HeaderLinkText textStyle={TextStyle.Heading2}>
                  {intl.formatMessage({ id: headerLink.label })}
                </HeaderLinkText>
              </HeaderLink>
            </LinkItem>
          ))}
        </HeaderLinksContainer>
        <StyledMobileHeader headerLinks={headerLinks} />
      </HeaderNav>
    </HeaderWrapper>
  )
}

export default injectIntl(Header)
