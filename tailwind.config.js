/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'brand-green': '#004734',
        'brand-green-light': '#006B50',
        'legacy-gold': '#EAB308',
        'deep-forest': '#0F172A',
        'cloud-white': '#FFFFFF',
        'mist-gray': '#F8FAFC',
        'success': { DEFAULT: '#059669', light: '#10b981', bg: '#ECFDF5', text: '#065F46' },
        'warning': { DEFAULT: '#D97706', light: '#F59E0B', bg: '#FFFBEB', text: '#92400E' },
        'error':   { DEFAULT: '#DC2626', light: '#EF4444', bg: '#FEF2F2', text: '#991B1B' },
        'info':    { DEFAULT: '#2563EB', light: '#3B82F6', bg: '#EFF6FF', text: '#1E40AF' }
      },
      fontFamily: {
        'serif': ['DM Serif Display', 'serif'],
        'sans':  ['Poppins', 'sans-serif']
      }
    }
  }
};
