import React from 'react'

const baseProps = (size = 24, extra = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...extra,
})

const brandProps = (size = 24, extra = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
  ...extra,
})

export const MapPin = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const Phone = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.36 1.77.7 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.27a2 2 0 0 1 2.11-.45c.84.34 1.71.57 2.61.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const Mail = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
)

export const Clock = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export const Tag = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

export const ChevronLeft = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const ChevronRight = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const ChevronDown = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const Heart = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const Stethoscope = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M6 3v6a4 4 0 0 0 8 0V3" />
    <path d="M6 3h2" />
    <path d="M12 3h2" />
    <path d="M10 13v4a4 4 0 0 0 8 0v-1" />
    <circle cx="18" cy="14" r="2" />
  </svg>
)

export const Activity = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

export const Home = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
  </svg>
)

export const Leaf = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 9-10 1-.2 2 .2 2 1 0 8-4 16-4 16z" />
    <path d="M4 20 14 10" />
  </svg>
)

export const User = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const Calendar = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
)

export const Armchair = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
    <path d="M5 18v2" />
    <path d="M19 18v2" />
  </svg>
)

export const PineTree = ({ size, ...rest }) => (
  <svg {...baseProps(size, rest)}>
    <path d="M12 3 7 10h3l-4 6h4l-4 5h12l-4-5h4l-4-6h3z" />
    <path d="M12 21v2" />
  </svg>
)

export const Facebook = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
)

export const Linkedin = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export const Twitter = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export const Instagram = ({ size, ...rest }) => (
  <svg {...brandProps(size, rest)}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)
