const fs = require('fs')
const { createFilePath } = require('gatsby-source-filesystem')

const WORDS_PER_MINUTE = 200

const computeTimeToRead = filePath => {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const body = raw.replace(/^---[\s\S]*?---\s*/m, '')
    const words = body.match(/\S+/g) || []
    return Math.max(1, Math.round(words.length / WORDS_PER_MINUTE))
  } catch (err) {
    return 0
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const BlogPostTemplate = require.resolve('./src/templates/blog-post.js')
  const BlogPostShareImage = require.resolve(
    './scripts/templates/blog-post-share-image.js'
  )
  const PageTemplate = require.resolve('./src/templates/page.js')
  const PostsBytagTemplate = require.resolve('./src/templates/tags.js')
  const ListPostsTemplate = require.resolve(
    './src/templates/blog-list-template.js'
  )
  const GalleryTemplate = require.resolve(
    './src/templates/gallery-template.js'
  )

  const allMarkdownQuery = await graphql(`
    {
      allMarkdown: allMdx(
        sort: { frontmatter: { date: ASC } }
        filter: { frontmatter: { published: { ne: false } } }
        limit: 1000
      ) {
        edges {
          node {
            internal {
              contentFilePath
            }
            fields {
              timeToRead
            }
            frontmatter {
              title
              slug
              tags
              language
              cover {
                publicURL
              }
              unlisted
            }
            excerpt
          }
        }
      }
    }
  `)

  if (allMarkdownQuery.errors) {
    reporter.panic(allMarkdownQuery.errors)
  }

  const postPerPageQuery = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `)

  const markdownFiles = allMarkdownQuery.data.allMarkdown.edges

  const posts = markdownFiles.filter(item =>
    item.node.internal.contentFilePath.includes('/content/posts/')
  )

  const listedPosts = posts.filter(
    item => item.node.frontmatter.unlisted !== true
  )

  // generate paginated post list
  const postsPerPage = postPerPageQuery.data.site.siteMetadata.postsPerPage
  const nbPages = Math.ceil(listedPosts.length / postsPerPage)

  Array.from({ length: nbPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/pages/${i + 1}`,
      component: ListPostsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        nbPages: nbPages,
      },
    })
  })

  // generate blog posts
  posts.forEach((post, index, posts) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/blog/${post.node.frontmatter.slug}`,
      component: `${BlogPostTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
      context: {
        slug: post.node.frontmatter.slug,
        previous,
        next,
      },

    })

    // generate post share images (dev only)
    if (process.env.gatsby_executing_command.includes('develop')) {
      createPage({
        path: `${post.node.frontmatter.slug}/image_share`,
        component: `${BlogPostShareImage}?__contentFilePath=${post.node.internal.contentFilePath}`,
        context: {
          slug: post.node.frontmatter.slug,
          width: 440,
          height: 220,
        },
      })
    }
  })

  // generate pages
  markdownFiles
    .filter(item => item.node.internal.contentFilePath.includes('/content/pages/'))
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: `${PageTemplate}?__contentFilePath=${page.node.internal.contentFilePath}`,
        context: {
          slug: page.node.frontmatter.slug,
        },
      })
    })

  // generate tag page
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce(
      (acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])],
      []
    )
    .forEach(uniqTag => {
      createPage({
        path: `tags/${uniqTag}`,
        component: PostsBytagTemplate,
        context: {
          tag: uniqTag,
        },
      })
    })

  // gallery
  createPage({
    path: `galeria`,
    component: GalleryTemplate
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `Mdx` && node.internal.contentFilePath) {
    createNodeField({
      name: `timeToRead`,
      node,
      value: computeTimeToRead(node.internal.contentFilePath),
    })
  }
}
