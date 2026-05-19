import { useEffect } from 'react'

const POLICY_ID = 'analytics-marketing'

const cookieConfig = {
  policies: [
    {
      id: POLICY_ID,
      label: 'Analityka i marketing',
      description:
        'Zezwala na zbieranie anonimowych statystyk ruchu (Google Analytics) oraz mierzenie skuteczności reklam (Google Ads).',
      category: 'statistics',
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

const ALL_SIGNALS = [
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'analytics_storage',
]

const buildConsentUpdate = preferences => {
  const policy =
    preferences &&
    preferences.cookieOptions &&
    preferences.cookieOptions.find(p => p.id === POLICY_ID)
  const value = policy && policy.isEnabled ? 'granted' : 'denied'
  return ALL_SIGNALS.reduce((acc, key) => ({ ...acc, [key]: value }), {})
}

const pushUpdate = preferences => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', buildConsentUpdate(preferences))
}

const CookieConsent = () => {
  useEffect(() => {
    let cancelled = false
    import('cookie-though').then(mod => {
      if (cancelled) return
      mod.init(cookieConfig)

      try {
        pushUpdate(mod.getPreferences())
      } catch (_) {
        // No stored preferences yet — banner will collect them.
      }

      mod.onPreferencesChanged(pushUpdate)
    })
    return () => {
      cancelled = true
    }
  }, [])
  return null
}

export default CookieConsent
