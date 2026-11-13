/* Hero CursorGrid mount — interactive grid background behind the hero. */
import { createCursorGrid } from './cursor-grid.js';

const hero = document.querySelector('.hero');
if (hero) {
  hero.style.position = 'relative';
  const grid = document.createElement('div');
  grid.id = 'heroCursorGrid';
  grid.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
  hero.insertBefore(grid, hero.firstChild);

  try {
    createCursorGrid(grid, {
      cellSize: 50,
      color: '#1f3a93',
      gridColor: '#1f3a93',
      highlight: 'area',
      gridStyle: 'lines',
      radius: 160,
      holdTime: 300,
      fadeDuration: 700,
      fillOpacity: 0.05,
      gridOpacity: 0.06,
      spotlight: 0.5,
      clickPulse: true,
      edgeFade: 0.15,
      intro: true,
      lightMode: true
    });
  } catch (err) {
    if (window.console && console.warn) console.warn('[cursor-grid] unavailable:', err);
    grid.remove();
  }
}
