/* OREON Life Science · NEWS Board v6 — OREON TIME card styling + smart image-edge backgrounds (NEWS content unchanged)
 * Widget w202609085cc91e7d0d0b8
 * Display-only enhancement of the native Imweb NEWS board.
 * Native post links, categories, pagination and administration remain in Imweb.
 * The former 'hide .btn-primary' CSS is included here.
 */
(function () {
  'use strict';

  const ID = 'w202609085cc91e7d0d0b8';
  const SECTION = 's2026080930f1bc2f3bf2e';
  const STYLE_ID = 'oreon-news-time-style-v06-edgefill';
  const SHELL = 'oreon-news-editorial';
  const HIDDEN = 'oreon-news-native-hidden';
  const CATEGORIES = [
    ['SOCIAL MEDIA', 'SOCIAL MEDIA'],
    ['INTERVIEW', 'INTERVIEW'],
    ['ARTICLE', 'ARTICLE'],
    ['PRESS', 'PRESS'],
    ['공지', 'NOTICE'],
    ['NOTICE', 'NOTICE']
  ];
  const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
  const upper = (s) => norm(s).toUpperCase();
  const denied = /^(전체|ALL|SEARCH|검색|글쓰기|WRITE|MORE|READ MORE|목록|이전|다음|수정|삭제|답글|댓글|관리자|ADMIN|HOME|OREON)$/i;
  const cleanHref = (href) => String(href || '').replace(/#.*$/, '').replace(/([?&])preview_mode=1(&|$)/, '$1').replace(/[?&]$/, '');
  const isDate = (s) => /^(?:20\d{2}[.\-/]\s*\d{1,2}[.\-/]\s*\d{1,2}\.?|\d{1,2}\s+(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+20\d{2}|\d+\s*(?:분|시간|일|주|개월|년)\s*전|방금)$/i.test(norm(s));
  const cardSelector = [
    'li', 'article', '.col-md-3', '.col-md-4', '.col-md-6',
    '.col-sm-4', '.col-sm-6', '.col-xs-6',
    '.gallery-item', '.gallery_item', '.board-item', '.board_item',
    '.list-item', '.list_item', '.item-wrap', '.item_wrap',
    '.card-item', '.post-item', '.post_item', '.item'
  ].join(',');

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* Only the NEWS widget. Keep the old public write-button hiding rule. */
      #${SECTION} .btn-primary,
      #${ID} .btn-write, #${ID} .btn_write, #${ID} .board_write,
      #${ID} .board-write, #${ID} .write_btn, #${ID} .write-button,
      #${ID} .btn-write-wrap, #${ID} .board_write_btn,
      #${ID} a[href*="write_mode"], #${ID} a[href*="mode=write"] {display:none!important}
      #${ID}{width:100%;max-width:1400px;margin:0 auto!important;padding:0!important;background:transparent!important;box-sizing:border-box}
      #${ID}>.${HIDDEN}{display:none!important}
      /* Exclude Imweb promotional tiles visually and from the post extractor. */
      #${ID} .ai-spam-banner,
      #${ID} [class*="spam-guard"], #${ID} [class*="spam_guard"],
      #${ID} [class*="spam-care"], #${ID} [class*="spam_care"] {display:none!important}

      /* Visual reference: OREON_TIME_BOARD_IMWEB_V09_IMAGE_FILL.js */
      #${ID} .${SHELL}{background:#0b111b;border:1px solid rgba(160,180,205,.18);border-radius:22px;
        padding:48px 52px 40px;box-sizing:border-box;overflow:hidden;color:#eef2f7;font-family:Arial,'Noto Sans KR',sans-serif}
      #${ID} .on-head{display:flex;justify-content:space-between;align-items:center;gap:18px;margin:0 0 30px}
      #${ID} .on-heading{font:600 25px/1.3 Arial,'Noto Sans KR',sans-serif;color:#f0f3f7;letter-spacing:-.02em;margin:0}
      #${ID} .on-small{font:500 11px/1.4 Arial,sans-serif;letter-spacing:.12em;color:#95a7bd}
      #${ID} .on-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));column-gap:20px;row-gap:30px;
        border-top:1px solid rgba(172,190,213,.28);padding-top:30px}
      #${ID} .on-card{min-width:0;background:rgba(255,255,255,.018);border:1px solid rgba(160,180,205,.18);
        border-radius:15px;overflow:hidden;transition:border-color .25s,box-shadow .25s}
      #${ID} .on-card:hover{border-color:rgba(47,108,224,.5);box-shadow:0 12px 30px rgba(0,0,0,.16)}
      #${ID} .on-link{height:100%;display:flex;flex-direction:column;color:inherit!important;text-decoration:none!important}
      /* The original is always 100% visible. Only side gutters inherit image colors. */
      #${ID} .on-visual{aspect-ratio:16/10;background:linear-gradient(90deg,var(--on-edge-left,#101723),var(--on-edge-right,#101723));overflow:hidden;position:relative;isolation:isolate}
      #${ID} .on-image-backdrop{position:absolute;inset:-15%;width:130%;height:130%;display:block;
        object-fit:cover;object-position:center;filter:blur(22px) saturate(.92);opacity:1;pointer-events:none;z-index:0}
      #${ID} .on-visual.on-edge-solid .on-image-backdrop{opacity:0}
      #${ID} .on-image{position:relative;z-index:1;display:block;width:100%;height:100%;object-fit:contain;object-position:center center;
        transition:none}
      #${ID} .on-card:hover .on-image{transform:none}
      #${ID} .on-info{padding:23px 22px 25px;flex:1;display:flex;flex-direction:column;min-width:0}
      #${ID} .on-badge{display:inline-flex;align-items:center;justify-content:center;min-height:28px;max-width:100%;box-sizing:border-box;
        padding:0 12px;border:1px solid rgba(47,108,224,.55);border-radius:999px;color:#8fb8ff;
        font:600 10px/1.2 Arial,sans-serif;letter-spacing:.04em;text-align:center}
      #${ID} .on-title{margin:16px 0 19px;color:#f0f3f7;font:600 18px/1.48 Arial,'Noto Sans KR',sans-serif;
        min-height:2.96em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:keep-all;overflow-wrap:anywhere}
      #${ID} .on-card:hover .on-title{color:#6fb6ef}
      #${ID} .on-meta{border-top:1px solid rgba(160,180,205,.14);padding-top:14px;margin-top:auto;
        display:flex;justify-content:space-between;gap:10px;color:#aeb9c9;font:500 12px/1.4 Arial,sans-serif}
      #${ID} .on-meta-label{font-size:11px;white-space:nowrap}
      #${ID} .on-date{text-align:right;font-size:12px}
      /* No image: an intentional text-led news card, not a broken-image placeholder. */
      #${ID} .on-card.on-no-image{background:linear-gradient(145deg,#142b40,#101c2d);min-height:315px}
      #${ID} .on-card.on-no-image .on-info{padding:25px 22px;justify-content:space-between}
      #${ID} .on-card.on-no-image .on-title{-webkit-line-clamp:5;min-height:0;margin:28px 0 24px;font-size:18px}
      #${ID} .on-empty{padding:42px 12px 18px;text-align:center;color:#8f9caf;font:500 14px/1.5 Arial,sans-serif}
      #${ID} .on-pager{display:flex;justify-content:center;margin-top:26px}
      #${ID} .on-pager a,#${ID} .on-pager span{color:#aeb9c9!important}
      #${ID} .on-pager .btn-primary{display:none!important}
      @media(max-width:1250px){#${ID} .on-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:1100px){
        #${ID} .${SHELL}{padding:30px 24px}
        #${ID} .on-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
      }
      @media(max-width:650px){
        #${ID} .${SHELL}{padding:24px 16px;border-radius:18px}
        #${ID} .on-grid{grid-template-columns:1fr;gap:18px}
        #${ID} .on-info{padding:18px}
        #${ID} .on-title{font-size:16px}
        #${ID} .on-card.on-no-image .on-title{font-size:16px}
        #${ID} .on-head{margin-bottom:22px}
        #${ID} .on-heading{font-size:23px}
      }
      @media(prefers-reduced-motion:reduce){#${ID} .on-card,#${ID} .on-image{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function isDetail() {
    const params = new URLSearchParams(window.location.search);
    const mode = (params.get('bmode') || params.get('mode') || '').toLowerCase();
    return ['view','write','modify','edit','reply'].includes(mode);
  }
  function imageSource(img) {
    if (!img || img.closest('.no-image,.no_img,.placeholder,.board-profile')) return '';
    const cls = String(img.className || '');
    if (/(avatar|profile|icon|emoticon)/i.test(cls)) return '';
    const url = img.getAttribute('data-original') || img.getAttribute('data-full') || img.getAttribute('data-src') || img.currentSrc || img.getAttribute('src') || '';
    if (!url || /(?:no[_-]?image|placeholder|default_thumb|blank|loading|spacer|1x1|pixel)/i.test(url)) return '';
    if (/^data:image\/(?:svg\+xml|gif)/i.test(url)) return '';
    return url;
  }
  function backgroundSource(node) {
    if (!node) return '';
    const style = node.getAttribute('style') || '';
    const matched = style.match(/background(?:-image)?\s*:\s*(?:[^;]*?)url\(\s*['"]?([^'")]+)['"]?\s*\)/i);
    const url = matched ? matched[1] : '';
    return /(?:no[_-]?image|placeholder|default_thumb|blank)/i.test(url) ? '' : url;
  }
  function candidatePhoto(tile) {
    const image = Array.from(tile.querySelectorAll('img')).map(imageSource).find(Boolean);
    if (image) return image;
    const withBg = Array.from(tile.querySelectorAll('[style*="background"]'));
    return withBg.map(backgroundSource).find(Boolean) || '';
  }
  function titleInfo(tile) {
    const fields = [
      '.board-title a','.board_title a','.post-title a','.post_title a',
      '.title a','.title','.subject a','.subject','.txt_title',
      '.board-title','.board_title','.post-title','.post_title',
      'h3','h4','[class*="title"] a','a[title]'
    ];
    for (const sel of fields) {
      const node = tile.querySelector(sel);
      if (!node) continue;
      const t = norm(node.getAttribute('title')) || norm(node.textContent);
      if (t.length > 4 && t.length < 300 && !denied.test(t) && !isDate(t)) {
        return { text: t, link: node.closest('a') || tile.querySelector('a[href]') };
      }
    }
    const possibleLinks = Array.from(tile.querySelectorAll('a[href]'))
      .map(el => ({el, text:norm(el.getAttribute('title')) || norm(el.textContent)}))
      .filter(o => o.text.length > 5 && o.text.length < 300 && !denied.test(o.text) && !isDate(o.text));
    possibleLinks.sort((a,b) => b.text.length - a.text.length);
    if (possibleLinks.length) return {text:possibleLinks[0].text,link:possibleLinks[0].el};
    const leaves = Array.from(tile.querySelectorAll('span,div,p'))
      .filter(el => !el.children.length)
      .map(el => norm(el.textContent))
      .filter(t => t.length > 6 && t.length < 300 && !isDate(t) && !denied.test(t));
    leaves.sort((a,b) => b.length - a.length);
    return {text:leaves[0] || '',link:tile.querySelector('a[href]')};
  }
  // Imweb may inject administrative/promotional links into the same widget.
  // These are not articles and must never become the featured NEWS item.
  function isSitePromotion(tile, title, target) {
    // Imweb inserts "AI 스팸가드 / AI 스팸케어" marketing cards into some boards.
    // Their links often have .title and look like a normal item to a generic DOM scraper.
    const local = norm(tile && tile.textContent);
    const txt = norm(title) + ' ' + (local.length < 800 ? local : local.slice(0,800));
    const href = (target && target.getAttribute('href') || '').toLowerCase();
    if (/스팸\s*(?:가드|케어|게시물)|스팸가드|스팸케어|새\s*스팸|이미\s*쌓인\s*스팸|AI\s*스팸|게시판\s*AI|스팸.*(?:한\s*번에|정리|알아보기|걸러|막고)/i.test(txt)) return true;
    if (/(?:^|\W)(?:spamguard|spam-care|spam_care|spam-guard|spam_guard)(?:\W|$)/i.test(href)) return true;
    if (/^(?:https?:)?\/\/(?:www\.)?(?:imweb\.me|help\.imweb\.me|support\.imweb\.me)\/(?:help|guide|support|notice|feature|blog)(?:[/?#]|$)/i.test(href)) return true;
    return !!(tile && tile.closest('.admin-banner,.notice-banner,.marketing-banner,.promotion-banner,.board-promotion,.spam-banner,.ai-spam-banner,[class*="spam-guard"],[class*="spam_guard"],[class*="spam-care"],[class*="spam_care"],[class*="ai-spam"]'));
  }
  function isLikelyNewsTile(tile, target) {
    if (!tile) return false;
    const hasTitle = !!tile.querySelector('.title,.subject,.board-title,.board_title,.post-title,.post_title,.txt_title,[class*="post_title"],[class*="board_title"]');
    const hasCategory = !!tile.querySelector('.category,.cate,.badge,[class*="categor"],[class*="cate_"]');
    const url = (target && target.getAttribute('href') || '').toLowerCase();
    const postUrl = /(?:[?&](?:bmode=view|idx=|post_id=)|\/posts?\/|\/news\/[^?#]+)/i.test(url);
    const tileShape = tile.matches('.gallery-item,.gallery_item,.board-item,.board_item,.post-item,.post_item,.list-item,.list_item,.card-item,.board-gallery li,.board_list tr');
    return hasTitle || hasCategory || postUrl || (tileShape && !!tile.querySelector('a[href]'));
  }
  function hasWriteAncestor(el) {
    return !!el.closest('.pagination,.pagination_wrap,.paging,.board_paging,.paging-block,.on-pager,.'+SHELL+',.btn-wrap,.board-write,.board_write');
  }
  function resolveTile(anchor, root) {
    let item = anchor;
    let fallback = null;
    for (let steps=0; steps<11 && item && item !== root; item=item.parentElement,steps++) {
      if (item.classList.contains(SHELL)) return null;
      const words = norm(item.textContent);
      if (words.length > 2400) break;
      if (!item.querySelector('a[href]')) continue;
      if (words.length > 6) fallback = item;
      if (item.matches(cardSelector) && words.length > 6 && words.length < 750) return item;
      if (item.parentElement && item.parentElement.children.length >= 2 && words.length > 7 && words.length < 650 && !item.matches('a')) {
        if (Array.from(item.parentElement.children).some(sibling => sibling !== item && sibling.querySelector && sibling.querySelector('a[href]'))) return item;
      }
    }
    return fallback && norm(fallback.textContent).length < 650 ? fallback : null;
  }
  function getCategory(tile, title) {
    const categoryNodes = Array.from(tile.querySelectorAll('[class*="categor"],[class*="categ"],[class*="cate"],.badge,.tag'));
    for (const node of categoryNodes) {
      const candidate = upper(node.textContent);
      const found = CATEGORIES.find(([needle]) => candidate === upper(needle));
      if (found) return found[1];
    }
    const text = upper(tile.textContent);
    for (const [needle,label] of CATEGORIES) {
      const regex = new RegExp('(^|\\s)'+needle.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=\\s|$)','i');
      if (regex.test(text)) return label;
    }
    const lead = upper(title).match(/^(ARTICLE|PRESS|INTERVIEW|SOCIAL MEDIA|NOTICE|공지)\b/);
    return lead ? (lead[1]==='공지'?'NOTICE':lead[1]) : 'NEWS';
  }
  function cleanTitle(raw, cat) {
    let result = norm(raw);
    const known = [cat,'Article','Press','Interview','Social Media','Notice','공지'];
    known.forEach(k => { if(k) result=result.replace(new RegExp('^'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s+','i'),''); });
    // Certain Imweb themes repeat category outside and inside the title link.
    for (let n = 0; n < 3; n++) {
      result = result.replace(/^(?:(?:ARTICLE|PRESS|INTERVIEW|SOCIAL MEDIA|NOTICE|공지)\s*[:|·-]?\s+)+/i, '').trim();
    }
    return result;
  }
  function getDate(tile) {
    const candidates = Array.from(tile.querySelectorAll('time,.date,[class*="date"],small,span'));
    for (const node of candidates) {
      if (node.children.length > 0) continue;
      const value = norm(node.getAttribute('datetime') || node.textContent);
      if (isDate(value)) return value;
    }
    return '';
  }
  function getExcerpt(tile, title) {
    const fields = ['.summary','.excerpt','.description','.desc','.board-content-summary','.content-summary'];
    for (const sel of fields) {
      const el=tile.querySelector(sel);
      const text=norm(el&&el.textContent);
      if (text && text !== title && text.length > 20 && text.length < 500) return text;
    }
    return '';
  }
  function extract(root) {
    const native = Array.from(root.children).filter(el => !el.classList.contains(SHELL));
    const candidates = native.flatMap(node => Array.from(node.querySelectorAll('a[href]')))
      .filter(a => !hasWriteAncestor(a) && !denied.test(norm(a.textContent)) && !isSitePromotion(a.closest('.ai-spam-banner,.spam-banner,.promotion-banner') || a, a.textContent, a));
    const posts=[], usedTiles=new Set(), usedPosts=new Set();
    for (const a of candidates) {
      const tile = resolveTile(a,root);
      if (!tile || usedTiles.has(tile) || tile.closest('.'+SHELL)) continue;
      const {text:rawTitle,link} = titleInfo(tile);
      if (!rawTitle || denied.test(rawTitle) || isSitePromotion(tile, rawTitle, link || a)) continue;
      const target = link || a;
      if (isSitePromotion(tile,rawTitle,target) || !isLikelyNewsTile(tile,target)) continue;
      const cat = getCategory(tile,rawTitle);
      const title = cleanTitle(rawTitle,cat);
      if (title.length < 5 || isDate(title) || isSitePromotion(tile,title,target)) continue;
      const rawHref = target.getAttribute('href') || '';
      const href = rawHref && rawHref !== '#' && !/^javascript:/i.test(rawHref) ? target.href : '';
      const photo = candidatePhoto(tile);
      const key = cleanHref(href) || upper(title);
      usedTiles.add(tile);
      if (usedPosts.has(key)) continue;
      usedPosts.add(key);
      posts.push({ title,category:cat,date:getDate(tile),photo,excerpt:getExcerpt(tile,title),href,nativeLink:target });
    }
    return posts;
  }
  function pager(root) {
    const selectors = ['.pagination','.pagination_wrap','.paging','.board_paging','.paging-block'];
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el && !el.closest('.'+SHELL)) return el;
    }
    return null;
  }
  function node(tag,className,content) {
    const el=document.createElement(tag);
    if (className) el.className=className;
    if (content!=null) el.textContent=content;
    return el;
  }
  /* Sample image-edge colors when the image server permits canvas reading.
   Very light/white artwork receives an exact clean background; flat colored
   edge artwork receives a matching gradient. CORS-restricted photographs fall
   back to an out-of-focus copy of the SAME image behind the uncropped image. */
  function fillImageGutters(img, visual) {
    function sample(source) {
      try {
        const can=document.createElement('canvas');can.width=64;can.height=64;
        const cx=can.getContext('2d',{willReadFrequently:true});
        if (!cx || !source.naturalWidth || !source.naturalHeight) return false;
        cx.drawImage(source,0,0,64,64);
        const pixels=cx.getImageData(0,0,64,64).data;
        const edge=(left)=>{
          const v=[];
          for(let y=2;y<62;y+=3) for(let x=0;x<3;x++) {
            const px=left?x:63-x, i=(y*64+px)*4, a=pixels[i+3]/255;
            if(a<.5) continue;
            v.push([pixels[i],pixels[i+1],pixels[i+2]]);
          }
          if(!v.length) return null;
          const med=(ch)=>{const a=v.map(p=>p[ch]).sort((a,b)=>a-b);return a[Math.floor(a.length/2)]};
          const rgb=[med(0),med(1),med(2)];
          const spread=v.reduce((sum,p)=>sum+Math.max(...p.map((c,i)=>Math.abs(c-rgb[i]))),0)/v.length;
          return {rgb,spread,white:v.filter(p=>p.every(c=>c>=239)).length/v.length};
        };
        const l=edge(true),r=edge(false);
        if(!l||!r) return false;
        const color=(e)=>e.white>.90?'#ffffff':'rgb('+e.rgb.map(x=>Math.round(x)).join(',')+')';
        if(l.spread<34 && r.spread<34 || l.white>.90&&r.white>.90){
          visual.style.setProperty('--on-edge-left',color(l));
          visual.style.setProperty('--on-edge-right',color(r));
          visual.classList.add('on-edge-solid');
        }
        return true;
      } catch (e) {return false;} // Opaque cross-origin image; retain blurred fallback.
    }
    function loaded() {
      if(sample(img))return;
      if(!img.currentSrc || img.currentSrc.startsWith('data:'))return;
      const c=new Image();
      c.crossOrigin='anonymous';
      c.onload=()=>{if(visual.isConnected)sample(c)};
      c.onerror=()=>{};
      c.src=img.currentSrc;
    }
    if(img.complete&&img.naturalWidth)loaded();
    else img.addEventListener('load',loaded,{once:true});
  }

  function addCard(post,index) {
    const card=node('article','on-card '+(post.photo?'on-has-image':'on-no-image'));
    card.dataset.category=upper(post.category || 'NEWS');
    card.dataset.search=upper([post.title,post.category,post.date].join(' '));
    const link=node('a','on-link');
    link.href=post.href||'#';
    if (!post.href) link.addEventListener('click',event=>{event.preventDefault();post.nativeLink&&post.nativeLink.click();});
    if (post.photo) {
      const visual=node('div','on-visual');
      const backdrop=node('img','on-image-backdrop');backdrop.alt='';backdrop.setAttribute('aria-hidden','true');
      backdrop.loading='lazy';backdrop.src=post.photo;visual.appendChild(backdrop);
      const img=node('img','on-image'); img.alt=''; img.loading='lazy'; img.src=post.photo;
      img.addEventListener('error',()=>{
        visual.remove();card.classList.remove('on-has-image');card.classList.add('on-no-image');
      },{once:true});
      visual.appendChild(img);fillImageGutters(img,visual);link.appendChild(visual);
    }
    const info=node('div','on-info');
    const eye=node('div','on-eyebrow');
    eye.appendChild(node('span','on-badge',post.category||'NEWS'));
    info.appendChild(eye);
    info.appendChild(node('h3','on-title',post.title));
    const meta=node('div','on-meta');
    meta.appendChild(node('span','on-meta-label','READ ARTICLE'));
    if(post.date)meta.appendChild(node('time','on-date',post.date));
    info.appendChild(meta);
    link.appendChild(info);card.appendChild(link);
    return card;
  }

  let timer=null;
  let rebuilding=false;
  let observer=null;
  function restore(root) {
    const shell=root.querySelector(':scope > .'+SHELL);
    if(shell) shell.remove();
    Array.from(root.children).forEach(ch=>ch.classList.remove(HIDDEN));
  }
  function build(root) {
    if(rebuilding) return;
    rebuilding=true;
    try {
      restore(root);
      const detail = root.querySelector('.board-view,.board_view,.view-board,.board_view_wrap');
      if (isDetail() || (detail && detail.getClientRects().length > 0)) return true;
      const items=extract(root);
      if (!items.length) return false; // Unknown DOM: keep native board visible.
      const shell=node('section',SHELL);
      const head=node('div','on-head');
      head.appendChild(node('h2','on-heading','Newsroom'));
      head.appendChild(node('span','on-small','OREON LIFE SCIENCE'));
      shell.appendChild(head);

      const grid=node('div','on-grid');
      items.forEach((post,index)=>grid.appendChild(addCard(post,index)));
      shell.appendChild(grid);
      const nativePager=pager(root);
      if(nativePager) {
        const clone=nativePager.cloneNode(true);
        const oldLinks=Array.from(nativePager.querySelectorAll('a'));
        Array.from(clone.querySelectorAll('a')).forEach((link,index)=>{
          if (link.getAttribute('href')==='#' || !link.getAttribute('href')) {
            link.addEventListener('click',event=>{event.preventDefault();oldLinks[index]&&oldLinks[index].click();});
          }
        });
        const wrap=node('div','on-pager');wrap.appendChild(clone);shell.appendChild(wrap);
      }
      root.insertBefore(shell,root.firstChild);
      Array.from(root.children).forEach(ch=>{if(ch!==shell)ch.classList.add(HIDDEN);});
      return true;
    } catch (e) {
      restore(root);console.warn('[OREON NEWS V05] Native board retained:',e);
      return false;
    } finally {
      rebuilding=false;
    }
  }
  function hideWrite(root){
    root.querySelectorAll('a,button').forEach(el=>{
      if (el.closest('.'+SHELL)) return;
      if (/^(글쓰기|WRITE|WRITE POST|POST WRITE)$/i.test(norm(el.textContent))) el.style.setProperty('display','none','important');
    });
  }
  function boot(tries=0) {
    const root=document.getElementById(ID);
    if (!root) {if(tries<100) setTimeout(()=>boot(tries+1),250);return;}
    hideWrite(root);
    const rendered=build(root);
    if(!rendered && tries<100) setTimeout(()=>boot(tries+1),250);
    if (!observer) {
    observer=new MutationObserver(mutations=>{
      if(rebuilding) return;
      const changed=mutations.some(m=>{
        const el=m.target.nodeType===1?m.target:m.target.parentElement;
        return !!el && !el.closest('.'+SHELL) && el!==root || (el===root && Array.from(m.addedNodes||[]).some(n=>n.nodeType===1&&!n.classList.contains(SHELL)));
      });
      if(!changed)return;
      clearTimeout(timer);
      timer=setTimeout(()=>{hideWrite(root);build(root);},350);
    });
    observer.observe(root,{childList:true,subtree:true,characterData:true});
    }
  }
  boot();
})();
