/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import useSiteMetadata from "../hooks/use-site-config"
import { colors, media } from "../tokens"
import useSiteImages from "../hooks/use-site-images"

import LanguageSwitch, { LanguageLink } from "./LanguageSwitch"

const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  margin: 0 auto;
  display: block;
  width: 100%;
  z-index: 1000;
  background-color: ${colors.primaryLight};
  font-weight: 700;
  padding: 0 1rem 0 0;

  @media ${media.medium} {
    position: fixed;
    padding: 0 4rem 0 0;
  }
`

const HeaderNav = styled.nav`
  display: grid;
  grid-template-areas: "logo settings";
  grid-template-columns: 1fr auto;
  @media ${media.medium} {
    grid-template-areas:
      "logo settings"
      "logo navigation";
  }
`

const HeaderLinksContainer = styled.div`
  display: none;
  -webkit-box-align: center;
  align-items: flex-end;
  padding: 0 0 2rem 0;
  @media ${media.medium} {
    display: flex;
    grid-area: navigation;
    justify-content: flex-end;
  }
`

const HeaderLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  color: ${colors.text};
  border: 0;
  margin: 0;
  min-width: 42px;
  z-index: 10;
`

const HeaderLinkTitle = styled(HeaderLink)`
  grid-area: logo;
`

const HeaderSetting = styled.div`
  display: none;
  @media ${media.medium} {
    display: block;
    grid-area: settings;
    justify-self: flex-end;
    padding: 1rem 0 0 0;
  }
`

const HeaderImage = styled.img`
  height: 80px;
  width: 80px;
  @media ${media.medium} {
    height: 140px;
    width: 140px;
  }
`

const MobilePanel = styled.div`
  position: absolute;
  z-index: 20;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.primary};
  @media ${media.medium} {
    display: none;
  }
`

const MobileNav = styled.nav`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-evenly;
  margin: 0px auto;

  & a {
    display: flex;
    margin: 10px 0 !important;
    color: ${colors.primaryLight};
  }
`

const HeaderLinks = ({ headerLinks }) => {
  return headerLinks.map((headerLink, i) => (
    <HeaderLink
      to={headerLink.url}
      key={`header-link-${i}`}
      aria-label={`View ${headerLink.label} page`}
    >
      {headerLink.label}
    </HeaderLink>
  ))
}

const BurgerButton = styled.button`
  z-index: 30;
  top: 0px;
  position: relative;
  color: ${colors.textLightest};
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  grid-area: settings;

  @media ${media.medium} {
    display: none;
  }
`

const BurgerContent = styled.div`
  width: 24px;
  top: 30px;
  height: 2px;
  background: ${colors.textLightest};
  position: absolute;
  left: 0;
  ${props =>
    props.isToggledOn
      ? "background: transparent"
      : `background: ${colors.textLightest}`};
  transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  ::before {
    content: "";
    top: -8px;
    width: 24px;
    height: 2px;
    background: ${colors.textLightest};
    position: absolute;
    left: 0;
    ${props =>
      props.isToggledOn
        ? "transform: rotate(45deg); top: 0;"
        : "transform: rotate(0)"};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  }
  ::after {
    top: 8px;
    content: "";
    width: 24px;
    height: 2px;
    background: white;
    position: absolute;
    left: 0;
    ${props =>
      props.isToggledOn
        ? "transform: rotate(-45deg); top: 0;"
        : "transform: rotate(0)"};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  }
`

const MobileLanguageSwitch = styled(LanguageSwitch)`
  margin: 0 0 4rem 0;
  ${LanguageLink} {
    color: ${colors.primaryLight};
  }
`

const MobileHeader = ({ headerLinks }) => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)

  return (
    <>
      <BurgerButton
        onClick={toggle}
        aria-label={`${isToggledOn ? "close menu" : "open menu"}`}
      >
        <BurgerContent isToggledOn={isToggledOn} />
      </BurgerButton>
      {isToggledOn && (
        <MobilePanel>
          <MobileLanguageSwitch />
          <MobileNav>
            <HeaderLinks headerLinks={headerLinks} />
          </MobileNav>
        </MobilePanel>
      )}
    </>
  )
}

const Header = () => {
  const { headerLinks, siteTitle, headerLinksIcon } = useSiteMetadata()
  const iconSrc = headerLinksIcon
    ? useSiteImages(headerLinksIcon).fluid.src
    : null

  return (
    <HeaderWrapper>
      <HeaderNav>
        <HeaderLinkTitle to={`/`} aria-label={`View home page`}>
          {iconSrc && <HeaderImage src={iconSrc} alt={siteTitle} />}
        </HeaderLinkTitle>
        <HeaderSetting>
          <LanguageSwitch />
        </HeaderSetting>
        <HeaderLinksContainer>
          <HeaderLinks headerLinks={headerLinks} />
        </HeaderLinksContainer>
        <MobileHeader headerLinks={headerLinks} />
      </HeaderNav>
    </HeaderWrapper>
  )
}

export default Header
