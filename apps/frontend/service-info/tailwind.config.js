/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
        },
        teal: { DEFAULT: 'var(--accent-teal)' },
        amber: { DEFAULT: 'var(--accent-amber)' },
        link: 'var(--link)',
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--text-muted)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      backgroundImage: {
        sidebar: 'linear-gradient(180deg, var(--sidebar-from) 0%, var(--sidebar-to) 100%)',
        promo: 'linear-gradient(135deg, var(--brand-400) 0%, var(--accent-teal) 100%)',
      },
    },
  },
  plugins: [],
};
