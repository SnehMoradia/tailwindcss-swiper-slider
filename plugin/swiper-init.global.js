var TailwindSwiper = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var swiper_init_exports = {};
  __export(swiper_init_exports, {
    initTailwindSwipers: () => initTailwindSwipers,
    parseSwiperClasses: () => parseSwiperClasses
  });
  const TAILWIND_SPACING = {
    "0": 0,
    "0.5": 2,
    "1": 4,
    "1.5": 6,
    "2": 8,
    "2.5": 10,
    "3": 12,
    "3.5": 14,
    "4": 16,
    "5": 20,
    "6": 24,
    "8": 32,
    "10": 40,
    "12": 48,
    "14": 56,
    "16": 64,
    "20": 80,
    "24": 96,
    "28": 112,
    "32": 128
  };
  const TAILWIND_BREAKPOINTS = {
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536
  };
  function parseSwiperClasses(element, customModules) {
    const classes = Array.from(element.classList);
    let loop = false;
    let speed = 300;
    let slidesPerView = 1;
    let spaceBetween = 0;
    let centeredSlides = false;
    let effect = "slide";
    let direction = "horizontal";
    let mousewheel = false;
    let keyboard = false;
    let autoplayEnabled = false;
    let autoplayDelay = 3e3;
    let autoplayDisableOnInteraction = false;
    let autoplayPauseOnMouseEnter = false;
    let autoplayStopOnLastSlide = false;
    const breakpoints = {};
    const parseSlidesValue = (val) => {
      if (val === "auto") return "auto";
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 1 : parsed;
    };
    const parseSpaceValue = (val) => {
      if (TAILWIND_SPACING[val] !== void 0) {
        return TAILWIND_SPACING[val];
      }
      const parsed = parseInt(val);
      return isNaN(parsed) ? 0 : parsed;
    };
    classes.forEach((cls) => {
      if (cls.includes(":")) {
        const parts = cls.split(":");
        const bp = parts[parts.length - 2];
        const classPart = parts[parts.length - 1];
        const bpWidth = TAILWIND_BREAKPOINTS[bp];
        if (bpWidth) {
          if (!breakpoints[bpWidth]) breakpoints[bpWidth] = {};
          if (classPart.startsWith("swiper-slides-per-view-")) {
            const val = classPart.replace("swiper-slides-per-view-", "");
            breakpoints[bpWidth].slidesPerView = parseSlidesValue(val);
          } else if (classPart.startsWith("swiper-space-x-")) {
            const val = classPart.replace("swiper-space-x-", "");
            breakpoints[bpWidth].spaceBetween = parseSpaceValue(val);
          } else if (classPart === "swiper-centered") {
            breakpoints[bpWidth].centeredSlides = true;
          } else if (classPart === "swiper-not-centered") {
            breakpoints[bpWidth].centeredSlides = false;
          }
        }
        return;
      }
      if (cls === "swiper-loop") {
        loop = true;
      } else if (cls.startsWith("swiper-speed-")) {
        speed = parseInt(cls.replace("swiper-speed-", "")) || 300;
      } else if (cls.startsWith("swiper-slides-per-view-")) {
        const val = cls.replace("swiper-slides-per-view-", "");
        slidesPerView = parseSlidesValue(val);
      } else if (cls.startsWith("swiper-space-x-")) {
        const val = cls.replace("swiper-space-x-", "");
        spaceBetween = parseSpaceValue(val);
      } else if (cls === "swiper-centered") {
        centeredSlides = true;
      } else if (cls === "swiper-mousewheel") {
        mousewheel = true;
      } else if (cls === "swiper-keyboard") {
        keyboard = true;
      } else if (cls.startsWith("swiper-direction-")) {
        direction = cls.replace("swiper-direction-", "") === "vertical" ? "vertical" : "horizontal";
      } else if (cls.startsWith("swiper-effect-")) {
        effect = cls.replace("swiper-effect-", "");
      }
      if (cls === "swiper-autoplay") {
        autoplayEnabled = true;
      } else if (cls.startsWith("swiper-autoplay-delay-")) {
        autoplayEnabled = true;
        autoplayDelay = parseInt(cls.replace("swiper-autoplay-delay-", "")) || 3e3;
      } else if (cls === "swiper-autoplay-pause") {
        autoplayEnabled = true;
        autoplayPauseOnMouseEnter = true;
      } else if (cls === "swiper-autoplay-stop-last") {
        autoplayEnabled = true;
        autoplayStopOnLastSlide = true;
      } else if (cls === "swiper-autoplay-interactive") {
        autoplayEnabled = true;
        autoplayDisableOnInteraction = false;
      } else if (cls === "swiper-autoplay-no-interactive") {
        autoplayEnabled = true;
        autoplayDisableOnInteraction = true;
      }
    });
    const options = {
      loop,
      speed,
      slidesPerView,
      spaceBetween,
      centeredSlides,
      effect,
      direction
    };
    if (keyboard) options.keyboard = { enabled: true };
    if (mousewheel) options.mousewheel = { forceToAxis: true };
    if (autoplayEnabled) {
      options.autoplay = {
        delay: autoplayDelay,
        disableOnInteraction: autoplayDisableOnInteraction,
        pauseOnMouseEnter: autoplayPauseOnMouseEnter,
        stopOnLastSlide: autoplayStopOnLastSlide
      };
    }
    if (effect === "fade") {
      options.spaceBetween = 0;
      options.slidesPerView = 1;
      delete options.breakpoints;
      options.fadeEffect = {
        crossFade: true
      };
    } else if (effect === "coverflow") {
      options.spaceBetween = 0;
      options.centeredSlides = true;
      options.slidesPerView = "auto";
      delete options.breakpoints;
      options.coverflowEffect = {
        rotate: 45,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true
      };
    } else if (effect === "cards") {
      options.spaceBetween = 0;
      options.slidesPerView = 1;
      options.loop = false;
      delete options.breakpoints;
      options.cardsEffect = {
        slideShadows: true,
        rotate: true,
        perSlideRotate: 4,
        perSlideOffset: 8
      };
    } else if (effect === "cube") {
      options.spaceBetween = 0;
      options.slidesPerView = 1;
      delete options.breakpoints;
      options.cubeEffect = {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94
      };
    } else if (effect === "flip") {
      options.spaceBetween = 0;
      options.slidesPerView = 1;
      delete options.breakpoints;
      options.flipEffect = {
        slideShadows: true,
        limitRotation: true
      };
    } else if (effect.startsWith("creative") || effect === "creative") {
      options.effect = "creative";
      options.spaceBetween = 0;
      options.slidesPerView = 1;
      delete options.breakpoints;
      if (effect === "creative-zoom") {
        options.creativeEffect = {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
            opacity: 0
          },
          next: {
            translate: ["100%", 0, 0]
          }
        };
      } else if (effect === "creative-3d") {
        options.creativeEffect = {
          prev: {
            shadow: true,
            translate: [0, 0, -800],
            rotate: [180, 0, 0]
          },
          next: {
            shadow: true,
            translate: [0, 0, -800],
            rotate: [-180, 0, 0]
          }
        };
      } else {
        options.creativeEffect = {
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1]
          },
          next: {
            translate: ["100%", 0, 0]
          }
        };
      }
    }
    const nextEl = element.querySelector(".swiper-button-next") || element.parentElement?.querySelector(".swiper-button-next");
    const prevEl = element.querySelector(".swiper-button-prev") || element.parentElement?.querySelector(".swiper-button-prev");
    if (nextEl || prevEl) {
      options.navigation = {
        nextEl: nextEl || void 0,
        prevEl: prevEl || void 0
      };
    }
    const paginationEl = element.querySelector(".swiper-pagination") || element.parentElement?.querySelector(".swiper-pagination");
    if (paginationEl) {
      const pagClasses = Array.from(paginationEl.classList);
      let pagType = "bullets";
      let dynamicBullets = false;
      if (pagClasses.includes("swiper-pagination-progressbar")) {
        pagType = "progressbar";
      } else if (pagClasses.includes("swiper-pagination-fraction")) {
        pagType = "fraction";
      }
      if (pagClasses.includes("swiper-pagination-dynamic")) {
        dynamicBullets = true;
      }
      options.pagination = {
        el: paginationEl,
        clickable: true,
        type: pagType,
        dynamicBullets
      };
    }
    const scrollbarEl = element.querySelector(".swiper-scrollbar") || element.parentElement?.querySelector(".swiper-scrollbar");
    if (scrollbarEl) {
      options.scrollbar = {
        el: scrollbarEl,
        draggable: true
      };
    }
    if (Object.keys(breakpoints).length > 0) {
      options.breakpoints = breakpoints;
    }
    if (customModules && customModules.length > 0) {
      options.modules = customModules;
    }
    return options;
  }
  function initTailwindSwipers(SwiperClass, modules) {
    if (!SwiperClass) {
      console.error("Swiper class is required to initialize.");
      return;
    }
    const swiperElements = document.querySelectorAll(".swiper");
    const instances = [];
    swiperElements.forEach((el) => {
      const htmlEl = el;
      if (htmlEl.swiper) return;
      const activeModules = modules || SwiperClass.defaults?.modules;
      const options = parseSwiperClasses(htmlEl, activeModules);
      try {
        const swiperInstance = new SwiperClass(htmlEl, options);
        instances.push(swiperInstance);
      } catch (e) {
        console.error("Failed to initialize Swiper on element:", el, e);
      }
    });
    return instances;
  }
  if (typeof window !== "undefined" && window.Swiper) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => initTailwindSwipers(window.Swiper));
    } else {
      initTailwindSwipers(window.Swiper);
    }
  }
  return __toCommonJS(swiper_init_exports);
})();
