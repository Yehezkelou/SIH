/** @type {import('tailwindcss').Config} */

// Chaque token est branché sur des canaux RGB via `<alpha-value>`, ce qui rend
// les modificateurs d'opacité fonctionnels (`bg-primary/10`, `border-border/8`).
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Paliers d'opacité correspondant aux valeurs de la maquette
      // (bordures à 8 %, survol à 6 %) — absents de l'échelle par défaut.
      opacity: {
        4: '0.04',
        6: '0.06',
        8: '0.08',
        12: '0.12',
      },
      colors: {
        page: {
          DEFAULT: token('page-bg'),
          text: token('page-text'),
        },
        surface: {
          DEFAULT: token('surface'),
          text: token('surface-text'),
        },
        muted: token('muted'),
        border: token('border'),
        hover: token('hover'),
        active: {
          DEFAULT: token('active-bg'),
          text: token('active-text'),
        },
        primary: {
          DEFAULT: token('primary'),
          text: token('primary-text'),
        },
        success: { DEFAULT: token('success'), text: token('success-text') },
        info: { DEFAULT: token('info'), text: token('info-text') },
        warning: { DEFAULT: token('warning'), text: token('warning-text') },
        danger: { DEFAULT: token('danger'), text: token('danger-text') },
        neutral: { DEFAULT: token('neutral'), text: token('neutral-text') },
      },
    },
  },
  plugins: [],
};
