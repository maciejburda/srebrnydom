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
        }
      }
    }
  `)
  return result.site.siteMetadata
}

export default useSiteMetadata
