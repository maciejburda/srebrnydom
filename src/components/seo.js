import React from 'react'
import { withPrefix } from 'gatsby'
import useSiteMetadata from '../hooks/use-site-config'

const ALL_DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday',
]

const buildLocalBusinessSchema = (business, siteUrl, siteTitle, imageUrl) => {
  if (!business) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'NursingHome',
    '@id': `${siteUrl}#nursinghome`,
    name: siteTitle,
    legalName: business.legalName,
    url: siteUrl,
    image: imageUrl,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    foundingDate: business.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ALL_DAYS,
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: business.sameAs || [],
    areaServed: (business.areaServed || []).map(a => ({
      '@type': a.type,
      name: a.name,
    })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      identifier: business.licenseNumber,
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: business.licenseAuthority,
      },
    },
  }
}

const buildOrganizationSchema = (business, siteUrl, siteTitle, imageUrl) => {
  if (!business) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: business.legalName || siteTitle,
    url: siteUrl,
    logo: imageUrl,
    foundingDate: business.foundingDate,
    sameAs: business.sameAs || [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.telephone,
      contactType: 'reservations',
      email: business.email,
      availableLanguage: ['pl', 'en'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ALL_DAYS,
        opens: '09:00',
        closes: '17:00',
      },
    },
  }
}

const buildBreadcrumbSchema = (path, siteUrl, siteTitle) => {
  // Build a trail from path segments. Skip empty segments and the
  // root itself. For `/blog/foo/` → [Home, Blog, Foo].
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return null

  const humanize = slug =>
    slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: siteTitle,
      item: siteUrl,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: humanize(segment),
      item: `${siteUrl}/${segments.slice(0, index + 1).join('/')}/`,
    })),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

const buildArticleSchema = ({
  title,
  description,
  imageUrl,
  url,
  datePublished,
  tags,
  business,
  siteUrl,
  siteTitle,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: imageUrl,
  url,
  datePublished,
  author: {
    '@type': 'Organization',
    name: business?.legalName || siteTitle,
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: business?.legalName || siteTitle,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
  },
  keywords: (tags || []).join(', '),
  inLanguage: 'pl',
})

const SEO = props => {
  const {
    isBlogPost,
    path = '',
    lang = 'pl',
    articleDate,
    articleTags,
  } = props
  const {
    siteTitle,
    siteUrl,
    siteCover,
    siteDescription,
    twitterUsername,
    business,
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

      {business && (
        <script type="application/ld+json">
          {JSON.stringify(buildLocalBusinessSchema(business, formatedSiteUrl, siteTitle, image))}
        </script>
      )}
      {business && (
        <script type="application/ld+json">
          {JSON.stringify(buildOrganizationSchema(business, formatedSiteUrl, siteTitle, image))}
        </script>
      )}
      {normalizedPath !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema(normalizedPath, formatedSiteUrl, siteTitle))}
        </script>
      )}
      {isBlogPost && articleDate && (
        <script type="application/ld+json">
          {JSON.stringify(buildArticleSchema({
            title,
            description,
            imageUrl: image,
            url: formatedSiteUrl + withPrefix(normalizedPath),
            datePublished: articleDate,
            tags: articleTags,
            business,
            siteUrl: formatedSiteUrl,
            siteTitle,
          }))}
        </script>
      )}
    </>
  )
}

export default SEO
