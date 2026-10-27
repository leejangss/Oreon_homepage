/*
 * OREON Products V5 visual refinements (2026-10-27)
 * Keeps Products_BOARD_FILTER_V4_URL_CATEGORY.js unchanged and uses it as the base.
 * Changes ONLY: sidebar font 1.5x, category intro description 1.5x,
 *              clearer card hover line, and A-style circular detail arrow.
 */
(function () {
  'use strict';
  if (window.__oreonProductsUIRefinementsV5) return;
  window.__oreonProductsUIRefinementsV5 = true;

  var BASE_SCRIPT = 'https://cdn.jsdelivr.net/gh/leejangss/Oreon_homepage@main/widgets/products/Products_BOARD_FILTER_V4_URL_CATEGORY.js';
  var STYLE_ID = 'oreon-products-v5-ui-refinements';

  // Higher specificity than the V4 stylesheet; no existing animation/filter logic is changed.
  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '#oreon-live-products .oreon-filter-btn{font-size:22.5px!important;}',
      '#oreon-live-products .oreon-product-index__desc{font-size:clamp(21px,1.62vw,25.5px)!important;white-space:pre!important;width:max-content!important;max-width:none!important;position:relative;left:50%;transform:translateX(-50%);margin-left:0!important;margin-right:0!important;}',
      '#oreon-live-products .oreon-filter-card__image{transition:transform .38s ease,filter .38s ease,border-color .38s ease,box-shadow .38s ease!important;}',
      '#oreon-live-products a.oreon-filter-card:hover .oreon-filter-card__image,',
      '#oreon-live-products a.oreon-filter-card:focus-visible .oreon-filter-card__image{',
      'border-color:rgba(82,204,255,.92)!important;',
      'box-shadow:0 0 0 1px rgba(82,204,255,.26),0 0 20px rgba(70,180,240,.14)!important;',
      '}',
      '#oreon-live-products .oreon-filter-card__detail-arrow{',
      'position:absolute;right:11px;bottom:11px;z-index:4;width:27.3px;height:27.3px;',
      'border:1.1px solid #95dfff;border-radius:50%;display:flex;align-items:center;justify-content:center;',
      'background:transparent;color:#95dfff;pointer-events:none;',
      'transition:background .32s ease,border-color .32s ease,transform .32s ease;',
      '}',
      '#oreon-live-products .oreon-filter-card__detail-arrow svg{display:block;width:14.7px;height:14.7px;}',
      '#oreon-live-products a.oreon-filter-card:hover .oreon-filter-card__detail-arrow,',
      '#oreon-live-products a.oreon-filter-card:focus-visible .oreon-filter-card__detail-arrow{',
      'background:transparent;border-color:#b6edff;color:#b6edff;transform:translateX(2px);',
      '}',
      '@media(prefers-reduced-motion:reduce){',
      '#oreon-live-products .oreon-filter-card__detail-arrow{transition:none!important;}',
      '#oreon-live-products .oreon-filter-card__image{transition:none!important;}',
      '}'
    ].join('');
    document.head.appendChild(style);
  }

  // All product cards are already <a> links in V4. The overlay shares that link,
  // so clicking the arrow opens exactly the same detail page as the original card.
  function installArrows() {
    var root = document.getElementById('oreon-live-products');
    if (!root) return false;
    var cards = root.querySelectorAll('a.oreon-filter-card');
    if (!cards.length) return false;
    Array.prototype.forEach.call(cards, function (card) {
      var image = card.querySelector('.oreon-filter-card__image');
      if (!image || image.querySelector('.oreon-filter-card__detail-arrow')) return;
      var arrow = document.createElement('span');
      arrow.className = 'oreon-filter-card__detail-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>';
      image.appendChild(arrow);
    });
    return true;
  }

  // One complete sentence per line. Native browser wrapping is disabled,
  // and on narrow screens the font scales down only as much as needed to fit.
  function formatIntroDescription() {
    var root = document.getElementById('oreon-live-products');
    if (!root) return false;
    var stage = root.querySelector('.oreon-category-stage');
    var desc = root.querySelector('.oreon-product-index__desc');
    if (!stage || !desc) return false;
    if (desc.dataset.oreonLinebreaksV5 === 'installed') return true;
    desc.dataset.oreonLinebreaksV5 = 'installed';

    function fitSentenceLines() {
      // V4 sets the caption text anew whenever the category changes.
      var normalized = desc.textContent.replace(/\s+/g, ' ').trim();
      var sentenceLines = normalized.replace(/\.\s+(?=\S)/g, '.\n');
      if (desc.textContent !== sentenceLines) desc.textContent = sentenceLines;

      desc.style.removeProperty('font-size');
      var naturalWidth = desc.getBoundingClientRect().width;
      var availableWidth = Math.max(1, stage.getBoundingClientRect().width - 32);
      if (naturalWidth > availableWidth) {
        var fontSize = parseFloat(getComputedStyle(desc).fontSize) || 21;
        desc.style.setProperty('font-size', (fontSize * availableWidth / naturalWidth).toFixed(2) + 'px', 'important');
      }
    }

    root.addEventListener('click', function (event) {
      if (event.target.closest('.oreon-filter-btn')) {
        requestAnimationFrame(fitSentenceLines);
      }
    });
    window.addEventListener('resize', fitSentenceLines, {passive:true});
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSentenceLines);
    fitSentenceLines();
    return true;
  }

  function waitForCards() {
    formatIntroDescription();
    if (installArrows()) return;
    var observer = new MutationObserver(function () {
      formatIntroDescription();
      if (installArrows()) observer.disconnect();
    });
    observer.observe(document.documentElement, {childList:true, subtree:true});
    setTimeout(function () {observer.disconnect();}, 25000);
  }

  // This V5 file can replace the previous one-line Imweb loader by itself.
  // It loads the existing V4 core once, then applies only the four visual changes.
  if (window.__oreonProductsLoaderV1) {
    waitForCards();
  } else {
    var base = document.createElement('script');
    base.src = BASE_SCRIPT;
    base.async = false;
    base.onload = waitForCards;
    base.onerror = function () {
      console.error('OREON Products: could not load the existing V4 board script.');
    };
    document.head.appendChild(base);
  }
})();
