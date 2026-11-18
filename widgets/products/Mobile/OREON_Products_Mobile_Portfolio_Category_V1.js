/*
 * OREON Products | MOBILE Portfolio reveal + horizontal category V1
 * 2026-11-18
 * Only these two requested changes:
 * 1) Mobile Product Portfolio moves upward over the existing mobile hero on scroll.
 * 2) The EXISTING category controls display as one swipeable row below the intro.
 *
 * Preserves: mobile hero iframe, PC Rebuild V1, PC Board Cards V2,
 * native Imweb board, detail-page JS and existing category copy/filter actions.
 * Install: replace the entire old 'PRODUCTS mobile category adjustment' widget.
 */
(function () {
  'use strict';
  if (window.__oreonProductsMobilePortfolioCategory20261118V1) return;
  window.__oreonProductsMobilePortfolioCategory20261118V1 = true;

  var MEDIA = window.matchMedia('(max-width:767px)');
  var REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)');
  var STYLE_ID = 'oreon-products-mobile-portfolio-category-20261118-v1';
  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* Desktop stays completely unchanged. */
      #oreon-live-products .oreon-m-filter-shell { display:contents; }
      #oreon-live-products .oreon-m-filter-arrow { display:none; }
      @media (max-width:767px) {
        /* Existing mobile hero is pinned while Portfolio rises over it. */
        .oreon-m-products-hero-pin {
          position:sticky !important;
          top:var(--oreon-m-hero-pin-top,0px) !important;
          z-index:0 !important;
        }
        .oreon-m-products-cover-section {
          position:relative !important;
          z-index:2 !important;
          background:#02040b !important;
        }
        #oreon-live-products {
          position:relative !important;
          z-index:3 !important;
          background:#02040b !important;
        }
        #oreon-live-products .oreon-category-stage {
          position:relative !important;
          isolation:isolate;
          min-height:0 !important;
          padding:82px 18px 26px !important;
          background:#02040b !important;
          border-bottom:0 !important;
          overflow:hidden;
        }
        /* Reuse Rebuild's breathing blue glow — do not replace its animation. */
        #oreon-live-products .oreon-blue-glow { pointer-events:none; }
        #oreon-live-products .oreon-category-stage__inner {
          position:relative;
          z-index:2;
          width:100%;
          max-width:100%;
          margin:0 auto !important;
          text-align:center;
        }
        #oreon-live-products .oreon-product-index__title {
          margin:0 !important;
          font-size:clamp(34px,9vw,48px) !important;
          line-height:1.12 !important;
          letter-spacing:-.03em !important;
          overflow-wrap:break-word;
        }
        /* V5 desktop refinement uses width:max-content and white-space:pre. */
        #oreon-live-products .oreon-product-index__desc {
          position:static !important;
          left:auto !important;
          right:auto !important;
          width:100% !important;
          max-width:600px !important;
          margin:17px auto 0 !important;
          white-space:pre-line !important;
          overflow-wrap:break-word !important;
          word-break:normal !important;
          transform:none !important;
          text-align:center !important;
          font-size:14px !important;
          line-height:1.75 !important;
          letter-spacing:0 !important;
        }
        #oreon-live-products .oreon-category-stage__count {
          margin-top:16px !important;
          font-size:10px !important;
          letter-spacing:.12em;
        }
        #oreon-live-products .oreon-product-body {
          padding-top:0 !important;
        }
        #oreon-live-products .oreon-product-body__inner {
          grid-template-columns:minmax(0,1fr) !important;
          gap:18px !important;
          padding-left:16px !important;
          padding-right:16px !important;
          min-width:0;
        }
        /* Category row belongs directly after the intro, before product cards. */
        #oreon-live-products .oreon-m-filter-shell {
          display:grid;
          grid-template-columns:28px minmax(0,1fr) 28px;
          align-items:center;
          gap:2px;
          width:100%;
          min-width:0;
          margin:0 0 20px !important;
          padding:2px 0 12px;
          border-bottom:1px solid rgba(127,171,204,.18);
        }
        #oreon-live-products .oreon-m-filter-shell.no-overflow {
          grid-template-columns:minmax(0,1fr);
        }
        #oreon-live-products .oreon-m-filter-shell .oreon-product-index__side {
          position:static !important;
          display:flex !important;
          flex-direction:row !important;
          flex-wrap:nowrap !important;
          align-items:center !important;
          justify-content:flex-start !important;
          gap:20px !important;
          width:100% !important;
          max-width:100% !important;
          min-width:0 !important;
          margin:0 !important;
          padding:0 3px 4px !important;
          overflow-x:auto !important;
          overflow-y:hidden !important;
          scroll-behavior:smooth;
          scroll-snap-type:x proximity;
          -webkit-overflow-scrolling:touch;
          overscroll-behavior-x:contain;
          scrollbar-width:none;
          touch-action:pan-x pan-y;
        }
        #oreon-live-products .oreon-m-filter-shell .oreon-product-index__side::-webkit-scrollbar { display:none; }
        #oreon-live-products .oreon-m-filter-shell .oreon-filter-btn {
          position:relative !important;
          display:inline-flex !important;
          align-items:center !important;
          justify-content:center !important;
          flex:0 0 auto !important;
          min-height:44px !important;
          padding:10px 0 !important;
          border-radius:0 !important;
          background:transparent !important;
          color:#8f9aae;
          font-size:13px !important;
          font-weight:400 !important;
          line-height:1.4 !important;
          white-space:nowrap !important;
          text-align:center !important;
          transform:none !important;
          scroll-snap-align:start;
        }
        #oreon-live-products .oreon-m-filter-shell .oreon-filter-btn.is-active {
          color:#95dfff !important;
          font-weight:500 !important;
        }
        #oreon-live-products .oreon-m-filter-shell .oreon-filter-btn.is-active::after {
          content:'';
          display:block !important;
          position:absolute;
          bottom:3px;
          left:0;
          right:0;
          height:2px;
          background:#95dfff;
        }
        #oreon-live-products .oreon-m-filter-arrow {
          display:flex;
          align-items:center;
          justify-content:center;
          width:28px;
          height:44px;
          border:0;
          padding:0;
          margin:0;
          color:#95dfff;
          background:transparent;
          cursor:pointer;
          appearance:none;
        }
        #oreon-live-products .oreon-m-filter-arrow svg { width:16px;height:16px;pointer-events:none; }
        #oreon-live-products .oreon-m-filter-arrow[hidden] {
          display:flex !important;
          visibility:hidden !important;
          pointer-events:none;
        }
        #oreon-live-products .oreon-m-filter-shell.no-overflow .oreon-m-filter-arrow {
          display:none !important;
        }
        #oreon-live-products .oreon-m-filter-shell button:focus-visible {
          outline:2px solid #95dfff;
          outline-offset:2px;
        }
      }
      @media (max-width:767px) and (prefers-reduced-motion:reduce) {
        #oreon-live-products .oreon-m-filter-shell .oreon-product-index__side {
          scroll-behavior:auto;
        }
      }
    `;
    document.head.appendChild(style);
  }

  var boundShell = null;
  var pinnedSection = null;
  var resizeWatcher = null;
  var scheduled = false;

  function sectionFor(node) {
    if (!node || !node.closest) return null;
    return node.closest('.section_wrap') || node.closest('section[id^="s"]') || node.closest('[id^="s2026"]');
  }

  function pinHeroBehindPortfolio(root) {
    if (!MEDIA.matches || !root) return;
    var iframe = document.querySelector('iframe[src*="OREON_Products_Mobile_Hero_V1.html"]');
    if (!iframe) return;
    var heroSection = sectionFor(iframe);
    var coverSection = sectionFor(root);
    // Guard: never pin the same section that contains the product portfolio.
    if (!heroSection || !coverSection || heroSection === coverSection ||
        heroSection.contains(root) || coverSection.contains(iframe)) return;
    // Only manipulate the known mobile hero and portfolio's own sections.
    heroSection.classList.add('oreon-m-products-hero-pin');
    coverSection.classList.add('oreon-m-products-cover-section');
    pinnedSection = heroSection;
    function setPinTop() {
      if (!MEDIA.matches) return;
      var h = heroSection.getBoundingClientRect().height || iframe.getBoundingClientRect().height || 720;
      heroSection.style.setProperty('--oreon-m-hero-pin-top', Math.min(0, window.innerHeight - h) + 'px');
    }
    setPinTop();
    if (heroSection.dataset.oreonMobilePinEvents !== '1') {
      heroSection.dataset.oreonMobilePinEvents = '1';
      window.addEventListener('resize', setPinTop, {passive:true});
      if ('ResizeObserver' in window) resizeWatcher = new ResizeObserver(setPinTop), resizeWatcher.observe(heroSection);
    }
  }

  function makeArrow(label, path) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'oreon-m-filter-arrow';
    button.hidden = true;
    button.setAttribute('aria-label', label);
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + path + '"/></svg>';
    return button;
  }

  function mountCategory(root) {
    var row = root.querySelector('.oreon-product-index__side');
    if (!row) return;
    if (row.parentElement && row.parentElement.classList.contains('oreon-m-filter-shell')) return;
    // If the old widget was kept accidentally, don't wrap its wrapper again.
    var oldShell = row.closest('.oreon-mobile-filter-shell');
    if (oldShell) return;
    var shell = document.createElement('div');
    shell.className = 'oreon-m-filter-shell';
    var prev = makeArrow('이전 제품 카테고리', 'M14 5l-7 7 7 7');
    var next = makeArrow('다음 제품 카테고리', 'M10 5l7 7-7 7');
    row.before(shell);
    shell.append(prev, row, next);
    boundShell = shell;

    function update() {
      if (!MEDIA.matches) { prev.hidden = next.hidden = true; return; }
      var max = Math.max(0, row.scrollWidth - row.clientWidth);
      var x = Math.max(0, row.scrollLeft);
      shell.classList.toggle('no-overflow', max <= 2);
      prev.hidden = max <= 2 || x <= 2;
      next.hidden = max <= 2 || x >= max - 2;
    }
    function move(amount) {
      row.scrollBy({left:amount, behavior:REDUCED.matches ? 'auto' : 'smooth'});
    }
    function reveal(btn) {
      if (!MEDIA.matches || !btn) return;
      var a = row.getBoundingClientRect(), b = btn.getBoundingClientRect();
      if (b.left < a.left + 4) move(b.left - a.left - 4);
      else if (b.right > a.right - 4) move(b.right - a.right + 4);
    }
    prev.addEventListener('click', function () { move(-Math.max(100, row.clientWidth * .7)); });
    next.addEventListener('click', function () { move(Math.max(100, row.clientWidth * .7)); });
    row.addEventListener('scroll', update, {passive:true});
    row.addEventListener('click', function (event) {
      var btn = event.target.closest('.oreon-filter-btn');
      if (btn) requestAnimationFrame(function () { reveal(btn); update(); });
    });
    row.addEventListener('focusin', function (event) { reveal(event.target.closest('.oreon-filter-btn')); });
    window.addEventListener('resize', update, {passive:true});
    if (MEDIA.addEventListener) MEDIA.addEventListener('change', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(row);
    new MutationObserver(update).observe(row, {childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { update(); reveal(row.querySelector('.is-active')); });
    update();
  }

  function correctMobileDesc(root) {
    if (!MEDIA.matches || !root) return;
    var desc = root.querySelector('.oreon-product-index__desc');
    if (!desc || desc.dataset.oreonMobileDescReady === '1') return;
    desc.dataset.oreonMobileDescReady = '1';
    // PC V5 may set an inline !important font size after each filter click.
    function setSize() {
      if (!MEDIA.matches) return;
      if (desc.style.getPropertyValue('font-size') !== '14px' || desc.style.getPropertyPriority('font-size') !== 'important') {
        desc.style.setProperty('font-size','14px','important');
      }
    }
    new MutationObserver(setSize).observe(desc,{attributes:true,attributeFilter:['style']});
    root.addEventListener('click',function (event) {
      if (event.target.closest('.oreon-filter-btn')) requestAnimationFrame(setSize);
    });
    setSize();
  }

  function mount() {
    if (!MEDIA.matches) return;
    var root = document.getElementById('oreon-live-products');
    if (!root) return;
    pinHeroBehindPortfolio(root);
    mountCategory(root);
    correctMobileDesc(root);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; mount(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
  new MutationObserver(schedule).observe(document.documentElement, {childList:true,subtree:true});
  window.addEventListener('load', schedule);
  if (MEDIA.addEventListener) MEDIA.addEventListener('change', schedule);
})();
