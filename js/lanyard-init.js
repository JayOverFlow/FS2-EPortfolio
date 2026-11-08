/* Hero Lanyard mount — vanilla replacement for the portrait.
   If three/WebGL fails to load, the static portrait fallback stays. */
import { createLanyard } from './lanyard.js';

const figure = document.querySelector('.hero-lanyard');
const mount = document.getElementById('lanyardMount');

if (figure && mount) {
  try {
    const lanyard = createLanyard(mount, {
      frontImage: 'assets/card-front.png',
      backImage: 'assets/card-back.png',
      imageFit: 'cover',
      cardColor: '#ffffff',
      orientation: 'portrait',
      /* Laminated ID card: glossy front, not holographic foil. */
      finish: 'glossy',
      cornerRadius: 0.08,
      size: 0.66,
      anchor: 'center',
      strapLength: 0.42,
      /* Realistic embroidered TUP tape (see tools/generate-lanyard-art.py). */
      strapImage: 'assets/strap.png',
      strapColor: '#13265c',
      strapWidth: 0.9,
      metal: 'gold',
      gravity: 1,
      damping: 0.55,
      elasticity: 0.45,
      breeze: 0.35,
      interactive: true,
      intro: true
    });
    if (lanyard && lanyard.canvas) figure.classList.add('is-lanyard-active');
  } catch (err) {
    /* Keep .hero-portrait-fallback visible; nothing else to do. */
    if (window.console && console.warn) console.warn('[lanyard] fallback portrait shown:', err);
  }
}
