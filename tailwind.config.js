/** @type {import('tailwindcss/types').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./assets/**/*.scss",
    "./assets/**/*.css",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['clanpro-medium', ...defaultTheme.fontFamily.sans],
        clanproBook:['clanpro-book'],
        clanproMedium:['clanpro-medium'],
        clanproNarrnews:['clanpro-narrnews'],
        montserratRegular:['montserrat-regular'],
      },
      colors: { 
        danger: colors.rose,
        success: colors.green,
        warning: colors.yellow,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }){
      const newUtilities = {
          '.safe-top' : {
              paddingTop: 'constant(safe-area-inset-top)',
              paddingTop: 'env(safe-area-inset-top)'
          },
          '.safe-left' : {
              paddingLeft: 'constant(safe-area-inset-left)',
              paddingLeft: 'env(safe-area-inset-left)'
          },
          '.safe-right' : {
              paddingRight: 'constant(safe-area-inset-right)',
              paddingRight: 'env(safe-area-inset-right)'
          },
          '.safe-bottom' : {
              paddingBottom: 'constant(safe-area-inset-bottom)',
              paddingBottom: 'env(safe-area-inset-bottom)'
          },
          '.disable-scrollbars' : {
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              '&::-webkit-scrollbar' : {
                  width: '0px',
                  background: 'transparent',
                  display: 'none'
              },
              '& *::-webkit-scrollbar' : {
                  width: '0px',
                  background: 'transparent',
                  display: 'none'
              },
              '& *' : {
                  scrollbarWidth: 'none',
                  '-ms-overflow-style': 'none'
              }
          },
              '.no-tap-highlighting': {
              'webkit-tap-highlight-color': 'rgba(0,0,0,0)'
          }
      }

      addUtilities( newUtilities );
  }),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
};
