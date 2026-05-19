const React = require('react')

const CONSENT_DEFAULT_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);`

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'preload-lato-regular-latin',
      rel: 'preload',
      href: '/fonts/lato-regular-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'preload-lato-regular-latin-ext',
      rel: 'preload',
      href: '/fonts/lato-regular-latin-ext.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'preload-nunito-regular-latin',
      rel: 'preload',
      href: '/fonts/nunito-regular-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
    React.createElement('link', {
      key: 'preload-nunito-regular-latin-ext',
      rel: 'preload',
      href: '/fonts/nunito-regular-latin-ext.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    }),
  ])
}

// Prepend the consent default script so it executes before
// gatsby-plugin-google-gtag's loader.
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const head = getHeadComponents()
  const consentScript = React.createElement('script', {
    key: 'gtag-consent-default',
    dangerouslySetInnerHTML: { __html: CONSENT_DEFAULT_SCRIPT },
  })
  replaceHeadComponents([consentScript, ...head])
}

exports.wrapRootElement = require('./wrap-root-element').wrapRootElement
