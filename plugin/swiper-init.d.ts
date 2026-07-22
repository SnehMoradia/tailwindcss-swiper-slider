/**
 * TailwindCSS Swiper Auto-Initializer
 * Auto-detects Swiper elements and parses configuration options from class names.
 */
/**
 * Parses class list to generate Swiper configuration
 * @param element The Swiper container element
 * @param customModules Optional array of Swiper modules to attach
 * @returns Swiper options
 */
export declare function parseSwiperClasses(element: HTMLElement, customModules?: any[]): any;
/**
 * Automatically initializes all Swiper instances in the DOM
 * @param SwiperClass The Swiper constructor class
 * @param modules Optional array of Swiper modules to attach
 */
export declare function initTailwindSwipers(SwiperClass: any, modules?: any[]): any[] | undefined;
