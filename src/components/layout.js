/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

import { Link } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1440,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        
      </div>
      <footer 
        style = {{ 
          margin: `0 auto`
        }}>
          <div
            style = {{ 
              background: `#243e50`, 
              margin: `0 auto`,
              padding: 12,
            }}>
              <div 
                style = {{ 
                  maxWidth: 1440,
                  margin: `auto`
              }}>
                <Link to="https://www.facebook.com/SrebrnyDomSwornegacie/">Strona na Facebooku</Link> <br />
              </div>
          </div>
          <div
            style = {{ 
              background: `#f6b3cd`, 
              margin: `0 auto`,
              padding: 12,
              color: `white`
          }}>
              <div 
                style = {{ 
                  maxWidth: 1440,
                  margin: `auto`
              }}>
                © srebrnydom.pl {new Date().getFullYear()} - Wszelkie prawa zastrzeżone.
              </div>
          </div>
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
