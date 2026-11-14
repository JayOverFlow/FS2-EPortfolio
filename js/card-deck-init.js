/* Card Deck Carousel mount — microteaching photo documentation (Section VII). */
import { createCardDeck } from '../components/ui/card-deck-carousel.js';

document.querySelectorAll('[data-card-deck]').forEach(function (mount) {
  let slides = [];
  try {
    slides = JSON.parse(mount.getAttribute('data-slides') || '[]');
  } catch (err) {
    if (window.console && console.warn) console.warn('[card-deck] bad slide data:', err);
    return;
  }
  if (!slides.length) return;
  try {
    createCardDeck(mount, {
      slides: slides,
      height: 'auto',
      cardWidth: 'min(78vw, 520px)',
      aspect: '4 / 3',
      scatter: 8,
      autoplay: 4500,
      ariaLabel: 'Microteaching photo documentation'
    });
  } catch (err) {
    if (window.console && console.warn) console.warn('[card-deck] unavailable:', err);
  }
});
