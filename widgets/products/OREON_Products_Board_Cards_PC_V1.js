/*
 * OREON PRODUCTS | PC product board card renderer v1 | 2026-11-17
 * Scope: product cards ONLY. Do not replace the Portfolio hero, category layout,
 * blue glow, scroll cover motion, or Products_DETAIL_V1.js.
 * Source: existing Imweb board widget w202610106ffb71b28cee8.
 * The original board is hidden ONLY after its posts are rendered as cards.
 */
(function () {
  'use strict';
  if (window.__oreonBoardCardsPcV1) return;
  window.__oreonBoardCardsPcV1 = true;

  var BOARD_ID = 'w202610106ffb71b28cee8';
  var ROOT_ID = 'oreon-live-products';
  var GRID_ID = 'oreon-product-grid';
  var STYLE_ID = 'oreon-board-cards-pc-v1-style';
  var ORDER = ['ECM','CaHA','rH Collagen','PNAD+','PNLA','PLLA','PN','HA','Exosome','PDO','TCA','CA'];
  var FIXED_IDS = ['175035692','175035689','175035679','175035674','175035672','175035666','175035662','175035659','175035655','175035648','175035639','175035626','175035584','175035591','175035573','175035450','175035438','175035434'];
  var COPY = {
    'ALL':['Product Portfolio','The complete OREON product lineup.\nExplore every biomaterial solution in one place.'],
    'ECM':['ECM',"Extracellular Matrix biomaterials that recreate the skin's structural environment.\nDesigned to support regeneration and deliver natural, lasting results."],
    'CaHA':['CaHA','Calcium hydroxyapatite biomaterials that provide structural support.\nDesigned to restore volume and stimulate natural collagen for lasting results.'],
    'rH Collagen':['rH Collagen','Recombinant human collagen biomaterials with high purity and consistent quality.\nDesigned to support skin structure, firmness, and elasticity.'],
    'PNAD+':['PNAD+','Nicotinamide adenine dinucleotide, a core coenzyme of cellular energy metabolism.\nDesigned to support skin cell vitality and renewal.'],
    'PNLA':['PNLA','PLLA combined with PN for a dual-action approach to skin regeneration.\nDesigned to improve firmness, elasticity, and skin quality over time.'],
    'PLLA':['PLLA','Products for this category will be added here.'],
    'PN':['PN','Polynucleotide biomaterials that support skin repair and regeneration.\nDesigned to improve hydration, elasticity, and overall skin quality.'],
    'HA':['HA','Hyaluronic acid products for face and body contouring.\nDesigned for natural volume, smooth injectability, and stable results.'],
    'Exosome':['Exosome','Exosome-based solutions that carry signals for cellular communication.\nDesigned to support skin regeneration and renewal.'],
    'PDO':['PDO','Absorbable threads for lifting and skin tightening.\nDesigned for natural contouring and lasting support.'],
    'TCA':['TCA','Products for this category will be added here.'],
    'CA':['CA','Products for this category will be added here.']
  };
  var records = [];
  var current = 'ALL';
  var installed = false;
  var sourceWidget = null;
  var lastSignature = '';
  var lastGrid = null;
  var busy = false;
  var scheduled = false;
  var triedFetch = false;
  var shownError = false;

  function isPC() { return window.matchMedia('(min-width: 1024px)').matches; }
  function norm(value) { return String(value || '').replace(/\s+/g,' ').trim(); }
  function category(value) {
    var str = norm(value).replace(/^\[|\]$/g,'');
    if (/^NAD\+$/i.test(str)) str='PNAD+';
    return ORDER.find(function (c) { return c.toLowerCase()===str.toLowerCase(); }) || (str.toLowerCase()==='all'?'ALL':str);
  }
  function inner(root) {
    return {
      grid:root && root.querySelector('#'+GRID_ID),
      aside:root && root.querySelector('.oreon-product-index__side'),
      title:root && root.querySelector('#oreon-panel-title'),
      desc:root && root.querySelector('#oreon-panel-desc'),
      count:root && root.querySelector('#oreon-filter-count'),
      empty:root && root.querySelector('#oreon-product-empty')
    };
  }
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      /* ONLY the product grid / its cards. Existing hero and sidebar remain untouched. */
      '@media(min-width:1024px){',
      '#oreon-live-products #oreon-product-grid{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:38px 20px!important;align-items:start!important;}',
      '}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1{min-width:0;text-decoration:none;color:#fff;text-align:center;display:block;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1.is-hidden{display:none!important;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 .oreon-filter-card__image{position:relative;aspect-ratio:1/1;overflow:hidden;background:linear-gradient(180deg,#07101d,#0a1320);border:1px solid rgba(120,148,208,.35);border-radius:4px;transition:transform .38s ease,filter .38s ease,border-color .38s ease,box-shadow .38s ease;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1:hover .oreon-filter-card__image,#oreon-live-products #oreon-product-grid>.oreon-board-card-v1:focus-visible .oreon-filter-card__image{transform:scale(1.012);filter:brightness(1.06) saturate(1.06);border-color:rgba(82,204,255,.95)!important;box-shadow:0 0 0 1px rgba(82,204,255,.28),0 0 20px rgba(70,180,240,.18)!important;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 .oreon-filter-card__image--photo img{position:absolute;left:50%;top:50%;width:78%;height:88%;transform:translate(-50%,-50%);object-fit:contain;object-position:center;display:block;background:transparent;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 h3{font:400 19px/1.25 Outfit,Arial,sans-serif;color:#f1f4f8;margin:17px 0 6px;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 p{font:300 13px/1.55 "IBM Plex Sans",Arial,sans-serif;color:#8a96aa;margin:0;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 .oreon-filter-card__detail-arrow{position:absolute;right:11px;bottom:11px;z-index:4;width:27.3px;height:27.3px;border:1.1px solid #95dfff;border-radius:50%;display:flex;align-items:center;justify-content:center;background:transparent;color:#95dfff;pointer-events:none;transition:border-color .32s ease,transform .32s ease;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 .oreon-filter-card__detail-arrow svg{display:block;width:14.7px;height:14.7px;}',
      '#oreon-live-products #oreon-product-grid>.oreon-board-card-v1:hover .oreon-filter-card__detail-arrow{border-color:#b6edff;color:#b6edff;transform:translateX(2px);}',
      '@media(prefers-reduced-motion:reduce){#oreon-live-products #oreon-product-grid>.oreon-board-card-v1 *{transition:none!important}}'
    ].join('');
    document.head.appendChild(style);
  }
  function boardFromDocument(doc) {
    var exact = doc.getElementById && doc.getElementById(BOARD_ID);
    if (exact && exact.querySelector('.list-style-card a.post_link_wrap')) return exact;
    var section = doc.getElementById && doc.getElementById('s202610106ac0b6c8e8611');
    if (section) {
      var candidate=section.querySelector('.list-style-card a.post_link_wrap');
      if(candidate) return candidate.closest('[id^="w"]')||candidate.closest('.widget')||section;
    }
    var fallback=Array.prototype.find.call(doc.querySelectorAll('.list-style-card a.post_link_wrap'),function(a){
      return !a.closest('#'+ROOT_ID);
    });
    return fallback && (fallback.closest('[id^="w"]') || fallback.closest('.widget') || fallback.parentElement);
  }
  function getName(tile){
    var title=tile.querySelector('.title');
    if(!title)return '';
    var copy=title.cloneNode(true);
    copy.querySelectorAll('em,span,.icons').forEach(function(el){el.remove()});
    return norm(copy.textContent);
  }
  function getCategories(tile){
    var title=tile.querySelector('.title');
    if(!title)return [];
    var ems=Array.prototype.map.call(title.querySelectorAll('em'),function(el){return norm(el.textContent)});
    return ems.filter(function(t){return /^\[.+\]$/.test(t)}).map(category);
  }
  function imageUrl(tile){
    var visual=tile.querySelector('._card');
    var bg=visual ? (visual.style.backgroundImage || (visual.ownerDocument===document ? getComputedStyle(visual).backgroundImage : '')) : '';
    var match=bg.match(/url\(\s*["']?([^"')]+)["']?\s*\)/);
    var image=match&&match[1]||'';
    if(!image||/no[_-]?image|placeholder|blank\.gif/i.test(image)){
      var im=tile.querySelector('img[data-src],img[src],img[data-original]');
      image=im && (im.getAttribute('data-src')||im.getAttribute('data-original')||im.getAttribute('src')) || '';
    }
    if(!image||/^data:image\/svg/i.test(image))return '';
    try{var u=new URL(image,location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch(e){return ''}
  }
  function parse(board){
    var tiles=Array.prototype.filter.call(board.querySelectorAll('.list-style-card'),function(t){return t.querySelector('a.post_link_wrap')});
    if(!tiles.length)return [];
    var arr=[];
    tiles.forEach(function(tile){
      var name=getName(tile),link=tile.querySelector('a.post_link_wrap');
      if(!name||!link)return;
      var href='';try{var u=new URL(link.getAttribute('href'),location.href);if(u.origin===location.origin)href=u.href}catch(e){}
      if(!href)return;
      var cats=getCategories(tile);
      arr.push({name:name,href:href,id:new URL(href).searchParams.get('idx')||'',cats:cats,image:imageUrl(tile),excerpt:norm(tile.querySelector('.text-block')?.textContent||'')});
    });
    arr.sort(function(a,b){
      var ac=a.cats[0]||'',bc=b.cats[0]||'';
      var ar=ORDER.indexOf(ac),br=ORDER.indexOf(bc);
      if(ar<0)ar=999;if(br<0)br=999;if(ar!==br)return ar-br;
      if(ac!==bc)return ac<bc?-1:1;
      var ai=FIXED_IDS.indexOf(a.id),bi=FIXED_IDS.indexOf(b.id);
      if(ai<0)ai=999;if(bi<0)bi=999;if(ai!==bi)return ai-bi;
      return a.id.localeCompare(b.id,undefined,{numeric:true});
    });
    return arr;
  }
  function cardFor(p){
    var card=document.createElement('a');card.className='oreon-filter-card oreon-board-card-v1';card.href=p.href;
    card.dataset.cats=p.cats.join('|');card.dataset.nameKey=norm(p.name).normalize('NFKC').toLowerCase();
    var box=document.createElement('div');box.className='oreon-filter-card__image'+(p.image?' oreon-filter-card__image--photo':'');
    if(p.image){
      var im=document.createElement('img');im.src=p.image;im.alt=p.name;im.loading='lazy';
      im.onerror=function(){if(!im.isConnected)return;im.remove();box.classList.remove('oreon-filter-card__image--photo');addFallback(box,p)};
      box.appendChild(im);
    }else addFallback(box,p);
    var arrow=document.createElement('span');arrow.className='oreon-filter-card__detail-arrow';arrow.setAttribute('aria-hidden','true');
    arrow.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>';
    box.appendChild(arrow);
    var title=document.createElement('h3');title.textContent=p.name;card.append(box,title);
    if(p.excerpt){var desc=document.createElement('p');desc.textContent=p.excerpt;card.appendChild(desc)}
    return card;
  }
  function addFallback(box,p){
    var m=document.createElement('span');m.className='oreon-filter-card__material';m.textContent=p.cats.join(' / ');
    var g=document.createElement('span');g.className='oreon-filter-card__ghost';g.textContent=p.name.charAt(0);
    box.append(m,g);
  }
  function initialCategory(ui){
    var q=new URL(location.href).searchParams.get('oreon_category')||new URL(location.href).searchParams.get('cat');
    if(q&&COPY[category(q)])return category(q);
    var active=ui.aside && ui.aside.querySelector('.oreon-filter-btn.is-active');
    return active && COPY[category(active.dataset.filter)]?category(active.dataset.filter):'ALL';
  }
  function showFilter(ui,cat){
    if(!records.length)return;
    current=COPY[cat]?cat:'ALL';
    var seen=new Set(),shown=0;
    ui.grid.querySelectorAll('.oreon-board-card-v1').forEach(function(card){
      var matches=current==='ALL'||(card.dataset.cats||'').split('|').indexOf(current)>=0;
      if(matches&&seen.has(card.dataset.nameKey))matches=false;
      if(matches){seen.add(card.dataset.nameKey);shown++}
      card.classList.toggle('is-hidden',!matches);
      card.hidden=!matches;
    });
    if(ui.count)ui.count.textContent=shown+' PRODUCT'+(shown===1?'':'S');
    if(ui.empty)ui.empty.classList.toggle('is-visible',shown===0);
    if(ui.aside){
      ui.aside.querySelectorAll('.oreon-filter-btn').forEach(function(btn){
        var active=category(btn.dataset.filter)===current;
        btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));
      });
    }
    // This is the existing sidebar's expected behavior; do not alter its design.
    var copy=COPY[current];
    if(copy&&ui.title)ui.title.textContent=copy[0];
    if(copy&&ui.desc)ui.desc.textContent=copy[1];
    try{window.parent.postMessage({type:'oreon-products-height',height:document.documentElement.scrollHeight},'*')}catch(e){}
  }
  function draw(products,source){
    if(!isPC()||!products.length)return false;
    var root=document.getElementById(ROOT_ID);if(!root)return false;
    var ui=inner(root);if(!ui.grid||!ui.aside)return false;
    var signature=products.map(function(x){return x.href+'|'+x.name+'|'+x.cats.join(',')+'|'+x.image}).join(';');
    if(signature===lastSignature&&ui.grid.querySelectorAll('.oreon-board-card-v1').length===products.length)return true;
    busy=true;
    records=products;lastSignature=signature;lastGrid=ui.grid;
    ui.grid.querySelectorAll('a.oreon-filter-card').forEach(function(el){el.remove()});
    var frag=document.createDocumentFragment();products.forEach(function(p){frag.appendChild(cardFor(p))});
    ui.grid.insertBefore(frag,ui.empty||null);
    if(ui.empty){ui.empty.classList.remove('is-visible');ui.empty.textContent='Products for this category will be added here.'}
    // Existing Imweb board stays as the source and remains editable in Imweb.
    if(source && source.ownerDocument===document && source!==root){
      sourceWidget=source;source.hidden=true;source.style.setProperty('display','none','important');
    }
    showFilter(ui,initialCategory(ui));
    busy=false;
    if(!installed){
      installed=true;
      // Run before Rebuild's old click listener, whose original card array is empty.
      ui.aside.addEventListener('click',function(ev){
        if(!isPC()||!records.length)return;
        var button=ev.target.closest('.oreon-filter-btn');if(!button)return;
        ev.preventDefault();ev.stopImmediatePropagation();
        var next=category(button.dataset.filter);showFilter(ui,next);
        try{var url=new URL(location.href);if(next==='ALL')url.searchParams.delete('cat');else url.searchParams.set('cat',next);history.replaceState(null,'',url.pathname+url.search+url.hash)}catch(e){}
      },true);
      window.addEventListener('popstate',function(){if(isPC())showFilter(inner(document.getElementById(ROOT_ID)),initialCategory(inner(document.getElementById(ROOT_ID))))});
      // Original Rebuild may append its own cards later; keep this one card view.
      new MutationObserver(function(mutations){
        if(busy||!isPC()||!records.length)return;
        var grid=document.getElementById(GRID_ID);if(!grid)return;
        var extras=grid.querySelectorAll('a.oreon-filter-card:not(.oreon-board-card-v1)');
        if(extras.length){busy=true;extras.forEach(function(x){x.remove()});busy=false;}
      }).observe(ui.grid,{childList:true});
    }
    console.info('[OREON Products cards] Rendered',products.length,'native board records. ALL deduplicates repeated names.');
    return true;
  }
  function tryFromDOM(){
    if(!isPC())return false;
    var board=boardFromDocument(document);
    if(!board)return false;
    var parsed=parse(board);
    return parsed.length?draw(parsed,board):false;
  }
  function tryFromPage(){
    if(triedFetch||!isPC())return;
    triedFetch=true;
    var url=new URL('/47',location.origin);
    url.searchParams.set('oreon_board_read','1');
    fetch(url.href,{credentials:'same-origin',cache:'no-store'}).then(function(r){if(!r.ok)throw Error('HTTP '+r.status);return r.text()}).then(function(html){
      if(tryFromDOM())return;
      var doc=new DOMParser().parseFromString(html,'text/html');
      var board=boardFromDocument(doc);
      var parsed=board&&parse(board)||[];
      if(parsed.length)draw(parsed,null);
      else if(!shownError){shownError=true;console.warn('[OREON Products cards] Published page does not contain native board cards. Check the Imweb board widget output. Existing Product Portfolio left unchanged.');}
    }).catch(function(err){console.warn('[OREON Products cards] Unable to read same-origin board page:',err.message)});
  }
  function boot(){
    if(!isPC()||new URL(location.href).searchParams.get('bmode')==='view')return;
    ensureStyle();
    if(tryFromDOM())return;
    var watch=new MutationObserver(function(){
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(function(){scheduled=false;if(tryFromDOM())watch.disconnect()});
    });
    watch.observe(document.documentElement,{childList:true,subtree:true});
    window.addEventListener('load',tryFromDOM,{once:true});
    setTimeout(tryFromDOM,1200);
    setTimeout(function(){if(!tryFromDOM())tryFromPage()},3200);
    setTimeout(function(){watch.disconnect();if(!records.length)tryFromPage()},12000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
