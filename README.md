# 🚀 TailwindCSS Swiper Plugin

A **declarative, zero-JS configuration** Tailwind CSS plugin for [Swiper.js](https://swiperjs.com/). 

Easily create responsive, animated, themeable touch sliders using **pure Tailwind utility classes** directly on your HTML elements—no tedious JS option objects required!

[![GitHub Repository](https://img.shields.io/badge/GitHub-SnehMoradia%2Ftailwindcss--slider-181717?style=for-the-badge&logo=github)](https://github.com/SnehMoradia/tailwindcss-slider)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Tailwind%20Swiper%20Configurator-blue?style=for-the-badge&logo=vercel)](https://tailwindcss-swiper-slider.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## ✨ Highlights

* **🎯 Declarative utility-first configuration**: Configure loop, autoplay, responsive breakpoints, transitions, speed, and pagination using custom Tailwind classes.
* **📱 Responsive Breakpoint Support**: Standard Tailwind screen prefixes (e.g. `md:swiper-slides-per-view-2 lg:swiper-slides-per-view-3`).
* **🎨 Custom Color Themes**: Built-in dynamic theme classes (`swiper-theme-primary`, `swiper-theme-emerald`, `swiper-theme-rose`, `swiper-theme-violet`, `swiper-theme-amber`, `swiper-theme-indigo`, `swiper-theme-slate`).
* **⚡ 3D & Transition Effects**: Full support for `slide`, `fade`, `coverflow`, `cards`, `cube`, `flip`, and `creative` transitions.
* **⚛️ Framework Agnostic**: Works seamlessly with **HTML / Vite**, **React**, **Next.js**, **Vue**, or vanilla JS apps.
* **🛠️ Dynamic Live Code Export**: Configurator sidebar settings continuously update HTML, React/JSX, JS Init, and Tailwind Config code blocks in real time with precise slide counts, styles, responsive classes, and controls!

---

## 📦 Installation

Install `swiper` and `tailwindcss-swiper-slider` in your project:

```bash
npm install swiper tailwindcss-swiper-slider
```

Add the plugin to your `tailwind.config.js` (or `tailwind.config.cjs`):

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-swiper-slider/plugin'),
  ],
};
```

#### Tailwind CLI Build Command:
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

---

## ⚡ Quick Start

### 1. HTML Markup (Declarative Utilities)

Simply attach your slider configuration classes directly to the root `.swiper` element:

```html
<div class="swiper swiper-loop swiper-autoplay swiper-space-x-4 swiper-slides-per-view-1 md:swiper-slides-per-view-2 lg:swiper-slides-per-view-3 swiper-theme-primary w-full rounded-2xl">
  <div class="swiper-wrapper">
    <div class="swiper-slide bg-slate-900 border border-slate-800 p-8 rounded-xl text-center">
      <h3 class="text-xl font-bold text-white mb-2">Slide 1</h3>
      <p class="text-slate-400 text-sm">Zero JS configuration needed.</p>
    </div>
    <div class="swiper-slide bg-slate-900 border border-slate-800 p-8 rounded-xl text-center">
      <h3 class="text-xl font-bold text-white mb-2">Slide 2</h3>
      <p class="text-slate-400 text-sm">Responsive breakpoints built-in.</p>
    </div>
    <div class="swiper-slide bg-slate-900 border border-slate-800 p-8 rounded-xl text-center">
      <h3 class="text-xl font-bold text-white mb-2">Slide 3</h3>
      <p class="text-slate-400 text-sm">Silky smooth Swiper animations.</p>
    </div>
  </div>

  <!-- Optional Controls -->
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

### 2. Auto Initialization (Vanilla JS / Vite)

Make sure your `<script>` tag in `index.html` has **`type="module"`**:
```html
<script type="module" src="./src/main.js"></script>
```

Initialize all `.swiper` instances automatically on DOM load:

```typescript
import Swiper from 'swiper';
import {
  Navigation, Pagination, Autoplay, Scrollbar,
  EffectFade, EffectCoverflow, EffectCards,
  EffectCube, EffectFlip, EffectCreative
} from 'swiper/modules';
import { initTailwindSwipers } from 'tailwindcss-swiper-slider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Register Swiper modules
Swiper.use([
  Navigation, Pagination, Autoplay, Scrollbar,
  EffectFade, EffectCoverflow, EffectCards,
  EffectCube, EffectFlip, EffectCreative
]);

// Auto-detect and parse utility classes on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initTailwindSwipers(Swiper);
});
```

### 3. Plain HTML / Live Server (No Bundler / CDN)

If you are using plain HTML or Live Server without a bundler, include Swiper CDN scripts and the plugin's global script tag (`swiper-init.global.js`). **Zero `import` statements required!**

```html
<!-- Swiper CSS & CDN JS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- Standalone Tailwind Swiper Auto-Initializer (Global IIFE) -->
<script src="./node_modules/tailwindcss-swiper-slider/plugin/swiper-init.global.js"></script>
```

---

## ⚛️ React Integration

Use the plugin inside your React components effortlessly:

```tsx
import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { parseSwiperClasses } from 'tailwindcss-swiper-slider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function ReactSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const options = parseSwiperClasses(sliderRef.current);
      options.modules = [Navigation, Pagination, Autoplay];
      const swiper = new Swiper(sliderRef.current, options);

      return () => swiper.destroy(true, true);
    }
  }, []);

  return (
    <div 
      ref={sliderRef} 
      className="swiper swiper-loop swiper-autoplay swiper-slides-per-view-1 md:swiper-slides-per-view-3 swiper-space-x-4 swiper-theme-violet w-full"
    >
      <div className="swiper-wrapper">
        <div className="swiper-slide bg-slate-900 border border-slate-800 p-6 rounded-2xl">Slide 1</div>
        <div className="swiper-slide bg-slate-900 border border-slate-800 p-6 rounded-2xl">Slide 2</div>
        <div className="swiper-slide bg-slate-900 border border-slate-800 p-6 rounded-2xl">Slide 3</div>
      </div>
      <div className="swiper-pagination" />
      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </div>
  );
}
```

---

## 🎨 Complete Tailwind Utility Reference

### General & Behavior
| Utility Class | Swiper Option Equivalent | Description |
| :--- | :--- | :--- |
| `swiper-loop` | `loop: true` | Enables continuous infinite loop mode |
| `swiper-autoplay` | `autoplay: true` | Enables automatic slide cycling (3000ms default) |
| `swiper-autoplay-delay-[ms]` | `autoplay.delay: [ms]` | Custom delay interval in ms (e.g. `swiper-autoplay-delay-5000`) |
| `swiper-autoplay-pause` | `pauseOnMouseEnter: true` | Pauses autoplay when mouse hovers over slider |
| `swiper-autoplay-stop-last` | `stopOnLastSlide: true` | Stops autoplay upon reaching the final slide |
| `swiper-speed-[ms]` | `speed: [ms]` | Transition duration in ms (default: `300`) |
| `swiper-centered` | `centeredSlides: true` | Centers the active slide in container |
| `swiper-mousewheel` | `mousewheel: true` | Enables mouse wheel scrolling navigation |
| `swiper-keyboard` | `keyboard: true` | Enables arrow key keyboard navigation |

### Layout & Spacing
| Utility Class | Swiper Option Equivalent | Description |
| :--- | :--- | :--- |
| `swiper-slides-per-view-[n]` | `slidesPerView: n \| 'auto'` | Number of slides visible (`1`, `2`, `3`, `4`, `auto`) |
| `md:swiper-slides-per-view-2` | `breakpoints: { 768: { slidesPerView: 2 } }` | Responsive breakpoint override (`sm`, `md`, `lg`, `xl`) |
| `swiper-space-x-[n]` | `spaceBetween: px` | Slide gap (`0`, `2`, `4`, `6`, `8`, `10`, `12`) |

### Visual & 3D Transition Effects
| Utility Class | Effect Type | Description |
| :--- | :--- | :--- |
| `swiper-effect-slide` | `slide` | Standard horizontal sliding transition |
| `swiper-effect-fade` | `fade` | Smooth crossfade opacity transition |
| `swiper-effect-coverflow` | `coverflow` | 3D coverflow depth perspective effect |
| `swiper-effect-cards` | `cards` | Stacked swipeable card deck physics |
| `swiper-effect-cube` | `cube` | 3D rotating box cube transition |
| `swiper-effect-flip` | `flip` | 3D flip card transition |
| `swiper-effect-creative-stack` | `creative` | Modern depth stack scaling transition |
| `swiper-effect-creative-zoom` | `creative` | Zoom-out parallax transition into Z-space |

### Color Themes
| Utility Class | Theme Accent | Navigation & Bullet Colors |
| :--- | :--- | :--- |
| `swiper-theme-primary` | Blue Accent | `#3b82f6` |
| `swiper-theme-emerald` | Emerald Green Accent | `#10b981` |
| `swiper-theme-rose` | Rose Accent | `#f43f5e` |
| `swiper-theme-violet` | Violet Accent | `#8b5cf6` |
| `swiper-theme-amber` | Amber Accent | `#f59e0b` |
| `swiper-theme-indigo` | Indigo Accent | `#6366f1` |
| `swiper-theme-slate` | Slate Neutral Accent | `#94a3b8` |

---

## 🎨 Built-In Presets & Examples

### Hero Carousel (Fade Effect)
```html
<div class="swiper swiper-loop swiper-autoplay swiper-speed-800 swiper-effect-fade swiper-theme-violet w-full h-[450px]">
  <div class="swiper-wrapper">
    <div class="swiper-slide bg-gradient-to-tr from-slate-950 to-violet-950 p-12">
      <h2 class="text-4xl font-bold text-white">Hero Slide 1</h2>
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>
```

### Product Slider (Multi-Column Grid)
```html
<div class="swiper swiper-loop swiper-space-x-4 swiper-slides-per-view-1 md:swiper-slides-per-view-2 lg:swiper-slides-per-view-3 swiper-theme-emerald">
  <div class="swiper-wrapper">
    <!-- Products -->
  </div>
  <div class="swiper-pagination"></div>
</div>
```

### 3D Gallery (Coverflow Effect)
```html
<div class="swiper swiper-loop swiper-effect-coverflow swiper-centered swiper-slides-per-view-auto swiper-theme-primary">
  <div class="swiper-wrapper">
    <!-- 3D Gallery Cards -->
  </div>
  <div class="swiper-pagination"></div>
</div>
```

---

## 📜 License

Distributed under the [MIT License](LICENSE).


