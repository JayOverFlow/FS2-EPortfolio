/* ============================================================
   DepthCard — vanilla port of the React Bits Pro <DepthCard />
   A card that tilts with depth as the cursor moves.
   Usage: createDepthCard(container, options) -> { update(), destroy() }
   ============================================================ */
export function createDepthCard(container, options = {}) {
  if (!container) throw new Error('createDepthCard: container is required');
  const opts = Object.assign({
    tilt: 15,
    depth: 40,
    glare: true,
    glareOpacity: 0.3,
    scale: 1.05,
    perspective: 1000
  }, options);

  container.classList.add('depth-card');
  container.style.perspective = opts.perspective + 'px';

  const inner = document.createElement('div');
  inner.className = 'depth-card__inner';
  while (container.firstChild) inner.appendChild(container.firstChild);
  container.appendChild(inner);

  if (opts.glare) {
    const glare = document.createElement('div');
    glare.className = 'depth-card__glare';
    inner.appendChild(glare);
  }

  let raf = 0;
  let target = { rx: 0, ry: 0, scale: 1 };
  let current = { rx: 0, ry: 0, scale: 1 };

  const onMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    target.ry = (x - 0.5) * opts.tilt * 2;
    target.rx = (0.5 - y) * opts.tilt * 2;
    target.scale = opts.scale;
  };

  const onLeave = () => {
    target.rx = 0;
    target.ry = 0;
    target.scale = 1;
  };

  const tick = () => {
    const lerp = 0.12;
    current.rx += (target.rx - current.rx) * lerp;
    current.ry += (target.ry - current.ry) * lerp;
    current.scale += (target.scale - current.scale) * lerp;
    inner.style.transform = `rotateX(${current.rx}deg) rotateY(${current.ry}deg) scale3d(${current.scale}, ${current.scale}, ${current.scale})`;

    if (opts.glare) {
      const glare = inner.querySelector('.depth-card__glare');
      if (glare) {
        const angle = Math.atan2(current.ry, current.rx) * (180 / Math.PI);
        const intensity = Math.min(1, (Math.abs(current.rx) + Math.abs(current.ry)) / opts.tilt);
        glare.style.opacity = (intensity * opts.glareOpacity).toFixed(3);
        glare.style.background = `linear-gradient(${angle + 90}deg, rgba(255,255,255,0.4), transparent 60%)`;
      }
    }
    raf = requestAnimationFrame(tick);
  };

  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);
  raf = requestAnimationFrame(tick);

  const destroy = () => {
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    container.classList.remove('depth-card');
    // unwrap
    while (inner.firstChild) container.appendChild(inner.firstChild);
    inner.remove();
  };

  return { destroy };
}

export default createDepthCard;
