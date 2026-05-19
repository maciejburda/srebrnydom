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
      key: 'lato-nunito-fonts',
      href:
        'https://fonts.googleapis.com/css?family=Lato:400,700|Nunito:400,700&display=swap',
      rel: 'stylesheet',
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
