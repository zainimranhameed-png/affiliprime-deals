/**
 * AffiliPrime VIP Animation Engine
 * HomeIQ-Style Premium Animations: Scroll Reveals, Parallax, Counters, Cursor Glow
 */

(function() {
  'use strict';

  // ── 1. Inject DOM elements ─────────────────────────────────────────────
  function injectAnimationDOM() {
    // Floating Orb Background
    const orbBg = document.createElement('div');
    orbBg.className = 'vip-orb-bg';
    orbBg.innerHTML = `
      <div class="vip-orb vip-orb-1"></div>
      <div class="vip-orb vip-orb-2"></div>
      <div class="vip-orb vip-orb-3"></div>
      <div class="vip-orb vip-orb-4"></div>
    `;
    document.body.insertBefore(orbBg, document.body.firstChild);

    // Scroll Progress Bar
    const progress = document.createElement('div');
    progress.id = 'vip-scroll-progress';
    document.body.insertBefore(progress, document.body.firstChild);

    // Cursor Glow
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'vip-cursor-glow';
    document.body.appendChild(cursorGlow);
  }

  // ── 2. Scroll Progress Bar ─────────────────────────────────────────────
  function initScrollProgress() {
    const bar = document.getElementById('vip-scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── 3. Cursor Glow Tracker ─────────────────────────────────────────────
  function initCursorGlow() {
    const glow = document.getElementById('vip-cursor-glow');
    if (!glow) return;
    let mouseX = -999, mouseY = -999;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.left = mouseX + 'px';
      glow.style.top  = mouseY + 'px';
    }, { passive: true });
  }

  // ── 4. Scroll-Triggered Section Reveals ───────────────────────────────
  function initScrollReveals() {
    // Add reveal class to major sections
    const targets = [
      '.hero-badge',
      '.hero-title',
      '.hero-description',
      '.hero-stats',
      '.filter-section',
      '.section-header',
      '.trust-card',
      '.faq-item',
      '.footer-col',
      '.how-it-works-section .step-item',
    ];

    targets.forEach((sel, i) => {
      document.querySelectorAll(sel).forEach((el, j) => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          el.style.transitionDelay = (j * 0.08) + 's';
        }
      });
    });

    // Section titles get underline animation
    document.querySelectorAll('.section-title').forEach(el => {
      el.classList.add('reveal');
    });

    // Intersection Observer for reveals
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('section-title')) {
            entry.target.classList.add('title-underlined');
          }
          // Don't unobserve — keep visible
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // ── 5. Product Card Stagger Animation ─────────────────────────────────
  function initCardStagger() {
    // Called once on initial render and again on re-render
    function observeCards() {
      const cards = document.querySelectorAll('.product-card:not(.card-observed)');
      if (cards.length === 0) return;

      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const allCards = [...document.querySelectorAll('.product-card')];
            const idx = allCards.indexOf(card);
            const delay = (idx % 6) * 0.08; // stagger in groups of 6
            setTimeout(() => {
              card.classList.add('card-visible');
            }, delay * 1000);
            cardObserver.unobserve(card);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

      cards.forEach(card => {
        card.classList.add('card-observed');
        cardObserver.observe(card);
      });
    }

    // Watch for new cards being rendered (filter/search)
    const grid = document.getElementById('productsGrid');
    if (grid) {
      observeCards(); // initial
      const mutObs = new MutationObserver(() => {
        // Reset cards when grid is updated
        grid.querySelectorAll('.product-card').forEach(c => {
          c.classList.remove('card-observed', 'card-visible');
          c.style.transitionDelay = '';
        });
        setTimeout(observeCards, 50);
      });
      mutObs.observe(grid, { childList: true });
    }
  }

  // ── 6. Number Counter Animation ────────────────────────────────────────
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * ease;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.counted) return;
          el.dataset.counted = '1';

          const raw = el.textContent.trim();
          // Parse "30+", "4.8★", "100%", "1M+" etc.
          const numMatch = raw.match(/([\d.]+)/);
          if (!numMatch) return;
          const num = parseFloat(numMatch[1]);
          const suffix = raw.replace(numMatch[1], '');
          animateCounter(el, num, suffix, 1800);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  // ── 7. Mouse Parallax on Hero ──────────────────────────────────────────
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const spotlightCard = document.querySelector('.hero-spotlight-card');
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');

    if (!hero) return;

    let raf;
    hero.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx; // -1 to 1
        const dy = (e.clientY - rect.top  - cy) / cy;

        if (spotlightCard) {
          spotlightCard.style.transform = `translateY(${dy * -12}px) translateX(${dx * -8}px) rotateY(${dx * 3}deg) rotateX(${-dy * 2}deg)`;
        }
        if (heroBadge) {
          heroBadge.style.transform = `translateY(${dy * -6}px) translateX(${dx * -4}px)`;
        }
        if (heroTitle) {
          heroTitle.style.transform = `translateY(${dy * -3}px) translateX(${dx * -2}px)`;
        }
      });
    });

    hero.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      [spotlightCard, heroBadge, heroTitle].forEach(el => {
        if (el) el.style.transform = '';
      });
    });
  }

  // ── 8. Hero Entry Animations ──────────────────────────────────────────
  function initHeroEntryAnim() {
    const badge = document.querySelector('.hero-badge');
    const title = document.querySelector('.hero-title');
    const desc  = document.querySelector('.hero-description');
    const stats = document.querySelector('.hero-stats');
    const btns  = document.querySelector('.hero-left .hero-actions, .hero-left .btn-group');
    const card  = document.querySelector('.hero-spotlight-card');

    const items = [badge, title, desc, stats, btns, card].filter(Boolean);
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = '';
        el.style.transform = '';
      }, 100 + i * 120);
    });
  }

  // ── 9. Marquee particles (floating dots) ──────────────────────────────
  function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 4 + 2;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(245,158,11,${Math.random() * 0.4 + 0.1});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 0;
        animation: particleDrift ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite alternate;
      `;
      hero.style.position = 'relative';
      hero.style.overflow = 'hidden';
      hero.appendChild(dot);
    }

    // Inject keyframe
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleDrift {
        from { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
        to   { transform: translateY(-40px) translateX(20px) scale(1.5); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── 10. Smooth page transitions on nav links ──────────────────────────
  function initSmoothNavClick() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ── BOOT ──────────────────────────────────────────────────────────────
  function boot() {
    try { injectAnimationDOM(); }   catch(e) { console.warn('anim:dom', e); }
    try { initScrollProgress(); }   catch(e) { console.warn('anim:progress', e); }
    try { initCursorGlow(); }       catch(e) { console.warn('anim:cursor', e); }
    try { initHeroEntryAnim(); }    catch(e) { console.warn('anim:hero', e); }
    try { initHeroParallax(); }     catch(e) { console.warn('anim:parallax', e); }
    try { initParticles(); }        catch(e) { console.warn('anim:particles', e); }
    try { initScrollReveals(); }    catch(e) { console.warn('anim:reveals', e); }
    try { initCounters(); }         catch(e) { console.warn('anim:counters', e); }
    try { initCardStagger(); }      catch(e) { console.warn('anim:cards', e); }
    try { initSmoothNavClick(); }   catch(e) { console.warn('anim:nav', e); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
