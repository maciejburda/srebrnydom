import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Nie znaleziono strony</h1>
    <p>Nic znaleziono strony, której szukasz.</p>
  </Layout>
)

export default NotFoundPage
