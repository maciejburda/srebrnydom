import React from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Link } from 'gatsby'
import { colors } from '../tokens'

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/lato-regular-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/lato-regular-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/lato-700-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/lato-700-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/nunito-regular-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/nunito-regular-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/nunito-700-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/nunito-700-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Lato", sans-serif;
  color: ${colors.text};
  background-color: ${colors.background};
}

img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  border: 0;
}

a {
  text-decoration: none;
  color: ${colors.primary};
}

hr {
  border: 0;
  border-top: 1px solid ${colors.grey100};
  margin: 50px 0 5px 0;
}

ul,
ol {
  padding-left: 2em;
  margin: 1em 0 0 0;
}

*::selection {
  background-color: ${colors.backgroundSelection};
}
`
export const StyledLink = styled(Link)`
  box-shadow: 0 2px 0 0 ${colors.links};

  &:hover {
    filter: brightness(150%);
    box-shadow: none;
  }
`

export const Text = styled.p`
  line-height: 1.6;
  margin: 1em 0 0 0;
`

export const Bull = styled.span`
  display: inline-block;
  color: ${colors.postMetadata};
  margin: 0 4px;
  &::before {
    content: '•';
  }
`

export const ReadingTime = props => {
  if (!props.min) return null
  const ReadingTimeContainer = styled.span`
    text-transform: uppercase;
    color: ${colors.postMetadata};
  `
  return <ReadingTimeContainer>{props.min} min read</ReadingTimeContainer>
}
