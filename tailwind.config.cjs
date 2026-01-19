module.exports = {
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{html,js}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        brand: {
          black: '#0f172a',
          blue: '#1e40af',
          lightBlue: '#3b82f6',
          white: '#ffffff',
          gray: '#f8fafc'
        }
      }
    }
  },
  plugins: []
};
