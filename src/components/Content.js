import React from 'react'
import styled from 'styled-components'
import ContentHeader from './ContentHeader'
import { colors } from '../tokens'

const ContentBody = styled.div`
  line-height: 1.65;
  text-align: justify;
  hyphens: auto;

  & > h2 {
    display: flex;
    align-items: stretch;
    gap: 12px;
    margin: 3em 0 1.6em;
    padding: 0;
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${colors.textLight};
    text-align: left;
    line-height: 1.4;
  }

  & > h2::before {
    content: '';
    flex-shrink: 0;
    width: 3px;
    background: ${colors.accent};
    border-radius: 2px;
    margin: 2px 0;
  }

  & > h3 {
    display: flex;
    align-items: stretch;
    gap: 10px;
    margin: 2.4em 0 1.2em;
    padding: 0;
    font-family: 'Lato', sans-serif;
    font-size: 0.9em;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${colors.textLight};
    text-align: left;
    line-height: 1.4;
  }

  & > h3::before {
    content: '';
    flex-shrink: 0;
    width: 2px;
    background: ${colors.accent};
    border-radius: 2px;
    margin: 2px 0;
  }

  & > p {
    margin: 1em 0 0 0;
    font-size: 1.02em;
  }

  & a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: ${colors.accent};
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    transition: text-decoration-color 200ms ease,
      text-decoration-thickness 200ms ease;

    &:hover {
      text-decoration-color: ${colors.primary};
      text-decoration-thickness: 3px;
    }

    &.gatsby-resp-image-link,
    &.gatsby-resp-image-link:hover {
      text-decoration: none;
    }
  }

  & > blockquote {
    box-sizing: border-box;
    background-color: #f7f7f7;
    border-left: 5px solid rgb(244, 213, 36);
    margin: 30px 0px;
    padding: 5px 20px;
    border-radius: 0 8px 8px 0;
  }

  & > blockquote p {
    margin: 0.8em 0;
    font-style: italic;
  }

  & .gatsby-highlight {
    border-radius: 5px;
    font-size: 15px;
    line-height: 1.7;
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;
    margin: 1.5em -1.5em;

    @media (max-width: 500px) {
      border-radius: 0;
      margin-left: -25px;
      margin-right: -25px;
    }
  }

  & .gatsby-highlight > pre {
    border: 0;
    margin: 0;
    padding: 1;
  }

  & .gatsby-highlight pre[class*='language-'] {
    float: left;
    min-width: 100%;
  }

  & .gatsby-highlight-code-line {
    background-color: ${colors.highlight_code_linebg};
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid ${colors.highlight_code_bg};
  }

  & h1 > code.language-text,
  & h2 > code.language-text,
  & h3 > code.language-text,
  & h4 > code.language-text,
  & h5 > code.language-text,
  & h6 > code.language-text,
  & a > code.language-text,
  & p > code.language-text,
  & li > code.language-text,
  & em > code.language-text,
  & strong > code.language-text {
    background: ${colors.highlight_code_oneline};
    color: #222222cc;
    padding: 0 3px;
    font-size: 0.94em;
    border-radius: 0.3rem;
    word-wrap: break-word;
  }

  & code {
    word-wrap: break-word;
  }

  & table {
    margin-top: 1em;
    border-collapse: collapse;
    border-radius: 0.5em;
    overflow: hidden;

    & th,
    & td {
      padding: 0.5em;
      background: #f7f7f7;
      border-bottom: 2px solid ${colors.white};
    }
  }
`

class Content extends React.Component {
  render() {
    const { children, date, tags, translations } = this.props

    return (
      <section>
        {(tags || date || translations) && (
          <ContentHeader date={date} tags={tags} translations={translations} />
        )}

        <ContentBody>{children}</ContentBody>
      </section>
    )
  }
}

export default Content
