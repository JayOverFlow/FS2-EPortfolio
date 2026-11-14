/* Hero DepthCard mount — 3D tilt on the ID card stage. */
import { createDepthCard } from './depth-card.js';

const figure = document.querySelector('.hero-lanyard');
if (figure) {
  try {
    createDepthCard(figure, {
      tilt: 8,
      depth: 30,
      glare: true,
      glareOpacity: 0.15,
      scale: 1.02,
      perspective: 1200
    });
  } catch (err) {
    if (window.console && console.warn) console.warn('[depth-card] unavailable:', err);
  }
}
