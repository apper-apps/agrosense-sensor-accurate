/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E8',
          100: '#C8E6C8',
          500: '#2E7D32',
          600: '#2E7D32',
          700: '#1B5E20',
        },
        secondary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#1565C0',
          600: '#1565C0',
          700: '#0D47A1',
        },
        accent: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          500: '#FF6F00',
          600: '#FF6F00',
          700: '#E65100',
        },
        success: '#43A047',
        warning: '#FFA726',
        error: '#E53935',
        info: '#29B6F6',
        surface: '#FFFFFF',
        background: '#F5F7FA',
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}