import React, { useState } from "react"
import { colors, media, typography } from "../tokens"
import styled from "styled-components"
import LanguageSwitch from "./LanguageSwitch"
import { ms } from "../styles/helpers"
import Text, { StyledText, TextStyle } from "./Text"
import Link from "./Link"
import { injectIntl } from "gatsby-plugin-intl"

const MobilePanel = styled.div`
  position: absolute;
  z-index: 20;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${colors.primary};
  @media ${media.medium} {
    display: none;
  }
`

const MobilePanelWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const MobileNav = styled.nav`
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: ${ms(2)};
  align-items: center;
`

const BurgerButton = styled.button`
  color: ${colors.textLightest};
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
`

const BurgerContent = styled.div`
  width: 24px;
  top: 30px;
  height: 2px;
  background: ${colors.text};
  position: absolute;
  left: 0;
  ${props =>
    props.isToggledOn
      ? "background: transparent"
      : `background: ${colors.text}`};
  transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  ::before {
    content: "";
    top: -8px;
    width: 24px;
    height: 2px;
    background: ${props =>
      props.isToggledOn ? colors.textLightest : colors.text};
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
    background: ${props =>
      props.isToggledOn ? colors.textLightest : colors.text};
    position: absolute;
    left: 0;
    ${props =>
      props.isToggledOn
        ? "transform: rotate(-45deg); top: 0;"
        : "transform: rotate(0)"};
    transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
  }
`

const StyledLanguageSwitch = styled(LanguageSwitch)`
  margin: 0 0 ${ms(4)} 0;
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

const MobileHeader = ({ headerLinks, className, intl }) => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)

  return (
    <>
      <BurgerButton
        className={className}
        onClick={toggle}
        aria-label={`${isToggledOn ? "close menu" : "open menu"}`}
      >
        <BurgerContent isToggledOn={isToggledOn} />
      </BurgerButton>
      {isToggledOn && (
        <MobilePanel>
          <MobilePanelWrapper>
            <StyledLanguageSwitch textColor={colors.textLightest} />
            <MobileNav>
              {headerLinks.map((headerLink, i) => (
                <HeaderLink
                  to={headerLink.url}
                  key={`header-link-${i}`}
                  aria-label={`View ${headerLink.label} page`}
                >
                  <HeaderLinkText
                    textStyle={TextStyle.Heading2}
                    color={colors.textLightest}
                  >
                    {intl.formatMessage({ id: headerLink.label })}

                  </HeaderLinkText>
                </HeaderLink>
              ))}
              }
            </MobileNav>
          </MobilePanelWrapper>
        </MobilePanel>
      )}
    </>
  )
}

export default injectIntl(MobileHeader)
