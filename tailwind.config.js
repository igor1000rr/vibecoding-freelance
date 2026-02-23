/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Deep space backgrounds
        void: '#0a0a0f',
        'deep-space': '#0d0d1a',
        nebula: '#12121f',
        'nebula-light': '#1a1a2e',
        'nebula-lighter': '#222240',
        // Gold system
        gold: {
          DEFAULT: '#ffd700',
          warm: '#f4a836',
          pale: '#ffe066',
          dim: '#b8960f',
          50: 'rgba(255, 215, 0, 0.05)',
          100: 'rgba(255, 215, 0, 0.1)',
          200: 'rgba(255, 215, 0, 0.2)',
          300: 'rgba(255, 215, 0, 0.3)',
          400: 'rgba(255, 215, 0, 0.4)',
        },
        // Neon accents
        neon: {
          cyan: '#00f5ff',
          magenta: '#ff00ff',
          violet: '#8b5cf6',
          emerald: '#00ff88',
          rose: '#ff3366',
        },
        // Text
        heading: '#f0f0f5',
        body: '#b0b0c0',
        muted: '#6b6b80',
        light: '#4a4a5a',
        // Legacy compat
        primary: {
          DEFAULT: '#ffd700',
          hover: '#ffe033',
          light: 'rgba(255, 215, 0, 0.15)',
          50: 'rgba(255, 215, 0, 0.05)',
        },
        'bg-gray': '#0d0d1a',
        'bg-muted': '#12121f',
        accent: {
          blue: '#00f5ff',
          amber: '#ffd700',
          rose: '#ff3366',
          violet: '#8b5cf6',
          emerald: '#00ff88',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255, 215, 0, 0.15)',
        hover: 'rgba(255, 215, 0, 0.3)',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 215, 0, 0.1)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.15)',
        header: '0 1px 3px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 215, 0, 0.1)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2)',
        'glow-gold-lg': '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3), 0 0 90px rgba(255, 215, 0, 0.1)',
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.3), 0 0 40px rgba(0, 245, 255, 0.15)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        'aura-pulse': 'auraPulse 3s ease-in-out infinite',
        'spiral-rotate': 'spiralRotate 20s linear infinite',
        'float-particle': 'floatParticle 8s ease-in-out infinite',
        'quantum-shimmer': 'quantumShimmer 3s linear infinite',
        'glow-breathe': 'glowBreathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(15px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        auraPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255,215,0,0.3)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 60px rgba(255,215,0,0.5)', transform: 'scale(1.02)' },
        },
        spiralRotate: {
          to: { transform: 'rotate(360deg)' },
        },
        floatParticle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        quantumShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'sacred-geometry': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3Ccircle cx='50' cy='30' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3Ccircle cx='67.3' cy='40' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3Ccircle cx='67.3' cy='60' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3Ccircle cx='50' cy='70' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3Ccircle cx='32.7' cy='60' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3Ccircle cx='32.7' cy='40' r='20' fill='none' stroke='%23ffd700' stroke-width='0.3' opacity='0.08'/%3E%3C/svg%3E")`,
        'hex-grid': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 115.47'%3E%3Cpolygon fill='none' stroke='%23ffd700' stroke-width='0.5' opacity='0.06' points='50 0 100 28.87 100 86.6 50 115.47 0 86.6 0 28.87'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
};
