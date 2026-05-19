import colorDefaults from './colors'
import mediaDefaults from './media'
import typographyDefaults from './typography'
import theme from '../theme'

export const colors = { ...colorDefaults, ...(theme.colors || {}) }
export const media = { ...mediaDefaults, ...(theme.media || {}) }
export const typography = { ...typographyDefaults, ...(theme.typography || {}) }

const tokens = { colors, media, typography }
export default tokens
