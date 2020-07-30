import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import styled from "styled-components"
import Text, { TextStyle } from "./Text"
import { typography } from "../tokens"
import { ms } from "../styles/helpers"

const languageName = {
  pl: "PL",
  en: "ENG",
  de: "DE",
}

export const LanguageLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`

const StyledText = styled(Text)`
  font-weight: ${props =>
    props.isActive ? typography.weights.bold : typography.weights.regular};
`

const Container = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`

const Item = styled.li`
  margin-right: ${ms(0)};
  &:last-of-type {
    margin: 0;
  }
`

const LanguageSwitch = ({ className, textColor }) => {
  return (
    <Container className={className}>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <Item>
              <LanguageLink
                key={language}
                onClick={() => changeLocale(language)}
              >
                <StyledText
                  textStyle={TextStyle.LabelDefault}
                  isActive={currentLocale === language}
                  color={textColor}
                >
                  {languageName[language]}
                </StyledText>
              </LanguageLink>
            </Item>
          ))
        }
      </IntlContextConsumer>
    </Container>
  )
}

export default LanguageSwitch
