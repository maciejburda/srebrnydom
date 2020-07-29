import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import styled from "styled-components"

const languageName = {
  pl: "PL",
  en: "ENG",
  de: "DE",
}

export const LanguageLink = styled.a`
  font-weight: ${props =>
    props.currentLocale === props.language ? "bold" : "normal"};
  margin-right: 1rem;
  text-decoration: none;
  cursor: pointer;
  &:last-of-type {
    margin: 0;
  }
`

const LanguageSwitch = ({className}) => {
  return (
    <div className={className}>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <LanguageLink
              key={language}
              onClick={() => changeLocale(language)}
              currentLocale={currentLocale}
              language={language}
            >
              {languageName[language]}
            </LanguageLink>
          ))
        }
      </IntlContextConsumer>
    </div>
  )
}

export default LanguageSwitch
