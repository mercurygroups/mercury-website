module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './**/*.{html,tsx,ts,jsx,js}'
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
