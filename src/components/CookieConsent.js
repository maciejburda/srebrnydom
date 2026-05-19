import { useEffect } from 'react'

const cookieConfig = {
  policies: [
    {
      id: 'analytics',
      label: 'Google Analytics',
      description:
        'Zbieramy anonimowe informacje dotyczące ruchu na stronie.',
      category: 'essential',
    },
  ],
  permissionLabels: {
    accept: 'Akceptuj',
    acceptAll: 'Zaakceptuj wszystko',
    decline: 'Odmów',
  },
  cookiePreferenceKey: 'cookie-preferences',
  header: {
    title: 'Ciasteczka na stronie',
    description:
      'Na stronie portalu wykorzystujemy pliki cookies techniczne, analityczne i marketingowe.',
  },
  cookiePolicy: {
    url: 'https://www.srebrnydom.pl/polityka-prywatnosci/',
    label: 'Czytaj więcej',
  },
}

const CookieConsent = () => {
  useEffect(() => {
    let cancelled = false
    import('cookie-though').then(mod => {
      if (cancelled) return
      mod.init(cookieConfig)
    })
    return () => {
      cancelled = true
    }
  }, [])
  return null
}

export default CookieConsent
