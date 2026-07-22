/**
 * TailwindCSS Swiper Auto-Initializer
 * Auto-detects Swiper elements and parses configuration options from class names.
 */

// Mapping of Tailwind spacing values (e.g. space-x-4 -> 16px)
const TAILWIND_SPACING: Record<string, number> = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '28': 112,
  '32': 128,
};

// Tailwind breakpoints mapping
const TAILWIND_BREAKPOINTS: Record<string, number> = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

interface BreakpointConfig {
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  centeredSlides?: boolean;
}

/**
 * Parses class list to generate Swiper configuration
 * @param element The Swiper container element
 * @param customModules Optional array of Swiper modules to attach
 * @returns Swiper options
 */
export function parseSwiperClasses(element: HTMLElement, customModules?: any[]) {
  const classes = Array.from(element.classList);
  
  // Default values
  let loop = false;
  let speed = 300;
  let slidesPerView: number | 'auto' = 1;
  let spaceBetween = 0;
  let centeredSlides = false;
  let effect = 'slide';
  let direction: 'horizontal' | 'vertical' = 'horizontal';
  let mousewheel = false;
  let keyboard = false;
  
  // Autoplay config
  let autoplayEnabled = false;
  let autoplayDelay = 3000;
  let autoplayDisableOnInteraction = false;
  let autoplayPauseOnMouseEnter = false;
  let autoplayStopOnLastSlide = false;
  
  // Responsive breakpoints accumulator
  const breakpoints: Record<number, BreakpointConfig> = {};

  // Utility to parse slidesPerView value
  const parseSlidesValue = (val: string): number | 'auto' => {
    if (val === 'auto') return 'auto';
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 1 : parsed;
  };

  // Utility to parse spacing value
  const parseSpaceValue = (val: string): number => {
    if (TAILWIND_SPACING[val] !== undefined) {
      return TAILWIND_SPACING[val];
    }
    const parsed = parseInt(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  classes.forEach(cls => {
    // 1. Check for responsive classes (e.g. md:swiper-slides-per-view-3)
    if (cls.includes(':')) {
      const parts = cls.split(':');
      const bp = parts[parts.length - 2];
      const classPart = parts[parts.length - 1];
      const bpWidth = TAILWIND_BREAKPOINTS[bp];
      
      if (bpWidth) {
        if (!breakpoints[bpWidth]) breakpoints[bpWidth] = {};

        if (classPart.startsWith('swiper-slides-per-view-')) {
          const val = classPart.replace('swiper-slides-per-view-', '');
          breakpoints[bpWidth].slidesPerView = parseSlidesValue(val);
        } else if (classPart.startsWith('swiper-space-x-')) {
          const val = classPart.replace('swiper-space-x-', '');
          breakpoints[bpWidth].spaceBetween = parseSpaceValue(val);
        } else if (classPart === 'swiper-centered') {
          breakpoints[bpWidth].centeredSlides = true;
        } else if (classPart === 'swiper-not-centered') {
          breakpoints[bpWidth].centeredSlides = false;
        }
      }
      return;
    }

    // 2. Parse standard classes
    if (cls === 'swiper-loop') {
      loop = true;
    } else if (cls.startsWith('swiper-speed-')) {
      speed = parseInt(cls.replace('swiper-speed-', '')) || 300;
    } else if (cls.startsWith('swiper-slides-per-view-')) {
      const val = cls.replace('swiper-slides-per-view-', '');
      slidesPerView = parseSlidesValue(val);
    } else if (cls.startsWith('swiper-space-x-')) {
      const val = cls.replace('swiper-space-x-', '');
      spaceBetween = parseSpaceValue(val);
    } else if (cls === 'swiper-centered') {
      centeredSlides = true;
    } else if (cls === 'swiper-mousewheel') {
      mousewheel = true;
    } else if (cls === 'swiper-keyboard') {
      keyboard = true;
    } else if (cls.startsWith('swiper-direction-')) {
      direction = cls.replace('swiper-direction-', '') === 'vertical' ? 'vertical' : 'horizontal';
    } else if (cls.startsWith('swiper-effect-')) {
      effect = cls.replace('swiper-effect-', '');
    }

    // Autoplay parsing
    if (cls === 'swiper-autoplay') {
      autoplayEnabled = true;
    } else if (cls.startsWith('swiper-autoplay-delay-')) {
      autoplayEnabled = true;
      autoplayDelay = parseInt(cls.replace('swiper-autoplay-delay-', '')) || 3000;
    } else if (cls === 'swiper-autoplay-pause') {
      autoplayEnabled = true;
      autoplayPauseOnMouseEnter = true;
    } else if (cls === 'swiper-autoplay-stop-last') {
      autoplayEnabled = true;
      autoplayStopOnLastSlide = true;
    } else if (cls === 'swiper-autoplay-interactive') {
      autoplayEnabled = true;
      autoplayDisableOnInteraction = false;
    } else if (cls === 'swiper-autoplay-no-interactive') {
      autoplayEnabled = true;
      autoplayDisableOnInteraction = true;
    }
  });

  // Base options configuration
  const options: any = {
    loop,
    speed,
    slidesPerView,
    spaceBetween,
    centeredSlides,
    effect,
    direction,
  };

  // Keyboard & Mousewheel
  if (keyboard) options.keyboard = { enabled: true };
  if (mousewheel) options.mousewheel = { forceToAxis: true };

  // Autoplay configuration
  if (autoplayEnabled) {
    options.autoplay = {
      delay: autoplayDelay,
      disableOnInteraction: autoplayDisableOnInteraction,
      pauseOnMouseEnter: autoplayPauseOnMouseEnter,
      stopOnLastSlide: autoplayStopOnLastSlide,
    };
  }

  // Effect-specific settings (enhance card/coverflow/fade/cube/flip/creative configurations & sanitize spacing)
  if (effect === 'fade') {
    options.spaceBetween = 0;
    options.slidesPerView = 1;
    delete options.breakpoints;
    options.fadeEffect = {
      crossFade: true,
    };
  } else if (effect === 'coverflow') {
    options.spaceBetween = 0;
    options.centeredSlides = true;
    options.slidesPerView = 'auto';
    delete options.breakpoints;
    options.coverflowEffect = {
      rotate: 45,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    };
  } else if (effect === 'cards') {
    options.spaceBetween = 0;
    options.slidesPerView = 1;
    options.loop = false; // Cards effect requires loop: false in Swiper
    delete options.breakpoints;
    options.cardsEffect = {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 4,
      perSlideOffset: 8,
    };
  } else if (effect === 'cube') {
    options.spaceBetween = 0;
    options.slidesPerView = 1;
    delete options.breakpoints;
    options.cubeEffect = {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    };
  } else if (effect === 'flip') {
    options.spaceBetween = 0;
    options.slidesPerView = 1;
    delete options.breakpoints;
    options.flipEffect = {
      slideShadows: true,
      limitRotation: true,
    };
  } else if (effect.startsWith('creative') || effect === 'creative') {
    options.effect = 'creative';
    options.spaceBetween = 0;
    options.slidesPerView = 1;
    delete options.breakpoints;

    if (effect === 'creative-zoom') {
      options.creativeEffect = {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
          opacity: 0,
        },
        next: {
          translate: ['100%', 0, 0],
        },
      };
    } else if (effect === 'creative-3d') {
      options.creativeEffect = {
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0],
        },
      };
    } else {
      // Default / creative-stack
      options.creativeEffect = {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      };
    }
  }

  // Navigation (auto-detect elements inside container or parent wrapper)
  const nextEl = element.querySelector('.swiper-button-next') || element.parentElement?.querySelector('.swiper-button-next');
  const prevEl = element.querySelector('.swiper-button-prev') || element.parentElement?.querySelector('.swiper-button-prev');
  if (nextEl || prevEl) {
    options.navigation = {
      nextEl: nextEl || undefined,
      prevEl: prevEl || undefined,
    };
  }

  // Pagination (auto-detect pagination element inside container or parent wrapper)
  const paginationEl = element.querySelector('.swiper-pagination') || element.parentElement?.querySelector('.swiper-pagination');
  if (paginationEl) {
    const pagClasses = Array.from(paginationEl.classList);
    let pagType = 'bullets';
    let dynamicBullets = false;

    if (pagClasses.includes('swiper-pagination-progressbar')) {
      pagType = 'progressbar';
    } else if (pagClasses.includes('swiper-pagination-fraction')) {
      pagType = 'fraction';
    }

    if (pagClasses.includes('swiper-pagination-dynamic')) {
      dynamicBullets = true;
    }

    options.pagination = {
      el: paginationEl,
      clickable: true,
      type: pagType,
      dynamicBullets: dynamicBullets,
    };
  }

  // Scrollbar
  const scrollbarEl = element.querySelector('.swiper-scrollbar') || element.parentElement?.querySelector('.swiper-scrollbar');
  if (scrollbarEl) {
    options.scrollbar = {
      el: scrollbarEl,
      draggable: true,
    };
  }

  // Apply breakpoints if any responsive classes were found
  if (Object.keys(breakpoints).length > 0) {
    options.breakpoints = breakpoints;
  }

  if (customModules && customModules.length > 0) {
    options.modules = customModules;
  }

  return options;
}

/**
 * Automatically initializes all Swiper instances in the DOM
 * @param SwiperClass The Swiper constructor class
 * @param modules Optional array of Swiper modules to attach
 */
export function initTailwindSwipers(SwiperClass: any, modules?: any[]) {
  if (!SwiperClass) {
    console.error('Swiper class is required to initialize.');
    return;
  }

  const swiperElements = document.querySelectorAll('.swiper');
  const instances: any[] = [];

  swiperElements.forEach(el => {
    const htmlEl = el as HTMLElement;
    // Avoid double initialization
    if ((htmlEl as any).swiper) return;

    const activeModules = modules || SwiperClass.defaults?.modules;
    const options = parseSwiperClasses(htmlEl, activeModules);
    try {
      const swiperInstance = new SwiperClass(htmlEl, options);
      instances.push(swiperInstance);
    } catch (e) {
      console.error('Failed to initialize Swiper on element:', el, e);
    }
  });

  return instances;
}

// Auto-run if Swiper is loaded in the browser global scope (CDN method)
if (typeof window !== 'undefined' && (window as any).Swiper) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initTailwindSwipers((window as any).Swiper));
  } else {
    initTailwindSwipers((window as any).Swiper);
  }
}
