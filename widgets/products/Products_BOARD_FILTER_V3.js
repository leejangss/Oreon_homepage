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
  function run() {
(function(){
'use strict';
// Code widget: w2026101095d555a0a3355. Data source: the actual board widget below.
var SOURCE='w202610106ffb71b28cee8';
var TEMPLATE="<section id=\"oreon-live-products\" class=\"oreon-product-index\" aria-label=\"OREON product portfolio\">\n  <div class=\"oreon-category-stage\">\n    <div class=\"oreon-category-stage__inner\">\n      <h2 class=\"oreon-product-index__title\" id=\"oreon-panel-title\">ALL</h2>\n      <p class=\"oreon-product-index__desc\" id=\"oreon-panel-desc\">The complete OREON product lineup.\nExplore every biomaterial solution in one place.</p>\n      <div class=\"oreon-category-stage__count\" id=\"oreon-filter-count\">13 PRODUCTS</div>\n    </div>\n  </div>\n\n  <div class=\"oreon-product-body\">\n    <div class=\"oreon-product-body__inner\">\n      <aside class=\"oreon-product-index__side\" aria-label=\"Product material filters\">\n        <button type=\"button\" class=\"oreon-filter-btn is-active\" data-filter=\"ALL\">ALL</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"ECM\">ECM</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"CaHA\">CaHA</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"rH Collagen\">rH Collagen</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"NAD+\">NAD+</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"PNLA\">PNLA</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"PLLA\">PLLA</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"PN\">PN</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"HA\">HA</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"Exosome\">Exosome</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"PDO\">PDO</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"TCA\">TCA</button><button type=\"button\" class=\"oreon-filter-btn\" data-filter=\"CA\">CA</button>\n      </aside>\n\n<div class=\"oreon-product-grid\" id=\"oreon-product-grid\"><div class=\"oreon-product-empty\" id=\"oreon-product-empty\">Products for this category will be added here.</div></div></div></div></section>";
function mount(){
 if(document.getElementById('oreon-live-products'))return true;
 var widget=document.getElementById(SOURCE);if(!widget)return false;
 if(new URL(location.href).searchParams.get('bmode')==='view')return true;
 if(widget.querySelector('.permission_error'))return true;
 var nodes=Array.from(widget.querySelectorAll('.list-style-card')).filter(function(n){return n.querySelector('a.post_link_wrap')});
 // Fixed category order; editing a post never changes its position.
 var categoryOrder=['ECM','CaHA','rH Collagen','NAD+','PNLA','PLLA','PN','HA','Exosome','PDO','TCA','CA'];
 var fixedIds=['175035692','175035689','175035679','175035674','175035672','175035666','175035662','175035659','175035655','175035648','175035639','175035626','175035584','175035591','175035573','175035450','175035438','175035434'];
 function orderKey(node){
  var labels=Array.from(node.querySelectorAll('.title em')).map(function(e){return e.textContent.trim()}).filter(function(v){return /^\[.+\]$/.test(v)});
  var category=labels.length?labels[0].slice(1,-1).toLowerCase():'';
  var rank=categoryOrder.findIndex(function(c){return c.toLowerCase()===category});
  var id=new URL(node.querySelector('a.post_link_wrap').getAttribute('href'),location.href).searchParams.get('idx')||'';
  var fixed=fixedIds.indexOf(id);
  return {category:category,rank:rank<0?categoryOrder.length:rank,fixed:fixed<0?fixedIds.length:fixed,id:id};
 }
 function compareOrder(a,b){
  if(a.rank!==b.rank)return a.rank-b.rank;
  if(a.category!==b.category)return a.category<b.category?-1:1;
  if(a.fixed!==b.fixed)return a.fixed-b.fixed;
  // Ascending immutable post IDs keep newly registered products after older ones.
  if(/^\d+$/.test(a.id)&&/^\d+$/.test(b.id)){
   if(a.id.length!==b.id.length)return a.id.length-b.id.length;
  }
  return a.id===b.id?0:(a.id<b.id?-1:1);
 }
 nodes.sort(function(a,b){return compareOrder(orderKey(a),orderKey(b))});

 var totalText=widget.querySelector('.board-head .heading em');
 var total=totalText?Number(totalText.textContent.replace(/[^0-9]/g,'')):NaN;
 // Fail open: keep the native board if it spans pages. Never silently filter
 // only a subset while claiming to show the complete product inventory.
 if(Number.isFinite(total)&&total!==nodes.length){console.warn('OREON: display all products on one board page before enabling this layout.');return true}
 if(!nodes.length&&total!==0)return false;
 var host=document.createElement('div');host.innerHTML=TEMPLATE;
 var root=host.firstElementChild;var grid=root.querySelector('#oreon-product-grid');
 var empty=root.querySelector('#oreon-product-empty');
 var known=['ECM','CaHA','rH Collagen','NAD+','PNLA','PLLA','PN','HA','Exosome','PDO','TCA','CA'];
 nodes.forEach(function(n){
  var title=n.querySelector('.title');if(!title)return;
  var categoryLabels=Array.from(title.querySelectorAll('em')).map(function(e){return e.textContent.trim()}).filter(function(v){return /^\[.+\]$/.test(v)}).map(function(v){return v.slice(1,-1)});
  var cats=categoryLabels.map(function(c){return known.find(function(k){return k.toLowerCase()===c.toLowerCase()})||c});
  var titleCopy=title.cloneNode(true);titleCopy.querySelectorAll('span,em,.icons').forEach(function(e){e.remove()});
  var name=titleCopy.textContent.replace(/\s+/g,' ').trim();
  var link=n.querySelector('a.post_link_wrap');var u=new URL(link.getAttribute('href'),location.href);
  if(u.origin!==location.origin)return;
  var card=document.createElement('a');card.className='oreon-filter-card';card.href=u.href;card.dataset.cats=cats.join('|');
  var picture=document.createElement('div');picture.className='oreon-filter-card__image';
  var nativeImage=n.querySelector('._card');var bg=nativeImage?nativeImage.style.backgroundImage:'';
  var match=bg.match(/^url\(["']?(.*?)["']?\)$/);
  var url=match?match[1]:'';
  if(url&&!/no-image\.png/.test(url)){
   var imageUrl=new URL(url,location.href);
   if(['https:','http:'].indexOf(imageUrl.protocol)!==-1){
    picture.classList.add('oreon-filter-card__image--photo');var img=document.createElement('img');img.src=imageUrl.href;img.alt=name;img.loading='lazy';picture.appendChild(img);
   }
  }
  if(!picture.firstChild){var material=document.createElement('span');material.className='oreon-filter-card__material';material.textContent=cats.join(' / ');picture.appendChild(material);var letter=document.createElement('span');letter.className='oreon-filter-card__ghost';letter.textContent=name.charAt(0);picture.appendChild(letter)}
  var heading=document.createElement('h3');heading.textContent=name;card.append(picture,heading);
  var excerpt=n.querySelector('.text-block');if(excerpt&&excerpt.textContent.trim()){var p=document.createElement('p');p.textContent=excerpt.textContent.trim();card.appendChild(p)}
  grid.insertBefore(card,empty);
  cats.forEach(function(c){if(!known.includes(c)){known.push(c);var b=document.createElement('button');b.type='button';b.className='oreon-filter-btn';b.dataset.filter=c;b.textContent=c;root.querySelector('aside').appendChild(b)}});
 });
 widget.parentNode.insertBefore(root,widget);
 startOreonFilters();
 widget.hidden=true;widget.style.setProperty('display','none','important');
 return true;
}

function startOreonFilters(){
  var stageInner=document.querySelector('.oreon-category-stage__inner');
  var reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(stageInner && !reduceMotion && 'IntersectionObserver' in window){
    stageInner.classList.add('oreon-stage-reveal-ready');

    var revealStage=function(){
      stageInner.classList.add('oreon-stage-revealed');
    };

    var stageObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          revealStage();
          stageObserver.unobserve(entry.target);
        }
      });
    },{
      threshold:0.12,
      rootMargin:'0px 0px -5% 0px'
    });

    stageObserver.observe(stageInner);

    /* iframe/browser failsafe */
    var stageFallback=function(){
      if(stageInner.classList.contains('oreon-stage-revealed')) return;
      var r=stageInner.getBoundingClientRect();
      if(r.top < window.innerHeight*0.92 && r.bottom > 0){
        revealStage();
        window.removeEventListener('scroll',stageFallback);
      }
    };
    window.addEventListener('scroll',stageFallback,{passive:true});
    stageFallback();
  }

var panelCopy={"ALL": {"title": "ALL", "desc": "The complete OREON product lineup.\nExplore every biomaterial solution in one place."}, "ECM": {"title": "ECM", "desc": "Extracellular Matrix biomaterials that recreate the skin's structural environment.\nDesigned to support regeneration and deliver natural, lasting results."}, "CaHA": {"title": "CaHA", "desc": "Calcium hydroxyapatite biomaterials that provide structural support.\nDesigned to restore volume and stimulate natural collagen for lasting results."}, "rH Collagen": {"title": "rH Collagen", "desc": "Recombinant human collagen biomaterials with high purity and consistent quality.\nDesigned to support skin structure, firmness, and elasticity."}, "NAD+": {"title": "NAD+", "desc": "Nicotinamide adenine dinucleotide, a core coenzyme of cellular energy metabolism.\nDesigned to support skin cell vitality and renewal."}, "PNLA": {"title": "PNLA", "desc": "PLLA combined with PN for a dual-action approach to skin regeneration.\nDesigned to improve firmness, elasticity, and skin quality over time."}, "PN": {"title": "PN", "desc": "Polynucleotide biomaterials that support skin repair and regeneration.\nDesigned to improve hydration, elasticity, and overall skin quality."}, "HA": {"title": "HA", "desc": "Hyaluronic acid products for face and body contouring.\nDesigned for natural volume, smooth injectability, and stable results."}, "Exosome": {"title": "Exosome", "desc": "Exosome-based solutions that carry signals for cellular communication.\nDesigned to support skin regeneration and renewal."}, "PDO": {"title": "PDO", "desc": "Absorbable threads for lifting and skin tightening.\nDesigned for natural contouring and lasting support."}, "PLLA": {"title": "PLLA", "desc": "Products for this category will be added here."}, "TCA": {"title": "TCA", "desc": "Products for this category will be added here."}, "CA": {"title": "CA", "desc": "Products for this category will be added here."}};
  var buttons=[].slice.call(document.querySelectorAll('.oreon-filter-btn'));
  var cards=[].slice.call(document.querySelectorAll('.oreon-filter-card'));
  var empty=document.getElementById('oreon-product-empty');
  var title=document.getElementById('oreon-panel-title');
  var desc=document.getElementById('oreon-panel-desc');
  var count=document.getElementById('oreon-filter-count');

  function cardMatches(card,filter){
    if(filter==='ALL') return true;
    var cats=(card.getAttribute('data-cats')||'').split('|');
    return cats.indexOf(filter)!==-1;
  }

  function sendHeight(){
    var h=Math.max(document.documentElement.scrollHeight,document.body?document.body.scrollHeight:0);
    try{window.parent.postMessage({type:'oreon-products-height',height:h},'*')}catch(e){}
  }

  function applyFilter(filter){
    var shown=0;
    cards.forEach(function(card){
      var show=cardMatches(card,filter);
      card.classList.toggle('is-hidden',!show);
      if(show){
        shown++;
        card.classList.add('is-entering');
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){card.classList.remove('is-entering')});
        });
      }
    });

    buttons.forEach(function(btn){
      btn.classList.toggle('is-active',btn.getAttribute('data-filter')===filter);btn.setAttribute('aria-pressed',String(btn.getAttribute('data-filter')===filter));
    });

    var copy=panelCopy[filter]||{title:filter,desc:''};
    title.textContent=copy.title;
    desc.textContent=copy.desc;
    count.textContent=shown+' PRODUCT'+(shown===1?'':'S');
    empty.classList.toggle('is-visible',shown===0);
    sendHeight();
  }

  buttons.forEach(function(btn){
    btn.addEventListener('click',function(){
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  window.addEventListener('load',function(){
    sendHeight();
    setTimeout(sendHeight,300);
    setTimeout(sendHeight,900);
  });
  window.addEventListener('resize',sendHeight);
  if('ResizeObserver' in window){new ResizeObserver(sendHeight).observe(document.documentElement)}
applyFilter("ALL");
}

if(!mount()){var observer=new MutationObserver(function(){if(mount())observer.disconnect()});observer.observe(document.documentElement,{childList:true,subtree:true});setTimeout(function(){observer.disconnect()},15000)}
})();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, {once:true});
  } else { run(); }
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
