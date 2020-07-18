import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#eff5fa`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1440,
        overflow: `hidden`
      }}
    >
        <div 
          style={{ 
            width: `140px`, 
            float: `left` 
          }}
          > <Image />
        </div>
        <div style={{ float: `right` }}>
        <SEO title="Menu" />
          <ul>
            <li><Link to="/">Strona Główna</Link></li>
            <li><Link to="/">Blog</Link></li>
          </ul>
        </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
