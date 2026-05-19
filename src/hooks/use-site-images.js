import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

const useSiteImages = imageName => {
  const result = useStaticQuery(graphql`
    {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            relativePath
            publicURL
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, quality: 100)
            }
          }
        }
      }
    }
  `)
  const items = result.allFile.edges
  const image = items.find(edge => edge.node.relativePath === imageName)
  if (image === undefined) {
    throw new Error(`Unable to find image: ${imageName} (in content/images)`)
  }
  const src = image.node.publicURL
  return {
    fluid: { src },
    fixed: { src },
    gatsbyImageData: getImage(image.node.childImageSharp),
  }
}

export default useSiteImages
