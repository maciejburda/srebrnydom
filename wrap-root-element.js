import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CookieSettingsButton from './src/components/CookieSettingsButton'

const shortcodes = { CookieSettingsButton }

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={shortcodes}>{element}</MDXProvider>
)
