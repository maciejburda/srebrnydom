import React from 'react'
import { withPrefix } from 'gatsby'
import useSiteMetadata from '../hooks/use-site-config'

const SEO = props => {
  const { isBlogPost, path = '', lang = 'pl' } = props
  const {
    siteTitle,
    siteUrl,
    siteCover,
    siteDescription,
    twitterUsername,
  } = useSiteMetadata()

  const title = props.title
    ? `${props.title}`
    : `${siteTitle}`
  const formatedSiteUrl = siteUrl.endsWith('/')
    ? siteUrl.substring(0, siteUrl.length - 1)
    : siteUrl
  const normalizedPath = path
    ? (path.endsWith('/') ? path : `${path}/`)
    : '/'
  const imagePath = props.imageShare || props.cover || withPrefix(siteCover)
  const image = `${formatedSiteUrl}${imagePath}`
  const description = props.description || siteDescription
  const internalTranslations = (props.translations || []).filter(
    t => !t.link.startsWith('http')
  )

  return (
    <>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={formatedSiteUrl + withPrefix(normalizedPath)} />

      {internalTranslations.map(translation => (
        <link
          key={translation.hreflang}
          rel="alternate"
          hrefLang={translation.hreflang}
          href={formatedSiteUrl + withPrefix(translation.link)}
        />
      ))}

      <meta property="og:url" content={formatedSiteUrl + withPrefix(normalizedPath)} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}

export default SEO
