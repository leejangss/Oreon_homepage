/* OREON Life Science · NEWS Editorial Board v1
 * Widget w202609085cc91e7d0d0b8
 * Display-only enhancement of the native Imweb NEWS board.
 * Native post links, categories, pagination and administration remain in Imweb.
 * The former 'hide .btn-primary' CSS is included here.
 */
(function () {
  'use strict';

  const ID = 'w202609085cc91e7d0d0b8';
  const SECTION = 's2026080930f1bc2f3bf2e';
  const STYLE_ID = 'oreon-news-editorial-v01-styles';
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
      /* Keep the same write-button behavior as the original Imweb CSS. */
      #${SECTION} .btn-primary,
      #${ID} .btn-write, #${ID} .btn_write, #${ID} .board_write,
      #${ID} .board-write, #${ID} .write_btn, #${ID} .write-button,
      #${ID} .btn-write-wrap, #${ID} .board_write_btn,
      #${ID} a[href*="write_mode"], #${ID} a[href*="mode=write"]{
        display:none!important;
      }
      #${ID}{width:100%;max-width:1440px;margin:0 auto!important;background:transparent!important;box-sizing:border-box}
      #${ID} > .${HIDDEN}{display:none!important}
      #${ID} .${SHELL}{font-family:'Outfit','Noto Sans KR',Arial,sans-serif;color:#eaf0f8;box-sizing:border-box;padding:0 0 68px}
      #${ID} .on-head{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 0 28px}
      #${ID} .on-heading{font-size:clamp(26px,3.2vw,43px);font-weight:500;line-height:1.1;letter-spacing:-.035em;color:#f3f6fb;margin:0}
      #${ID} .on-heading em{font-style:normal;color:#7abef0}
      #${ID} .on-small{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8492aa}
      #${ID} .on-feature,
      #${ID} .on-card{position:relative;min-width:0;overflow:hidden;box-sizing:border-box;border-radius:18px;isolation:isolate;transition:transform .25s ease,background .25s ease,box-shadow .25s ease}
      #${ID} .on-feature{min-height:390px;background:#101b2d;border:1px solid rgba(151,180,217,.14);margin-bottom:21px}
      #${ID} .on-feature.on-has-image{display:grid;grid-template-columns:1.07fr 1fr}
      #${ID} .on-feature.on-no-image{background:radial-gradient(ellipse at 86% 30%,rgba(45,96,169,.28),transparent 55%),linear-gradient(118deg,#16283b,#0b1526 78%)}
      #${ID} .on-link{display:flex;flex-direction:column;width:100%;height:100%;color:inherit!important;text-decoration:none!important;outline-offset:-3px}
      #${ID} .on-feature.on-has-image .on-link{display:contents}
      #${ID} .on-visual{overflow:hidden;position:relative;background:#101c2c}
      #${ID} .on-feature .on-visual{min-height:390px}
      #${ID} .on-image{display:block;width:100%;height:100%;position:absolute;inset:0;object-fit:cover;object-position:center;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
      #${ID} .on-feature .on-info{padding:39px clamp(26px,4vw,58px) 36px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;min-width:0;gap:36px}
      #${ID} .on-feature.on-no-image .on-info{min-height:390px;max-width:100%;padding:40px clamp(25px,5vw,68px)}
      #${ID} .on-eyebrow{display:flex;align-items:center;flex-wrap:wrap;gap:12px;max-width:100%}
      #${ID} .on-badge{font-family:'IBM Plex Mono',monospace;font-size:10px;line-height:1.4;letter-spacing:.065em;font-weight:500;text-transform:uppercase;color:#c3d9ea;border:1px solid rgba(179,209,235,.28);background:rgba(238,249,255,.045);border-radius:999px;padding:7px 12px;display:inline-flex;align-items:center;gap:7px;max-width:100%;box-sizing:border-box}
      #${ID} .on-badge::before{content:'';width:5px;height:5px;flex:0 0 5px;background:#78c8f4;border-radius:50%}
      #${ID} .on-date{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.025em;color:#95a7bd}
      #${ID} .on-title{overflow-wrap:anywhere;word-break:keep-all;font-weight:500;color:#f4f7fb;margin:0;letter-spacing:-.035em}
      #${ID} .on-feature .on-title{font-size:clamp(25px,2.45vw,38px);line-height:1.35;max-width:760px}
      #${ID} .on-feature .on-middle{display:flex;align-items:flex-start;flex-direction:column;gap:18px;width:100%;margin:auto 0}
      #${ID} .on-subtitle{font-size:13px;line-height:1.6;color:#a9b8cc;margin:0}
      #${ID} .on-read{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.09em;color:#c4d6e7;text-transform:uppercase}
      #${ID} .on-arrow{width:39px;height:39px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(191,219,244,.28);font-size:20px;line-height:1;color:#d5e8f9;transition:background .2s ease,color .2s ease,transform .2s ease}
      #${ID} .on-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:21px;align-items:stretch}
      #${ID} .on-card{min-height:305px;border:1px solid rgba(170,193,221,.12);background:#1b2838}
      #${ID} .on-card.on-tone-1{background:linear-gradient(145deg,#253d4a,#182b38)}
      #${ID} .on-card.on-tone-2{background:linear-gradient(145deg,#142b40,#132034)}
      #${ID} .on-card.on-tone-3{background:linear-gradient(145deg,#202d3d,#151f2e)}
      #${ID} .on-card .on-visual{height:210px;flex:0 0 210px}
      #${ID} .on-card.on-has-image{min-height:420px}
      #${ID} .on-card .on-info{padding:24px 25px 22px;display:flex;flex:1;flex-direction:column;gap:20px;min-width:0}
      #${ID} .on-card.on-no-image .on-info{min-height:305px;justify-content:space-between;padding:29px 27px 22px}
      #${ID} .on-card .on-title{font-size:clamp(16px,1.33vw,20px);line-height:1.52;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
      #${ID} .on-card.on-no-image .on-title{font-size:clamp(19px,1.52vw,23px);line-height:1.47;-webkit-line-clamp:5}
      #${ID} .on-card .on-middle{margin:0;flex:1;display:flex;align-items:flex-start}
      #${ID} .on-card .on-read{border-top:1px solid rgba(199,219,242,.13);padding-top:16px}
      #${ID} .on-card .on-arrow{width:31px;height:31px;font-size:17px;border-radius:50%}
      #${ID} .on-feature:hover, #${ID} .on-card:hover{transform:translateY(-3px);box-shadow:0 18px 42px rgba(0,0,0,.18)}
      #${ID} .on-feature:hover .on-image, #${ID} .on-card:hover .on-image{transform:scale(1.035)}
      #${ID} .on-feature:hover .on-arrow, #${ID} .on-card:hover .on-arrow{color:#071321;background:#9ddaff;transform:translateX(2px)}
      #${ID} .on-pager{padding-top:33px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
      #${ID} .on-pager a,#${ID} .on-pager span{color:#c6d2e2!important}
      #${ID} .on-pager .btn-primary{display:none!important}
      @media(max-width:1000px){#${ID} .on-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#${ID} .on-feature{min-height:340px}#${ID} .on-feature .on-visual{min-height:340px}}
      @media(max-width:680px){
        #${ID} .${SHELL}{padding-bottom:44px}
        #${ID} .on-head{margin-bottom:20px}
        #${ID} .on-feature.on-has-image{display:flex;flex-direction:column}
        #${ID} .on-feature .on-visual{width:100%;min-height:0;height:230px;flex:0 0 230px}
        #${ID} .on-feature .on-info{padding:24px 22px;gap:24px}
        #${ID} .on-feature.on-no-image .on-info{min-height:320px}
        #${ID} .on-feature .on-title{font-size:25px}
        #${ID} .on-grid{grid-template-columns:1fr;gap:15px}
        #${ID} .on-card{min-height:260px}
        #${ID} .on-card.on-has-image{min-height:0}
        #${ID} .on-card .on-visual{height:205px;flex-basis:205px}
        #${ID} .on-card.on-no-image .on-info{min-height:260px}
        #${ID} .on-card .on-title{font-size:18px}
      }
      @media(prefers-reduced-motion:reduce){#${ID} .on-feature,#${ID} .on-card,#${ID} .on-image,#${ID} .on-arrow{transition:none!important}}
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
    const url = img.getAttribute('data-src') || img.getAttribute('data-original') || img.currentSrc || img.getAttribute('src') || '';
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
      .filter(a => !hasWriteAncestor(a) && !denied.test(norm(a.textContent)));
    const posts=[], usedTiles=new Set(), usedPosts=new Set();
    for (const a of candidates) {
      const tile = resolveTile(a,root);
      if (!tile || usedTiles.has(tile) || tile.closest('.'+SHELL)) continue;
      const {text:rawTitle,link} = titleInfo(tile);
      if (!rawTitle || denied.test(rawTitle)) continue;
      const cat = getCategory(tile,rawTitle);
      const title = cleanTitle(rawTitle,cat);
      if (title.length < 5 || isDate(title)) continue;
      const target = link || a;
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
  function addCard(post,index,featured) {
    const card=node('article',(featured?'on-feature':'on-card')+' '+(post.photo?'on-has-image':'on-no-image')+' on-tone-'+((index%3)+1));
    const link=node('a','on-link');
    link.href=post.href||'#';
    if (!post.href) link.addEventListener('click',event=>{event.preventDefault();post.nativeLink&&post.nativeLink.click();});
    if (post.photo) {
      const visual=node('div','on-visual');
      const img=node('img','on-image');img.alt='';img.loading='lazy';img.src=post.photo;
      img.addEventListener('error',()=>{
        visual.remove();card.classList.remove('on-has-image');card.classList.add('on-no-image');
      },{once:true});
      visual.appendChild(img);link.appendChild(visual);
    }
    const info=node('div','on-info');
    const eye=node('div','on-eyebrow');
    eye.appendChild(node('span','on-badge',post.category||'NEWS'));
    if (post.date) eye.appendChild(node('time','on-date',post.date));
    info.appendChild(eye);
    const middle=node('div','on-middle');
    const title=node(featured?'h2':'h3','on-title',post.title);
    middle.appendChild(title);
    if (featured && post.excerpt) middle.appendChild(node('p','on-subtitle',post.excerpt));
    info.appendChild(middle);
    const read=node('div','on-read');
    read.appendChild(node('span','', 'READ ARTICLE'));
    read.appendChild(node('span','on-arrow','→'));
    info.appendChild(read);
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
      const title=node('h2','on-heading','Newsroom');
      head.appendChild(title);
      head.appendChild(node('span','on-small','OREON LIFE SCIENCE'));
      shell.appendChild(head);
      shell.appendChild(addCard(items[0],0,true));
      if (items.length > 1) {
        const grid=node('div','on-grid');
        items.slice(1).forEach((post,index)=>grid.appendChild(addCard(post,index,false)));
        shell.appendChild(grid);
      }
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
      restore(root);console.warn('[OREON NEWS] Native board retained:',e);
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
