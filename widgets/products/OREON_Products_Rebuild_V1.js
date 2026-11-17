/* OREON Products PC reconstruction — single-file integration. */
/* OREON Products board layout. Load on the Imweb Products page. */
(function () {
  'use strict';
  if (window.__oreonProductsLoaderV1) return;
  window.__oreonProductsLoaderV1 = true;
  var style = document.createElement('style');
  style.id = 'oreon-products-board-style';
  style.textContent = "\n\n.oreon-product-index,.oreon-product-index *{box-sizing:border-box}\n.oreon-product-index{\n  position:relative;\n  z-index:5;\n  width:100%;\n  background:#02040b;\n  margin-top:0;\n  color:#eef1f6;\n  font-family:'IBM Plex Sans',Arial,sans-serif;\n}\n\n\n\n\n\n/* CATEGORY INTRO \u2014 separated visual section like the reference */\n.oreon-category-stage{\n  position:relative;\n  min-height:390px;\n  padding:82px 24px 68px;\n  display:flex;\n  align-items:flex-start;\n  justify-content:center;\n  text-align:center;\n  overflow:hidden;\n  border-bottom:1px solid rgba(255,255,255,.075);\n  background:\n    radial-gradient(ellipse 48% 52% at 50% -2%,\n      rgba(48,112,255,.76) 0%,\n      rgba(33,88,206,.34) 30%,\n      rgba(12,30,74,.14) 56%,\n      rgba(2,4,11,0) 77%),\n    #02040b;\n}\n.oreon-category-stage::before{\n  content:\"\";\n  position:absolute;\n  left:50%;top:-54px;\n  width:min(780px,72vw);height:180px;\n  transform:translateX(-50%);\n  background:radial-gradient(ellipse at center,\n    rgba(79,143,255,.28) 0%,\n    rgba(38,91,210,.13) 42%,\n    transparent 72%);\n  filter:blur(18px);\n  pointer-events:none;\n}\n.oreon-category-stage__inner{\n  position:relative;z-index:1;\n  width:100%;max-width:820px;\n  margin-top:0;\n}\n\n/* ALL/category intro rises from below when it enters the viewport */\n.oreon-category-stage__inner.oreon-stage-reveal-ready{\n  opacity:0;\n  transform:translateY(70px);\n  transition:\n    opacity .72s ease,\n    transform .9s cubic-bezier(.16,1,.3,1);\n  will-change:opacity,transform;\n}\n.oreon-category-stage__inner.oreon-stage-reveal-ready.oreon-stage-revealed{\n  opacity:1;\n  transform:translateY(0);\n}\n.oreon-product-index__title{\n  margin:0;\n  font:300 clamp(46px,4.2vw,62px)/1.05 'Outfit',sans-serif;\n  letter-spacing:-.025em;\n  color:#f4f7fc;\n}\n.oreon-product-index__desc{\n  margin:22px auto 0;\n  max-width:720px;\n  white-space:pre-line;\n  font:300 clamp(14px,1.08vw,17px)/1.9 'IBM Plex Sans',Arial,sans-serif;\n  color:#c4ccd9;\n}\n.oreon-category-stage__count{\n  margin-top:18px;\n  font:300 11px/1 'IBM Plex Sans',Arial,sans-serif;\n  color:#617087;\n  letter-spacing:.13em;\n  text-transform:uppercase;\n}\n\n/* PRODUCT BODY \u2014 left menu + product cards */\n.oreon-product-body{\n  width:100%;\n  padding:32px 0 112px;\n  background:linear-gradient(180deg,#02040b 0%,#040914 54%,#02040b 100%);\n}\n.oreon-product-body__inner{\n  width:100%;\n  max-width:1440px;\n  margin:0 auto;\n  padding:0 clamp(24px,5vw,72px);\n  display:grid;\n  grid-template-columns:150px minmax(0,1fr);\n  gap:32px;\n  align-items:start;\n}\n.oreon-product-index__side{\n  position:sticky;\n  top:28px;\n  display:flex;\n  flex-direction:column;\n  align-items:stretch;\n  padding-top:2px;\n}\n.oreon-filter-btn{\n  appearance:none;border:0;background:transparent;text-align:left;\n  color:#8f9aae;\n  font:400 15px/1.3 'Outfit',sans-serif;\n  padding:10px 0;\n  cursor:pointer;\n  transition:color .22s ease,transform .22s ease;\n}\n.oreon-filter-btn:hover{color:#e4eaf4;transform:translateX(2px)}\n.oreon-filter-btn.is-active{color:#fff;font-weight:600}\n.oreon-filter-btn.is-active::after{display:none}\n\n.oreon-product-grid{\n  display:grid;\n  grid-template-columns:repeat(5,minmax(0,1fr));\n  gap:38px 20px;\n  min-height:260px;\n}\n.oreon-filter-card{\n  display:block;\n  min-width:0;\n  text-decoration:none;\n  color:#fff;\n  text-align:center;\n  opacity:1;\n  transform:translateY(0);\n  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.7,.2,1);\n}\n.oreon-filter-card.is-hidden{display:none}\n.oreon-filter-card.is-entering{opacity:0;transform:translateY(16px)}\n.oreon-filter-card__image{\n  position:relative;\n  aspect-ratio:1/1;\n  overflow:hidden;\n  border-radius:4px;\n  background:#111b39;\n  border:1px solid rgba(120,148,208,.34);\n  transition:transform .38s ease,filter .38s ease,border-color .38s ease;\n}\na.oreon-filter-card:hover .oreon-filter-card__image{\n  transform:scale(1.012);\n  filter:brightness(1.06) saturate(1.06);\n  border-color:rgba(79,195,247,.24);\n}\n.oreon-filter-card__image--photo{\n  background:\n    radial-gradient(circle at 50% 42%,rgba(38,87,150,.13),transparent 42%),\n    linear-gradient(180deg,#07101d 0%,#0a1320 100%);\n  border-color:rgba(255,255,255,.04);\n}\n.oreon-filter-card__image--photo img{\n  position:absolute;\n  left:50%;\n  top:50%;\n  width:78%;\n  height:88%;\n  transform:translate(-50%,-50%);\n  object-fit:contain;\n  object-position:center center;\n  display:block;\n  background:transparent;\n}\n.oreon-filter-card__material{\n  position:absolute;left:16px;top:15px;z-index:2;\n  font:500 10px/1 'Outfit',sans-serif;\n  letter-spacing:.16em;text-transform:uppercase;\n  color:rgba(255,255,255,.72);\n}\n.oreon-filter-card__ghost{\n  position:absolute;right:-2px;bottom:-25px;\n  font:300 150px/.8 'Outfit',sans-serif;color:rgba(255,255,255,.055);\n}\n.oreon-filter-card__image::before{\n  content:\"\";\n  position:absolute;inset:0;\n  background:radial-gradient(circle at 72% 26%,rgba(83,151,255,.15),transparent 35%);\n}\n.oreon-filter-card__image--photo::before{display:none}\n.oreon-filter-card h3{\n  margin:17px 0 6px;\n  font:400 19px/1.25 'Outfit',sans-serif;\n  color:#f1f4f8;\n}\n.oreon-filter-card p{\n  margin:0;\n  font:300 13px/1.55 'IBM Plex Sans',sans-serif;\n  color:#8a96aa;\n}\n\n.oreon-filter-card__image--placeholder{\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  background:#111a36;\n  border:1px dashed rgba(133,159,215,.46);\n}\n.oreon-filter-card__placeholder-label{\n  color:#9aa7bd;\n  font:500 12px/1.2 'IBM Plex Sans',Arial,sans-serif;\n  letter-spacing:.01em;\n}\n\n.oreon-product-empty{\n  display:none;\n  grid-column:1/-1;\n  padding:70px 0;\n  border-top:1px solid rgba(255,255,255,.06);\n  color:#657186;\n  text-align:center;\n  font:300 14px/1.7 'IBM Plex Sans',sans-serif;\n}\n.oreon-product-empty.is-visible{display:block}\n\n@media(max-width:1180px){\n  .oreon-product-grid{grid-template-columns:repeat(4,minmax(0,1fr))}\n}\n@media(max-width:960px){\n  .oreon-product-grid{grid-template-columns:repeat(3,minmax(0,1fr))}\n}\n@media(max-width:820px){\n  .oreon-category-stage{min-height:320px;padding:72px 22px 60px}\n  .oreon-product-body{padding-top:38px}\n  .oreon-product-body__inner{grid-template-columns:1fr;gap:26px}\n  .oreon-product-index__side{\n    position:static;\n    flex-direction:row;\n    gap:8px 20px;\n    overflow-x:auto;\n    padding-bottom:8px;\n    scrollbar-width:none;\n  }\n  .oreon-product-index__side::-webkit-scrollbar{display:none}\n  .oreon-filter-btn{flex:0 0 auto;padding:6px 0}\n  .oreon-product-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 16px}\n}\n@media(max-width:520px){\n  .oreon-product-body__inner{padding:0 18px}\n  .oreon-product-grid{grid-template-columns:1fr 1fr;gap:26px 12px}\n  .oreon-filter-card h3{font-size:16px;margin-top:13px}\n  .oreon-filter-card p{font-size:11px}\n}\n@media(prefers-reduced-motion:reduce){.oreon-filter-card,.oreon-filter-card__image,.oreon-filter-btn{transition:none!important}.oreon-category-stage__inner.oreon-stage-reveal-ready{opacity:1!important;transform:none!important;transition:none!important}}\n#oreon-live-products{width:100vw;max-width:none;margin-left:calc(50% - 50vw)}\n#oreon-live-products button:focus-visible,#oreon-live-products a:focus-visible{outline:2px solid #4fc3f7;outline-offset:4px}\n#oreon-live-products .oreon-filter-card[hidden]{display:none!important}\n";
  document.head.appendChild(style);
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap";
  document.head.appendChild(font);
  /* OREON Products listing: rebuilt mount and filters, 2026-11-17.
   * The visual shell is independent of Imweb board rendering timing.
   * Product data always comes from the existing Imweb native board.
   * No data or category is fabricated. Detail pages remain untouched.
   */
  var EXTRA_STYLE_ID = 'oreon-products-rebuild-safety';
  if (!document.getElementById(EXTRA_STYLE_ID)) {
    var extra = document.createElement('style');
    extra.id = EXTRA_STYLE_ID;
    extra.textContent = [
      '#oreon-live-products .oreon-product-empty.is-visible{display:block}',
      '#oreon-live-products .oreon-category-stage__inner{max-width:980px}',
      '#oreon-live-products .oreon-product-index__title{overflow-wrap:normal}',
      '@media(max-width:767px){#oreon-live-products .oreon-product-index__title{font-size:clamp(30px,8vw,48px)}}'
    ].join('');
    document.head.appendChild(extra);
  }

  function run() {
    'use strict';
    var PRODUCT_WIDGET_ID = 'w202610106ffb71b28cee8';
    var SECTION_ID = 's202610106ac0b6c8e8611';
    var HERO_SECTION_ID = 's2026101004845a3685ea4';
    var categories = ['ALL','ECM','CaHA','rH Collagen','PNAD+','PNLA','PLLA','PN','HA','Exosome','PDO','TCA','CA'];
    var categoryOrder = ['ECM','CaHA','rH Collagen','PNAD+','PNLA','PLLA','PN','HA','Exosome','PDO','TCA','CA'];
    var fixedIds = ['175035692','175035689','175035679','175035674','175035672','175035666','175035662','175035659','175035655','175035648','175035639','175035626','175035584','175035591','175035573','175035450','175035438','175035434'];
    var panelCopy = {
      ALL:['Product Portfolio','The complete OREON product lineup.\nExplore every biomaterial solution in one place.'],
      ECM:['ECM',"Extracellular Matrix biomaterials that recreate the skin's structural environment.\nDesigned to support regeneration and deliver natural, lasting results."],
      CaHA:['CaHA','Calcium hydroxyapatite biomaterials that provide structural support.\nDesigned to restore volume and stimulate natural collagen for lasting results.'],
      'rH Collagen':['rH Collagen','Recombinant human collagen biomaterials with high purity and consistent quality.\nDesigned to support skin structure, firmness, and elasticity.'],
      'PNAD+':['PNAD+','Nicotinamide adenine dinucleotide, a core coenzyme of cellular energy metabolism.\nDesigned to support skin cell vitality and renewal.'],
      PNLA:['PNLA','PLLA combined with PN for a dual-action approach to skin regeneration.\nDesigned to improve firmness, elasticity, and skin quality over time.'],
      PLLA:['PLLA','Products for this category will be added here.'],
      PN:['PN','Polynucleotide biomaterials that support skin repair and regeneration.\nDesigned to improve hydration, elasticity, and overall skin quality.'],
      HA:['HA','Hyaluronic acid products for face and body contouring.\nDesigned for natural volume, smooth injectability, and stable results.'],
      Exosome:['Exosome','Exosome-based solutions that carry signals for cellular communication.\nDesigned to support skin regeneration and renewal.'],
      PDO:['PDO','Absorbable threads for lifting and skin tightening.\nDesigned for natural contouring and lasting support.'],
      TCA:['TCA','Products for this category will be added here.'],
      CA:['CA','Products for this category will be added here.']
    };
    if (new URL(location.href).searchParams.get('bmode') === 'view') return;

    function categoryKey(raw){
      var value=String(raw||'').replace(/^\[|\]$/g,'').trim();
      if(/^NAD\+$/i.test(value))return 'PNAD+';
      return categories.find(function(c){return c.toLowerCase()===value.toLowerCase()})||value;
    }
    function selectedFromUrl(){
      var url=new URL(location.href);
      var cat=categoryKey(url.searchParams.get('oreon_category')||url.searchParams.get('cat')||'ALL');
      return categories.indexOf(cat)>=0?cat:'ALL';
    }
    function setUrlCategory(cat){
      try {
        var url=new URL(location.href);
        url.searchParams.delete('oreon_category');
        if(cat==='ALL')url.searchParams.delete('cat');
        else url.searchParams.set('cat',cat);
        history.replaceState(null,'',url.pathname+url.search+url.hash);
      } catch(e){}
    }
    function makeEl(tag,cls,text){
      var el=document.createElement(tag);if(cls)el.className=cls;
      if(text!=null)el.textContent=text;return el;
    }
    function makeRoot(){
      var existing=document.getElementById('oreon-live-products');
      if(existing)return existing;
      var root=makeEl('section','oreon-product-index');
      root.id='oreon-live-products';root.setAttribute('aria-label','OREON product portfolio');
      var stage=makeEl('div','oreon-category-stage');
      var inner=makeEl('div','oreon-category-stage__inner');
      var heading=makeEl('h2','oreon-product-index__title','Product Portfolio');heading.id='oreon-panel-title';
      var desc=makeEl('p','oreon-product-index__desc',panelCopy.ALL[1]);desc.id='oreon-panel-desc';
      var count=makeEl('div','oreon-category-stage__count','0 PRODUCTS');count.id='oreon-filter-count';
      inner.append(heading,desc,count);stage.appendChild(inner);
      var body=makeEl('div','oreon-product-body');
      var bodyInner=makeEl('div','oreon-product-body__inner');
      var aside=makeEl('aside','oreon-product-index__side');aside.setAttribute('aria-label','Product material filters');
      categories.forEach(function(cat){
        var btn=makeEl('button','oreon-filter-btn'+(cat==='ALL'?' is-active':''),cat);
        btn.type='button';btn.dataset.filter=cat;btn.setAttribute('aria-pressed',String(cat==='ALL'));aside.appendChild(btn);
      });
      var grid=makeEl('div','oreon-product-grid');grid.id='oreon-product-grid';
      var empty=makeEl('div','oreon-product-empty is-visible','Loading product information…');empty.id='oreon-product-empty';
      grid.appendChild(empty);bodyInner.append(aside,grid);body.appendChild(bodyInner);root.append(stage,body);

      var native=document.getElementById(PRODUCT_WIDGET_ID);
      var section=document.getElementById(SECTION_ID);
      var hero=document.getElementById(HERO_SECTION_ID);
      if(native&&native.parentNode){native.parentNode.insertBefore(root,native)}
      else if(section){
        // Mount within the original Products section, preserving the hero/cover layout.
        var mountPoint=section.querySelector('._section_inner') || section.querySelector('.inside') || section;
        mountPoint.insertBefore(root,mountPoint.firstChild);
      }
      else if(hero&&hero.parentNode){hero.after(root)}
      else {document.body.appendChild(root)}
      revealStage(inner);
      return root;
    }
    function revealStage(inner){
      if(!inner)return;
      var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      if(reduced||!('IntersectionObserver' in window))return;
      inner.classList.add('oreon-stage-reveal-ready');
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){if(entry.isIntersecting){inner.classList.add('oreon-stage-revealed');obs.unobserve(inner)}});
      },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
      obs.observe(inner);
      function fallback(){
        if(inner.classList.contains('oreon-stage-revealed'))return;
        var r=inner.getBoundingClientRect();
        if(r.top<inner.ownerDocument.defaultView.innerHeight*.92&&r.bottom>0){inner.classList.add('oreon-stage-revealed');window.removeEventListener('scroll',fallback)}
      }
      window.addEventListener('scroll',fallback,{passive:true});fallback();
    }
    var root=makeRoot(),grid=root.querySelector('#oreon-product-grid'),empty=root.querySelector('#oreon-product-empty');
    var heading=root.querySelector('#oreon-panel-title'),desc=root.querySelector('#oreon-panel-desc'),count=root.querySelector('#oreon-filter-count');
    var aside=root.querySelector('.oreon-product-index__side');
    var currentCategory=selectedFromUrl();
    var cards=[],sourceWidget=null,lastSignature='',timer=null;
    function source(){
      var exact=document.getElementById(PRODUCT_WIDGET_ID);
      if(exact)return exact;
      var section=document.getElementById(SECTION_ID);
      var link=section&&section.querySelector('.list-style-card a.post_link_wrap');
      if(link)return link.closest('[id^="w"]')||link.closest('.widget')||section;
      // The Imweb board can be moved to another same-page section on mobile edits.
      var fallback=Array.from(document.querySelectorAll('.list-style-card a.post_link_wrap'))
        .find(function(link){return !link.closest('#oreon-live-products')});
      return fallback&&(fallback.closest('[id^="w"]')||fallback.parentElement);
    }
    function plainName(nativeTile){
      var nativeTitle=nativeTile.querySelector('.title');
      if(!nativeTitle)return '';
      var clone=nativeTitle.cloneNode(true);
      clone.querySelectorAll('span,em,.icons').forEach(function(x){x.remove()});
      return clone.textContent.replace(/\s+/g,' ').trim();
    }
    function allCategories(nativeTile){
      var title=nativeTile.querySelector('.title');if(!title)return [];
      return Array.from(title.querySelectorAll('em'))
        .map(function(el){return el.textContent.trim()})
        .filter(function(t){return /^\[.+\]$/.test(t)})
        .map(categoryKey);
    }
    function sortingKey(tile){
      var cats=allCategories(tile),cat=(cats[0]||'').toLowerCase();
      var rank=categoryOrder.findIndex(function(c){return c.toLowerCase()===cat});
      var link=tile.querySelector('a.post_link_wrap');
      var idx='';try{idx=new URL(link.getAttribute('href'),location.href).searchParams.get('idx')||''}catch(e){}
      var fixed=fixedIds.indexOf(idx);
      return [rank<0?999:rank,cat,fixed<0?999:fixed,idx];
    }
    function compare(a,b){
      var aa=sortingKey(a),bb=sortingKey(b);
      for(var i=0;i<3;i++)if(aa[i]!==bb[i])return aa[i]<bb[i]?-1:1;
      if(/^\d+$/.test(aa[3])&&/^\d+$/.test(bb[3])&&aa[3].length!==bb[3].length)return aa[3].length-bb[3].length;
      return aa[3]===bb[3]?0:(aa[3]<bb[3]?-1:1);
    }
    function makeCard(tile){
      var name=plainName(tile);if(!name)return null;
      var link=tile.querySelector('a.post_link_wrap');if(!link)return null;
      var url;try{url=new URL(link.getAttribute('href'),location.href)}catch(e){return null}
      if(url.origin!==location.origin)return null;
      var cats=allCategories(tile);
      var card=makeEl('a','oreon-filter-card');card.href=url.href;card.dataset.cats=cats.join('|');
      var picture=makeEl('div','oreon-filter-card__image');
      var visual=tile.querySelector('._card');
      var bg=visual?(visual.style.backgroundImage||getComputedStyle(visual).backgroundImage):'';
      var match=bg.match(/url\(["']?(.*?)["']?\)/);
      var imageSrc=match?match[1]:'';
      if(!imageSrc||/no-image\.png/i.test(imageSrc)){
        var im=tile.querySelector('img[src],img[data-src]');imageSrc=im&&(im.getAttribute('data-src')||im.getAttribute('src'))||'';
      }
      if(imageSrc){
        try{var resolved=new URL(imageSrc,location.href);
          if(/^https?:$/.test(resolved.protocol)){
            picture.classList.add('oreon-filter-card__image--photo');
            var image=makeEl('img');image.src=resolved.href;image.alt=name;image.loading='lazy';picture.appendChild(image);
          }
        }catch(e){}
      }
      if(!picture.firstChild){
        var material=makeEl('span','oreon-filter-card__material',cats.join(' / '));
        var ghost=makeEl('span','oreon-filter-card__ghost',name.charAt(0));picture.append(material,ghost);
      }
      card.append(picture,makeEl('h3','',name));
      var excerpt=tile.querySelector('.text-block');
      if(excerpt&&excerpt.textContent.trim())card.appendChild(makeEl('p','',excerpt.textContent.trim()));
      return card;
    }
    function applyFilter(filter){
      currentCategory=filter;
      var copy=panelCopy[filter]||[filter,''];
      heading.textContent=copy[0];desc.textContent=copy[1];
      var shown=0,seen=new Set();
      cards.forEach(function(card){
        var matches=filter==='ALL'||(card.dataset.cats||'').split('|').indexOf(filter)>=0;
        var key=(card.querySelector('h3')?.textContent||'').normalize('NFKC').replace(/\s+/g,' ').trim().toLowerCase();
        if(matches&&key&&seen.has(key))matches=false;
        if(matches){seen.add(key);shown++}
        card.classList.toggle('is-hidden',!matches);
      });
      aside.querySelectorAll('.oreon-filter-btn').forEach(function(btn){
        var active=btn.dataset.filter===filter;
        btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));
      });
      count.textContent=shown+' PRODUCT'+(shown===1?'':'S');
      if(!cards.length){empty.textContent='Product information is not available on this page.';empty.classList.add('is-visible')}
      else if(!shown){empty.textContent='Products for this category will be added here.';empty.classList.add('is-visible')}
      else empty.classList.remove('is-visible');
      try{window.parent.postMessage({type:'oreon-products-height',height:document.documentElement.scrollHeight},'*')}catch(e){}
    }
    aside.addEventListener('click',function(ev){
      var btn=ev.target.closest('.oreon-filter-btn');if(!btn)return;
      var cat=categoryKey(btn.dataset.filter);applyFilter(cat);setUrlCategory(cat);
    });
    window.addEventListener('popstate',function(){applyFilter(selectedFromUrl())});
    function populate(){
      var native=source();if(!native)return false;
      var tiles=Array.from(native.querySelectorAll('.list-style-card')).filter(function(t){return !!t.querySelector('a.post_link_wrap')});
      if(!tiles.length)return false;
      var signature=tiles.map(function(t){return (t.querySelector('a.post_link_wrap')?.getAttribute('href')||'')+'|'+plainName(t)+'|'+allCategories(t).join(',')}).join(';');
      if(signature===lastSignature)return true;
      var boardTotalNode=native.querySelector('.board-head .heading em');
      var reported=boardTotalNode?Number(boardTotalNode.textContent.replace(/[^0-9]/g,'')):NaN;
      var unique=new Set(tiles.map(function(t){return plainName(t).normalize('NFKC').toLowerCase()}));
      if(Number.isFinite(reported)&&reported!==tiles.length&&reported!==unique.size){
        console.warn('[OREON Products] Visible board list may be incomplete:',{reported:reported,cards:tiles.length,unique:unique.size});
        return false; // Never invent missing product records.
      }
      var sorted=tiles.slice().sort(compare);var result=[];
      sorted.forEach(function(tile){var card=makeCard(tile);if(card)result.push(card)});
      if(!result.length)return false;
      cards.forEach(function(card){card.remove()});cards=result;
      result.forEach(function(card){grid.insertBefore(card,empty)});
      lastSignature=signature;sourceWidget=native;
      if(native!==root){native.hidden=true;native.style.setProperty('display','none','important')}
      applyFilter(currentCategory);
      return true;
    }
    applyFilter(currentCategory);
    // The page can hydrate the Imweb board after our JS has executed.
    var observer=new MutationObserver(function(mutations){
      if(mutations.every(function(m){return root.contains(m.target)}))return;
      if(timer)clearTimeout(timer);
      timer=setTimeout(populate,100);
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
    populate();
    window.addEventListener('load',populate);
    setTimeout(populate,650);
    setTimeout(populate,2200);
    setTimeout(populate,6500);
    setTimeout(function(){
      populate();
      if(!cards.length){
        console.warn('[OREON Products] Native Imweb board data is absent on the published page. Please publish/restore original board widget '+PRODUCT_WIDGET_ID+'.');
      }
    },12000);
    setTimeout(function(){observer.disconnect()},60000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();

/* V2: cover transition and soft blue breathing glow. */
(function () {
  'use strict';
  if (new URL(location.href).searchParams.get('bmode') === 'view') return;
  var css = document.createElement('style');
  css.textContent = `
  #oreon-products-scroll-stack{position:relative;isolation:isolate;overflow:visible}
  #oreon-products-scroll-stack>.oreon-sticky-hero{position:sticky!important;top:var(--oreon-pin-top,0px)!important;z-index:0!important}
  #oreon-products-scroll-stack>.oreon-cover-section{position:relative!important;z-index:2!important;background:#02040b!important}
  #oreon-live-products .oreon-category-stage{isolation:isolate;background:#02040b!important}
  #oreon-live-products .oreon-category-stage::before{display:none!important}
  #oreon-live-products .oreon-category-stage__inner{z-index:2}
  #oreon-live-products .oreon-blue-glow{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity 2.4s ease}
  #oreon-live-products .oreon-blue-glow.is-visible{opacity:1}
  #oreon-live-products .oreon-blue-glow::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 48% 52% at 50% -2%,rgba(48,112,255,.76) 0%,rgba(33,88,206,.34) 30%,rgba(12,30,74,.14) 56%,transparent 77%);animation:oreonBlueBreath 7s ease-in-out infinite;animation-play-state:paused}
  #oreon-live-products .oreon-blue-glow::after{content:'';position:absolute;left:50%;top:-54px;width:min(780px,72vw);height:180px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(79,143,255,.28),rgba(38,91,210,.13) 42%,transparent 72%);filter:blur(18px);animation:oreonBlueBreath 7s ease-in-out infinite;animation-play-state:paused}
  #oreon-live-products .oreon-blue-glow.is-visible::before,#oreon-live-products .oreon-blue-glow.is-visible::after{animation-play-state:running}
  @keyframes oreonBlueBreath{0%,100%{opacity:.48}50%{opacity:1}}
  @media(prefers-reduced-motion:reduce){#oreon-products-scroll-stack>.oreon-sticky-hero{position:relative!important;top:auto!important}#oreon-live-products .oreon-blue-glow{opacity:1;transition:none}#oreon-live-products .oreon-blue-glow::before,#oreon-live-products .oreon-blue-glow::after{animation:none;opacity:.7}}
  `;
  document.head.appendChild(css);
  function install() {
    var root = document.getElementById('oreon-live-products');
    if (!root) return false;
    if (root.dataset.motionReady) return true;
    var hero = document.getElementById('s2026101004845a3685ea4');
    var board = document.getElementById('s202610106ac0b6c8e8611');
    if (!hero || !board || !board.contains(root)) return false;
    if (hero.parentElement !== board.parentElement || hero.nextElementSibling !== board) return false;
    var stack = document.createElement('div');
    stack.id = 'oreon-products-scroll-stack';
    hero.before(stack);
    stack.append(hero,board);
    hero.classList.add('oreon-sticky-hero');
    board.classList.add('oreon-cover-section');
    function size() {
      // A tall hero scrolls fully into view before it is held behind ALL.
      stack.style.setProperty('--oreon-pin-top', Math.min(0,window.innerHeight-hero.offsetHeight)+'px');
    }
    size();
    window.addEventListener('resize',size,{passive:true});
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(hero);
    var stage = root.querySelector('.oreon-category-stage');
    var glow = document.createElement('div');
    glow.className = 'oreon-blue-glow';
    glow.setAttribute('aria-hidden','true');
    stage.prepend(glow);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(entries){
        entries.forEach(function(entry){glow.classList.toggle('is-visible',entry.isIntersecting)});
      },{threshold:.12}).observe(stage);
    } else {glow.classList.add('is-visible')}
    root.dataset.motionReady='true';
    return true;
  }
  if (!install()) {
    var waiting = new MutationObserver(function(){if(install())waiting.disconnect()});
    waiting.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){waiting.disconnect()},20000);
  }
})();


/* Original V5 visual refinements retained (auto-applies after the base layout). */
/*
 * OREON Products V5 visual refinements (2026-10-27)
 * Keeps Products_BOARD_FILTER_V4_URL_CATEGORY.js unchanged and uses it as the base.
 * Changes ONLY: sidebar font 1.5x, category intro description 1.5x,
 *              clearer card hover line, and A-style circular detail arrow.
 */
(function () {
  'use strict';
  // Keep the BLUE-GRADIENT INTRO's ALL heading as Product Portfolio.
  // Run independently of the V5 visual-loader guard: an older V5 instance may
  // already have loaded on the same Imweb page. Left filter ALL stays intact.
  (function installPortfolioHeadingFix() {
    if (window.__oreonProductsPortfolioHeadingFix20261102) return;
    window.__oreonProductsPortfolioHeadingFix20261102 = true;

    var watchedTitle = null;
    var titleObserver = null;
    var mountObserver = null;

    function syncTitle() {
      var title = document.querySelector('#oreon-live-products #oreon-panel-title');
      if (!title) return false;
      if (title !== watchedTitle) {
        if (titleObserver) titleObserver.disconnect();
        watchedTitle = title;
        // V4 writes the category name on each filter change; restore only ALL.
        titleObserver = new MutationObserver(syncTitle);
        titleObserver.observe(title, {childList: true, characterData: true, subtree: true});
      }
      if (title.textContent.trim() === 'ALL') {
        title.textContent = 'Product Portfolio';
      }
      return true;
    }

    function startWatching() {
      if (syncTitle()) return;
      mountObserver = new MutationObserver(function () {
        if (syncTitle()) {
          mountObserver.disconnect();
          mountObserver = null;
        }
      });
      mountObserver.observe(document.documentElement, {childList: true, subtree: true});
    }

    if (document.documentElement) startWatching();
    else document.addEventListener('DOMContentLoaded', startWatching, {once: true});
  })();

  if (window.__oreonProductsUIRefinementsV5) return;
  window.__oreonProductsUIRefinementsV5 = true;

  var BASE_SCRIPT = 'https://cdn.jsdelivr.net/gh/leejangss/Oreon_homepage@main/widgets/products/Products_BOARD_FILTER_V4_URL_CATEGORY.js?v=20261117pc19a';
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
