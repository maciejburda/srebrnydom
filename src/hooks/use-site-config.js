import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteUrl
          siteCover
          trees
          comfort
          doctor
          health24
          nature
          physio
          authorName
          authorAvatar
          homepageImage
          authorDescription
          siteDescription
          twitterUsername
          disqusShortname
          disqusSiteUrl
          defaultLang
          headerTitle
          headerLinksIcon
          footerLinksIcon
          headerLinks {
            label
            url
          }
          websiteHost {
            name
            url
          }
          footerLinks {
            sectionName
            links {
              label
              url
            }
          }
          business {
            legalName
            streetAddress
            postalCode
            addressLocality
            addressRegion
            addressCountry
            latitude
            longitude
            telephone
            secondaryTelephone
            email
            priceRange
            foundingDate
            openingHours
            bookingHours
            licenseNumber
            licenseAuthority
            sameAs
            areaServed {
              name
              type
            }
          }
        }
      }
    }
  `)
  return result.site.siteMetadata
}

export default useSiteMetadata
