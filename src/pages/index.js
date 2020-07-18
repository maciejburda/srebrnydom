import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>Tu powstaje strona internetowa domu seniora Srebrny Dom w miejscowości Swornegacie.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="https://www.facebook.com/SrebrnyDomSwornegacie/">Strona na Facebooku</Link> <br />
  </Layout>
)

export default IndexPage