/* OREON TIME / Imweb native board enhancement V10
   Imweb widget: w202610103e49cc0075aa3
   Keeps the board as the single source of posts; does not invent entries.
*/
(function () {
  'use strict';
  const WIDGET_ID = 'w202610103e49cc0075aa3';
  const CATS = ['ALL', 'CHALLENGE', 'CAPABILITY', 'CREATIVITY', 'OPENNESS'];
  const STATE_KEY = '__oreonTimeBoardV10';
  if (window[STATE_KEY] && window[STATE_KEY].destroy) window[STATE_KEY].destroy();
  const scope = { active: 'ALL', widget: null, observer: null, timer: null, destroyed: false, handlers: [] };
  window[STATE_KEY] = scope;
  const norm = str => String(str || '').trim().replace(/\s+/g, ' ').toUpperCase();
  const mapCat = str => CATS.find(c => norm(str) === c) || null;
  const css = `
  #${WIDGET_ID}.ot-board-v10 { --ot-ink:#151515; --ot-gray:#737373; --ot-gap:18px; color:var(--ot-ink); }
  #${WIDGET_ID}.ot-board-v10 .ot-board-tabs { display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 28px;padding:0; }
  #${WIDGET_ID}.ot-board-v10 .ot-board-tab {font:500 12px/1.3 Helvetica,Arial,sans-serif;letter-spacing:.04em;border:1px solid #dedede;background:#fff;color:#444;border-radius:999px;padding:11px 19px;cursor:pointer;transition:background .25s,color .25s,border-color .25s;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-tab:hover,#${WIDGET_ID}.ot-board-v10 .ot-board-tab.is-active{background:#141414;color:#fff;border-color:#141414;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-hide {display:none !important;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-grid {display:grid !important;grid-template-columns:repeat(4,minmax(0,1fr)) !important;gap:28px var(--ot-gap) !important;align-items:start;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card {min-width:0 !important;width:auto !important;max-width:100% !important;margin:0 !important;float:none !important;position:relative;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card img {max-width:100%;transition:transform .5s ease;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card .ot-board-photo {position:relative;overflow:hidden;background:#f4f4f4;aspect-ratio:4 / 5;display:flex;align-items:center;justify-content:center;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card .ot-board-photo img {width:100%;height:100%;object-fit:contain;position:relative;z-index:1;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card .ot-board-photo .ot-board-blur {position:absolute;inset:-16px;width:calc(100% + 32px);height:calc(100% + 32px);object-fit:cover;filter:blur(22px);opacity:.5;z-index:0;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card:hover .ot-board-photo img:not(.ot-board-blur) {transform:scale(1.035);}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card .ot-board-cat-label{display:block;font:500 10px/1.4 Helvetica,Arial,sans-serif;color:#888;letter-spacing:.09em;margin:12px 0 5px;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card .ot-board-title{display:block;font:500 16px/1.45 Helvetica,Arial,sans-serif;color:#202020;letter-spacing:-.02em;}
  #${WIDGET_ID}.ot-board-v10 .ot-board-card .ot-board-title a {color:inherit;text-decoration:none;}
  #${WIDGET_ID}.ot-board-v10 .board_btn_area a[href*="write"],#${WIDGET_ID}.ot-board-v10 a[href*="mode=write"],#${WIDGET_ID}.ot-board-v10 .btn_write,#${WIDGET_ID}.ot-board-v10 [class*="write_btn"],#${WIDGET_ID}.ot-board-v10 .btn-post-write{display:none !important;}
  @media(max-width:1000px){#${WIDGET_ID}.ot-board-v10 .ot-board-grid{grid-template-columns:repeat(3,minmax(0,1fr)) !important;}}
  @media(max-width:700px){#${WIDGET_ID}.ot-board-v10 .ot-board-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:22px 12px !important;}#${WIDGET_ID}.ot-board-v10 .ot-board-tab{padding:9px 13px;font-size:11px;}}
  @media(max-width:390px){#${WIDGET_ID}.ot-board-v10 .ot-board-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}}
  `;
  const style = document.createElement('style'); style.id='ot-board-v10-style'; style.textContent=css;
  document.getElementById(style.id)?.remove(); document.head.appendChild(style);
  function widget() { return document.getElementById(WIDGET_ID); }
  function getBoardRoot(w) {
    return w.querySelector('.board_list, .board-list, .list_style, .board_grid, .board-grid, .gallery_list, .gallery-list, .grid_list, .list_wrap, .list-wrap, .post_list, .post-list, .list_container, .list-container, .thumb_list') || null;
  }
  function cards(root) {
    if(!root)return [];
    const patterns=[':scope > li', ':scope > article', ':scope > .item', ':scope > .board_item', ':scope > .board-item', ':scope > .card', ':scope > .list_item', ':scope > .list-item', ':scope > .col', ':scope > div'];
    for(const sel of patterns){const nodes=[...root.querySelectorAll(sel)].filter(x=>x.querySelector('img')&&x.querySelector('a'));if(nodes.length)return nodes;}
    return [];
  }
  function catOf(card) {
    for(const el of card.querySelectorAll('[data-category],[data-cat],.category,.category_name,.category-name,.board_category,.board-category,.category_text,.category-text,.badge')) {
      for(const val of [el.getAttribute('data-category'),el.getAttribute('data-cat'),el.textContent]) {const cat=mapCat(val);if(cat)return cat;}
    }
    const attr=card.getAttribute('data-category') || card.getAttribute('data-cat'); return mapCat(attr);
  }
  function nativeLinks(w) {
    return [...w.querySelectorAll('.category_list a,.category-list a,.board_category a,.board-category a,.category_wrap a,.category-wrap a,.category_list button,.category-list button,[data-category] a,select[name*="category"] option')].filter(x=>mapCat(x.textContent||x.value));
  }
  function getNativeLink(cat) {return nativeLinks(scope.widget).find(el=>mapCat(el.textContent||el.value)===cat);}
  function decorate() {
    const w=widget();if(!w)return false;
    scope.widget=w;w.classList.add('ot-board-v10');
    let tabs=w.querySelector('.ot-board-tabs');
    if(!tabs){tabs=document.createElement('nav');tabs.className='ot-board-tabs';tabs.setAttribute('aria-label','OREON TIME post categories');w.insertBefore(tabs,w.firstChild);}
    if(!tabs.children.length){CATS.forEach(c=>{let b=document.createElement('button');b.type='button';b.className='ot-board-tab';b.dataset.otCategory=c;b.textContent=c;b.addEventListener('click',()=>select(c,true));tabs.appendChild(b);});}
    const root=getBoardRoot(w);
    if(root){root.classList.add('ot-board-grid');cards(root).forEach(card=>{
      card.classList.add('ot-board-card');
      const img=card.querySelector('img:not(.ot-board-blur)');if(!img)return;
      let media=img.closest('.thumb, .thumbnail, .img_wrap, .img-wrap, .image_wrap, .image-wrap, .image, .board_img, .board-img, .cover');
      if(!media || media===card)media=img.parentElement;
      if(media && media!==card){media.classList.add('ot-board-photo');if(!media.querySelector('.ot-board-blur')){const blur=img.cloneNode(false);blur.removeAttribute('id');blur.removeAttribute('srcset');blur.className='ot-board-blur';blur.alt='';blur.setAttribute('aria-hidden','true');media.insertBefore(blur,media.firstChild);}}
      const cat=catOf(card);
      if(cat&&!card.querySelector('.ot-board-cat-label')){const label=document.createElement('span');label.className='ot-board-cat-label';label.textContent=cat;media?.parentElement?.appendChild(label);}
      const title=card.querySelector('.title, .subject, .post_title, .post-title, .board_title, .board-title');if(title)title.classList.add('ot-board-title');
    });}
    syncTabs();return true;
  }
  function syncTabs(){if(!scope.widget)return;scope.widget.querySelectorAll('.ot-board-tab').forEach(b=>{const on=b.dataset.otCategory===scope.active;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});}
  function locallyFilter(){const root=getBoardRoot(scope.widget);if(!root)return false;const items=cards(root);if(!items.length)return false;
    let count=0;items.forEach(card=>{let cat=catOf(card);if(cat)count++;card.classList.toggle('ot-board-hide',scope.active!=='ALL'&&cat!==scope.active&&cat!==null);});
    // No category metadata? Do not show unrelated entries as if correctly filtered.
    if(scope.active!=='ALL'&&!count){items.forEach(x=>x.classList.remove('ot-board-hide'));return false;}return true;
  }
  function select(cat,scroll){if(!CATS.includes(cat))return;scope.active=cat;decorate();syncTabs();
    const native=getNativeLink(cat);
    if(native){if(native.tagName==='OPTION'){const sel=native.closest('select');sel.value=native.value;sel.dispatchEvent(new Event('change',{bubbles:true}));}
      else native.click();}
    else if(cat==='ALL'){
      const all=[...scope.widget.querySelectorAll('.category_list a,.category-list a,.board_category a,.board-category a,.category_wrap a,.category-wrap a')].find(x=>/^(ALL|전체)$/i.test(x.textContent.trim()));if(all)all.click();
    }
    locallyFilter();if(scroll)scope.widget.scrollIntoView({behavior:'smooth',block:'start'});
    document.dispatchEvent(new CustomEvent('oreon:board-category-changed',{detail:{category:cat}}));
  }
  function identifyFromClick(event){
    if(event.target.closest('#'+WIDGET_ID))return;
    const root=document.getElementById('oreon-categories');if(!root||!root.contains(event.target))return;
    const candidate=event.target.closest('a,button,[role="button"],[data-category],[data-cat],.rh-row,.value-row,.value-card,.ot-value-row,.ot-value-card');
    if(!candidate)return;
    const candidates=[candidate,candidate.parentElement,candidate.closest('[data-category]'),candidate.closest('[data-cat]')].filter(Boolean);
    let cat=null;
    for(const el of candidates){cat=mapCat(el.dataset?.category)||mapCat(el.dataset?.cat);if(cat)break;const txt=(el.innerText||'').trim();const prefix=txt.split(/\n/).map(s=>s.trim());cat=prefix.map(mapCat).find(Boolean);if(cat)break;}
    if(!cat)return;
    // Do not cancel any V08 click/motion: select board only, after V08 has processed its own click.
    setTimeout(()=>select(cat,true),50);
  }
  document.addEventListener('click',identifyFromClick,false);scope.handlers.push(()=>document.removeEventListener('click',identifyFromClick,false));
  const eventNames=['oreon:category-select','oreon:category-selected','oreon:category-click','oreon:category-change','oreon:category-changed','oreon:values-category'];
  eventNames.forEach(n=>{let cb=e=>{let c=mapCat(e.detail?.category||e.detail?.name||e.detail?.cat);if(c)select(c,true)};document.addEventListener(n,cb);scope.handlers.push(()=>document.removeEventListener(n,cb));});
  function run(){if(scope.destroyed)return;decorate();locallyFilter();}
  let tries=0;const boot=setInterval(()=>{run();if(scope.widget||++tries>60)clearInterval(boot);},300);scope.handlers.push(()=>clearInterval(boot));
  scope.observer=new MutationObserver(()=>{if(scope.timer)clearTimeout(scope.timer);scope.timer=setTimeout(run,140)});
  scope.observer.observe(document.body,{childList:true,subtree:true});
  scope.destroy=()=>{scope.destroyed=true;scope.handlers.forEach(fn=>fn());scope.observer?.disconnect();clearTimeout(scope.timer);style.remove();};
  run();
})();
