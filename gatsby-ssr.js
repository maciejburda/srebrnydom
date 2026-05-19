const React = require('react')

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
