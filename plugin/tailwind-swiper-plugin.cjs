const plugin = require('tailwindcss/plugin');

/**
 * TailwindCSS Swiper Custom Styling Plugin
 * Adds sleek modern styling presets for Swiper.js pagination, navigation, and scrollbars.
 */
module.exports = plugin(function({ addComponents, addUtilities, theme }) {
  addComponents({
    // Navigation Styling (Beautiful circular glassmorphic controls)
    '.swiper-button-prev, .swiper-button-next': {
      color: 'var(--swiper-navigation-color, var(--swiper-theme-color, #3b82f6))',
      width: '2rem !important',
      height: '2rem !important',
      '@media (min-width: 640px)': {
        width: '3.25rem !important',
        height: '3.25rem !important',
      },
      backgroundColor: 'rgba(15, 23, 42, 0.75) !important',
      backdropFilter: 'blur(12px) !important',
      WebkitBackdropFilter: 'blur(12px) !important',
      border: '1px solid rgba(255, 255, 255, 0.12) !important',
      borderRadius: '9999px !important',
      boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
      '&:hover': {
        transform: 'scale(1.1) !important',
        backgroundColor: 'rgba(30, 41, 59, 0.95) !important',
        borderColor: 'rgba(255, 255, 255, 0.25) !important',
        boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.6), 0 0 16px -2px var(--swiper-theme-color, rgba(59, 130, 246, 0.5))',
      },
      '&::after': {
        fontSize: '1.1rem !important',
        fontWeight: '800 !important',
      },
      'svg, .swiper-navigation-icon': {
        width: '12px !important',
        height: 'auto !important',
        maxHeight: '20px !important',
        fill: 'currentColor !important',
        color: 'currentColor !important',
        display: 'block !important',
        margin: 'auto !important',
        transition: 'transform 0.2s ease !important',
      },
    },
    
    // Positioning & SVG orientation adjustment
    '.swiper-button-prev': {
      left: '0.75rem !important',
      'svg, .swiper-navigation-icon': {
        transform: 'rotate(180deg) !important',
      },  
    },
    '.swiper-button-next': {
      right: '0.75rem !important',
      'svg, .swiper-navigation-icon': {
        transform: 'rotate(0deg) !important',
      },
    },

    // Disabled navigation state
    '.swiper-button-disabled': {
      opacity: '0.2 !important',
      cursor: 'not-allowed !important',
      pointerEvents: 'none !important',
      transform: 'scale(0.9) !important',
      boxShadow: 'none !important',
    },
    
    // Pagination Bullets (Pill morphing style with glowing active indicator)
    '.swiper-pagination-bullet': {
      backgroundColor: 'var(--swiper-pagination-color, var(--swiper-theme-color, #3b82f6)) !important',
      opacity: '0.35 !important',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important',
      width: '0.5rem !important',
      height: '0.5rem !important',
      borderRadius: '9999px !important',
      outline: 'none !important',
    },
    
    '.swiper-pagination-bullet-active': {
      opacity: '1 !important',
      width: '1.75rem !important', // Morphing pill effect
      backgroundColor: 'var(--swiper-pagination-color, var(--swiper-theme-color, #3b82f6)) !important',
      boxShadow: '0 0 12px var(--swiper-pagination-color, var(--swiper-theme-color, rgba(59, 130, 246, 0.6))) !important',
    },
    
    // Fraction pagination
    '.swiper-pagination-fraction': {
      color: '#f8fafc !important',
      fontSize: '0.8rem !important',
      fontWeight: '600 !important',
      letterSpacing: '0.05em',
      backgroundColor: 'rgba(15, 23, 42, 0.8) !important',
      backdropFilter: 'blur(8px) !important',
      WebkitBackdropFilter: 'blur(8px) !important',
      padding: '4px 14px !important',
      borderRadius: '9999px !important',
      width: 'auto !important',
      left: '50% !important',
      transform: 'translateX(-50%)',
      bottom: '1.25rem !important',
      border: '1px solid rgba(255, 255, 255, 0.12) !important',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
    
    // Progressbar pagination
    '.swiper-pagination-progressbar': {
      backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
      height: '4px !important',
      '.swiper-pagination-progressbar-fill': {
        backgroundColor: 'var(--swiper-pagination-color, var(--swiper-theme-color, #3b82f6)) !important',
        boxShadow: '0 0 10px var(--swiper-pagination-color, var(--swiper-theme-color, #3b82f6))',
      },
    },
    
    // Scrollbar styling
    '.swiper-scrollbar': {
      backgroundColor: 'rgba(255, 255, 255, 0.08) !important',
      height: '5px !important',
      borderRadius: '9999px !important',
      bottom: '4px !important',
      '.swiper-scrollbar-drag': {
        backgroundColor: 'var(--swiper-scrollbar-color, var(--swiper-theme-color, #3b82f6)) !important',
        borderRadius: '9999px !important',
        '&:hover': {
          backgroundColor: 'var(--swiper-theme-color, #60a5fa) !important',
        }
      },
    },

    // 3D Coverflow slide size constraints to ensure proper proportioning
    '.swiper-effect-coverflow': {
      paddingTop: '0.75rem !important',
      paddingBottom: '2.5rem !important',
    },
    '.swiper-effect-coverflow .swiper-slide': {
      width: '260px !important',
      maxWidth: '85vw !important',
      '@media (min-width: 640px)': {
        width: '200px !important',
      },
    }
  });

  // Inject CSS Variables for color overrides based on Tailwind theme values
  const utilities = {
    '.swiper-theme-primary': {
      '--swiper-theme-color': theme('colors.blue.500', '#3b82f6'),
    },
    '.swiper-theme-emerald': {
      '--swiper-theme-color': theme('colors.emerald.500', '#10b981'),
    },
    '.swiper-theme-rose': {
      '--swiper-theme-color': theme('colors.rose.500', '#f43f5e'),
    },
    '.swiper-theme-violet': {
      '--swiper-theme-color': theme('colors.violet.500', '#8b5cf6'),
    },
    '.swiper-theme-amber': {
      '--swiper-theme-color': theme('colors.amber.500', '#f59e0b'),
    },
    '.swiper-theme-indigo': {
      '--swiper-theme-color': theme('colors.indigo.500', '#6366f1'),
    },
    '.swiper-theme-slate': {
      '--swiper-theme-color': theme('colors.slate.400', '#94a3b8'),
    },
  };
  
  addUtilities(utilities);
});

