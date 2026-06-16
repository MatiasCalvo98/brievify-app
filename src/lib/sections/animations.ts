import type { StyleTheme } from "./style-themes";
import type { BrandTokens } from "./brand-tokens";

/**
 * CSS base de animaciones e interacciones, compartido por todos los temas.
 * Cubre: scroll reveal, hover de cards/botones/productos, marquee y acordeón FAQ.
 * Se combina con el globalCss específico de cada tema.
 */
export function baseAnimationCss(theme: StyleTheme, brand: BrandTokens): string {
  return `
  /* ── Scroll reveal ───────────────────────────── */
  .bv-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
    will-change: opacity, transform;
  }
  .bv-reveal.bv-in {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .bv-reveal { opacity: 1 !important; transform: none !important; transition: none; }
  }

  /* ── Botones ─────────────────────────────────── */
  .bv-btn { transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s, background 0.3s, color 0.3s, letter-spacing 0.3s; will-change: transform; }

  /* ── Cards genéricas ─────────────────────────── */
  .bv-card { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s, border-color 0.35s; }

  /* ── Cards de producto ───────────────────────── */
  .bv-product { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s; overflow: hidden; }
  .bv-product .bv-product-img { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
  .bv-product:hover .bv-product-img { transform: scale(1.08); }
  .bv-product .bv-product-cta { transition: transform 0.25s, box-shadow 0.25s, background 0.3s; }

  /* ── Rating stars: llenado al revelar ────────── */
  .bv-stars { position: relative; display: inline-block; letter-spacing: 0.12em; }

  /* ── Marquee (trust strip) ───────────────────── */
  .bv-marquee { overflow: hidden; width: 100%; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .bv-marquee-track { display: flex; width: max-content; animation: bv-marquee 26s linear infinite; }
  .bv-marquee:hover .bv-marquee-track { animation-play-state: paused; }
  .bv-marquee-item { padding: 0 32px; white-space: nowrap; display: inline-flex; align-items: center; }
  @keyframes bv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── FAQ accordion ───────────────────────────── */
  .bv-faq-item { cursor: pointer; }
  .bv-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
  .bv-faq-icon { flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); font-size: 22px; line-height: 1; }
  .bv-faq-item.bv-open .bv-faq-icon { transform: rotate(45deg); }
  .bv-faq-a { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s, margin-top 0.3s; margin-top: 0; }
  .bv-faq-item.bv-open .bv-faq-a { max-height: 240px; opacity: 1; margin-top: 10px; }
  `;
}

/**
 * JS vanilla inyectado al final del <body>.
 * Activa scroll reveal (IntersectionObserver) y el acordeón FAQ.
 */
export function baseAnimationJs(): string {
  return `
  <script>
  (function () {
    // Scroll reveal
    var revealEls = document.querySelectorAll('.bv-reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('bv-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i, 4) * 0.06) + 's';
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) { el.classList.add('bv-in'); });
    }

    // FAQ accordion
    document.querySelectorAll('.bv-faq-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var wasOpen = item.classList.contains('bv-open');
        var parent = item.closest('section');
        if (parent) parent.querySelectorAll('.bv-faq-item.bv-open').forEach(function (o) { o.classList.remove('bv-open'); });
        if (!wasOpen) item.classList.add('bv-open');
      });
    });
  })();
  </script>
  `;
}
