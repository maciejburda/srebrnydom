// gatsby-browser.js
// Global click delegate that turns tel: and mailto: clicks into
// GA4 events and Google Ads conversion events. Mounted once per
// page load; no per-component wiring needed.

const fireGtagEvent = (eventName, params) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', eventName, params)
}

const handleClick = event => {
  // Walk up to find the nearest <a> — handles clicks on children
  // of the anchor (e.g. inline <strong> inside the link text).
  let node = event.target
  while (node && node !== document.body && node.tagName !== 'A') {
    node = node.parentNode
  }
  if (!node || node.tagName !== 'A') return

  const href = node.getAttribute('href') || ''
  const linkText = (node.textContent || '').trim().slice(0, 100)

  if (href.startsWith('tel:')) {
    fireGtagEvent('phone_click', {
      phone_number: href.replace('tel:', ''),
      link_text: linkText,
      event_category: 'engagement',
    })
  } else if (href.startsWith('mailto:')) {
    fireGtagEvent('email_click', {
      email: href.replace('mailto:', '').split('?')[0],
      link_text: linkText,
      event_category: 'engagement',
    })
  }
}

export const onClientEntry = () => {
  if (typeof document === 'undefined') return
  document.addEventListener('click', handleClick, { capture: true })
}

export { wrapRootElement } from './wrap-root-element'
