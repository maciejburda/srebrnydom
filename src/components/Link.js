import React  from 'react'
import { Link as GatsbyLink } from "gatsby-plugin-intl"
import styled, { css } from 'styled-components'

const linkCSS = css`
  text-decoration: none;
  color: inherit;
`

const ExternalLink = styled.a`
  ${linkCSS}
`

const InternalLink = styled(GatsbyLink)`
  ${linkCSS}
`

const Link = ({ to, children, className, external }) => {
  return external ? (
    <ExternalLink href={to} target={'_blank'} className={className}>
      {children}
    </ExternalLink>
  ) : (
    <InternalLink to={to} className={className}  activeClassName={'active'}>
      {children}
    </InternalLink>
  )
}

export default Link
