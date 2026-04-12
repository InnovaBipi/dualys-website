import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // Dualys Brand Colors (Official Guidelines 2026)
        // Distribution: 40% black, 40% white, 20% blue accent
        primary: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#808080',
          500: '#000000', // Main brand black
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        accent: {
          50: '#EEF0FD',
          100: '#D8DBFB',
          200: '#B5BBFA',
          300: '#8F97F4',
          400: '#6B77EE',
          500: '#4F61E7', // Pantone 2132 C - The blue "y"
          600: '#3D4FD6',
          700: '#2D3EC0',
          800: '#1E2EA8',
          900: '#111E8C',
          950: '#091268',
        },
        neutral: {
          50: '#F7F8FA',  // Figma neutral02 (blue-tinted)
          100: '#ECEEF3', // Figma neutral03
          200: '#D5D9E4', // Figma neutral04
          300: '#B0B6C8', // Figma neutral05
          400: '#7E86A0', // Figma neutral06
          500: '#555D78', // Figma neutral07
          600: '#3A4157', // Figma neutral08
          700: '#252B3E', // Figma neutral09
          800: '#161928', // Figma neutral10
          900: '#080B15', // Figma neutral11
          950: '#010203', // Figma neutral12
        },
        // Semantic colors
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
      },
      fontFamily: {
        // Body text - Inter (Google Fonts)
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Headings - Outfit (Google Fonts) as TOSH A alternative
        // Geometric sans-serif with similar weight range and characteristics
        display: ['var(--font-outfit)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    function({ addComponents }: { addComponents: (components: Record<string, Record<string, string | Record<string, string>>>) => void }) {
      addComponents({
        // Apply to grid container - ensures items stretch
        '.card-grid': {
          '& > *': {
            height: '100%',
          },
        },
        // Apply to card element for flex layout
        '.card-equal': {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
        // Apply to card body/description for flex grow
        '.card-body-grow': {
          flexGrow: '1',
        },
      })
    }
  ],
};

export default config;
