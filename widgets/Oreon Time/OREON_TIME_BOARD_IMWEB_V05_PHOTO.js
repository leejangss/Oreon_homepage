/* OREON TIME photo-card board V05.
   Reads Imweb photo/gallery posts; keeps native posts intact underneath for routing.
   Hides native public write controls; publishing remains available via Imweb admin.
*/
(function(){
"use strict";
const ID="w202610103e49cc0075aa3", STYLE="oreon-time-photo-v05-style";
const CATS=["CONFERENCE & EXHIBITION","EMPLOYEE STORY","GLOBAL PARTNERS"];
const norm=s=>String(s||"").replace(/\s+/g," ").trim();
const upper=s=>norm(s).toUpperCase();
const excluded=new Set(["ALL","SEARCH","글쓰기","WRITE","CONFERENCE & EXHIBITION","EMPLOYEE STORY","GLOBAL PARTNERS"]);
const isDate=t=>/^20\d{2}[-./]\d{1,2}[-./]\d{1,2}$/.test(norm(t))||/^\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+20\d{2}$/i.test(norm(t))||/^(\d+)\s*(분|시간|일|주|개월|년)전$/.test(norm(t))||norm(t)==="방금";
if(!document.getElementById(STYLE)){
 const style=document.createElement("style");style.id=STYLE;
 style.textContent=`
#${ID}{max-width:1400px!important;margin:0 auto!important;padding:0!important;background:transparent!important}
#${ID}>.oreon-time-native-hidden{display:none!important}
/* Native blue WRITE button: never show in public or board view. */
#${ID} .btn-write,#${ID} .btn_write,#${ID} .board_write,#${ID} .board-write,
#${ID} .write_btn,#${ID} .write-button,#${ID} .btn-write-wrap,
#${ID} .board_write_btn,#${ID} a[href*="write_mode"],
#${ID} a[href*="mode=write"]{display:none!important}
#${ID} .oreon-time-shell{background:#0b111b;border:1px solid rgba(160,180,205,.18);border-radius:22px;padding:48px 52px 40px;box-sizing:border-box;overflow:hidden}
#${ID} .oreon-time-toolbar{display:flex;justify-content:space-between;align-items:center;gap:28px;margin:0 0 34px}
#${ID} .oreon-time-tabs{display:flex;align-items:center;flex-wrap:wrap;gap:12px}
#${ID} .oreon-time-tab{appearance:none;height:46px;padding:0 26px;border:1px solid rgba(189,205,224,.55);border-radius:999px;background:transparent;color:#d5dce7;font:600 14px/1 Arial,sans-serif;letter-spacing:.02em;cursor:pointer;transition:transform .15s,box-shadow .25s,background .25s,border-color .25s}
#${ID} .oreon-time-tab:hover{border-color:#2f6ce0;color:#fff;transform:translateY(-1px);box-shadow:0 0 0 3px rgba(47,168,232,.1),0 0 16px rgba(47,108,255,.2)}
#${ID} .oreon-time-tab.is-active{background:linear-gradient(135deg,#071126 0%,#102d88 55%,#1949b8 100%);border-color:#1949b8;color:#fff}
#${ID} .oreon-time-search{position:relative;width:min(340px,32vw);flex:0 0 auto}
#${ID} .oreon-time-search input{width:100%;height:46px;box-sizing:border-box;border:1px solid rgba(185,198,217,.35);border-radius:999px;outline:0;background:rgba(255,255,255,.035);color:#eef4fb;padding:0 48px 0 22px;font:500 14px/1 Arial,sans-serif}
#${ID} .oreon-time-search input::placeholder{color:#aab4c4}
#${ID} .oreon-time-search svg{position:absolute;right:18px;top:50%;width:18px;height:18px;transform:translateY(-50%);stroke:#9fb0c7;pointer-events:none}
#${ID} .oreon-time-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:24px;row-gap:30px;border-top:1px solid rgba(172,190,213,.28);padding-top:30px}
#${ID} .oreon-time-card{min-width:0;background:rgba(255,255,255,.018);border:1px solid rgba(160,180,205,.18);border-radius:15px;overflow:hidden;transition:border-color .25s,box-shadow .25s}
#${ID} .oreon-time-card:hover{border-color:rgba(47,108,224,.5);box-shadow:0 12px 30px rgba(0,0,0,.16)}
#${ID} .oreon-time-card-link{display:block;color:inherit!important;text-decoration:none!important}
#${ID} .oreon-time-photo{aspect-ratio:16/10;background:linear-gradient(135deg,#101f37,#0a111d);overflow:hidden;position:relative}
#${ID} .oreon-time-photo img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .35s ease-out}
#${ID} .oreon-time-card:hover .oreon-time-photo img{transform:scale(1.025)}
#${ID} .oreon-time-photo-empty{height:100%;display:flex;align-items:center;justify-content:center;color:#58769f;font:600 12px Arial,sans-serif;letter-spacing:.24em}
#${ID} .oreon-time-info{padding:23px 22px 25px}
#${ID} .oreon-time-badge{display:inline-flex;align-items:center;justify-content:center;min-height:28px;padding:0 12px;border:1px solid rgba(47,108,224,.55);border-radius:999px;color:#8fb8ff;font:600 10px/1.2 Arial,sans-serif;letter-spacing:.04em;max-width:100%;box-sizing:border-box;text-align:center}
#${ID} .oreon-time-title{margin:16px 0 19px;color:#f0f3f7;font:600 18px/1.48 Arial,sans-serif;min-height:2.96em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#${ID} .oreon-time-card:hover .oreon-time-title{color:#6fb6ef}
#${ID} .oreon-time-meta{border-top:1px solid rgba(160,180,205,.14);padding-top:14px;display:flex;justify-content:space-between;gap:10px;color:#aeb9c9;font:500 12px/1.4 Arial,sans-serif}
#${ID} .oreon-time-empty{display:none;padding:42px 12px 18px;text-align:center;color:#8f9caf;font:500 14px/1.5 Arial,sans-serif}
#${ID} .oreon-time-pagination{display:flex;justify-content:center;margin-top:26px}
#${ID} .oreon-time-pagination a,#${ID} .oreon-time-pagination span{color:#aeb9c9!important}
#${ID} .oreon-time-admin-actions{display:none!important;justify-content:flex-end;margin-top:26px}
#${ID} .oreon-time-write{display:none!important;height:44px;padding:0 24px;align-items:center;justify-content:center;border:0;border-radius:999px;background:linear-gradient(135deg,#071126,#102d88 55%,#1949b8);color:#fff!important;font:700 13px/1 Arial,sans-serif;cursor:pointer}
html.oreon-time-admin #${ID} .oreon-time-admin-actions{display:flex!important}
html.oreon-time-admin #${ID} .oreon-time-write{display:inline-flex!important}
@media(max-width:1100px){#${ID} .oreon-time-shell{padding:30px 24px}#${ID} .oreon-time-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#${ID} .oreon-time-toolbar{flex-direction:column;align-items:stretch;gap:18px}#${ID} .oreon-time-search{width:100%}#${ID} .oreon-time-tab{height:40px;padding:0 16px;font-size:12px}}
@media(max-width:650px){#${ID} .oreon-time-shell{padding:24px 16px;border-radius:18px}#${ID} .oreon-time-grid{grid-template-columns:1fr;gap:18px}#${ID} .oreon-time-tabs{gap:8px}#${ID} .oreon-time-tab{padding:0 12px;font-size:11px}#${ID} .oreon-time-info{padding:18px}#${ID} .oreon-time-title{font-size:16px}}
 `;
 document.head.appendChild(style);
}
function visible(el){if(!el||!el.getBoundingClientRect)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=="none"&&s.visibility!=="hidden";}
function imageSource(img){
 if(!img)return "";
 const s=img.getAttribute("data-src")||img.getAttribute("data-original")||img.getAttribute("data-lazy-src")||img.currentSrc||img.getAttribute("src")||"";
 if(s&&!s.startsWith("data:image/svg")&&!s.startsWith("data:image/gif;base64,R0lGODlhAQAB"))return s;
 return "";
}
function backgroundSource(el){
 if(!el)return "";
 const style=el.getAttribute("style")||"";
 const match=style.match(/background-image\s*:\s*url\(\s*(['"]?)(.*?)\1\s*\)/i);
 return match?match[2]:"";
}
function likelyPhoto(el){
 if(!el)return false;
 const img=[...el.querySelectorAll("img")].find(x=>!/(avatar|profile|icon|user|emoticon|logo)/i.test((x.getAttribute("src")||"")+" "+(x.className||"")));
 if(img&&imageSource(img))return true;
 return !![...el.querySelectorAll("[style*='background']")].map(backgroundSource).find(Boolean);
}
function pickCard(anchor,root){
 let el=anchor, fallback=null;
 for(let n=0;n<12&&el&&el!==root;el=el.parentElement,n++){
  if(el.classList.contains("oreon-time-shell"))break;
  const t=norm(el.textContent);
  if(t.length>2200)break;
  if(!likelyPhoto(el))continue;
  if(t.length>2&&!fallback)fallback=el;
  // Prefer the repeated tile / gallery item, not its inner image wrapper.
  if(el.matches("li,article,tr,[class*='gallery-item'],[class*='gallery_item'],[class*='board-item'],[class*='board_item'],[class*='card'],[class*='col-md-'],[class*='col-sm-'],[class*='col-xs-'],[class*='list_item'],[class*='list-item'],[class*='item-wrap'],[class*='item_wrap']"))return el;
  if(el.parentElement&&el.parentElement.children.length>=2&&t.length>=5)return el;
 }
 return fallback;
}
function getTitle(tile){
 const selectors=[".board-title",".board_title",".post-title",".post_title",".title a",".title",".subject a",".subject",".txt_title","[class*='title'] a","a[title]"];
 for(const sel of selectors){
  const node=tile.querySelector(sel);
  const t=norm(node?.textContent)||norm(node?.getAttribute("title"));
  if(t&&t.length>2&&t.length<220&&!isDate(t)&&!excluded.has(upper(t)))return {text:t,link:node.closest("a")||tile.querySelector("a")};
 }
 const links=[...tile.querySelectorAll("a")];
 const candidates=links.map(a=>({text:norm(a.textContent)||norm(a.getAttribute("title")),link:a}))
  .filter(o=>o.text.length>2&&o.text.length<220&&!isDate(o.text)&&!excluded.has(upper(o.text))&&!/^(관리자|ADMIN|답글|댓글|좋아요|MORE|READ MORE)$/.test(upper(o.text)));
 candidates.sort((a,b)=>b.text.length-a.text.length);
 if(candidates.length)return candidates[0];
 const textNodes=[...tile.querySelectorAll("h1,h2,h3,h4,p,span,div")].filter(x=>x.children.length===0);
 const texts=textNodes.map(el=>norm(el.textContent)).filter(t=>t.length>2&&t.length<220&&!isDate(t)&&!excluded.has(upper(t))&&!/^(관리자|ADMIN)$/.test(upper(t)));
 const text=texts.sort((a,b)=>b.length-a.length)[0]||"";
 return {text,link:links[0]||null};
}
function extract(root){
 const native=[...root.children].filter(ch=>!ch.classList.contains("oreon-time-shell"));
 const out=[],seen=new Set(),seenPosts=new Set();
 const allImgs=native.flatMap(ch=>[...ch.querySelectorAll("img")]).filter(img=>visible(img)&&imageSource(img));
 const anchors=native.flatMap(ch=>[...ch.querySelectorAll("a")])
  .filter(a=>!a.closest(".pagination,.pagination_wrap,.paging,.board_paging,.paging-block"));
 // Image-first discovery also handles Imweb galleries whose picture links have no text.
 const candidates=[...new Set([...allImgs.map(img=>img.closest("a")||img),...anchors])];
 for(const element of candidates){
  const tile=pickCard(element,root);
  if(!tile||seen.has(tile)||tile.closest(".oreon-time-shell"))continue;
  if(tile.querySelectorAll("img").length>5)continue; // likely entire gallery, not a post
  const {text:title,link}=getTitle(tile);
  if(!title)continue;
  const image=[...tile.querySelectorAll("img")].find(x=>!/(avatar|profile|icon|user|emoticon|logo)/i.test((x.getAttribute("src")||"")+" "+(x.className||"")));
  const bg=[...tile.querySelectorAll("[style*='background']")].map(backgroundSource).find(Boolean);
  const photo=imageSource(image)||bg||"";
  const category=CATS.find(c=>upper(tile.textContent).includes(c))||"";
  const strings=[...tile.querySelectorAll("time,span,div,small")].filter(x=>x.children.length===0).map(x=>norm(x.textContent));
  const date=strings.find(isDate)||"";
  const no=strings.find(x=>/^\d+$/.test(x))||String(out.length+1);
  const target=link||element.closest("a")||tile.querySelector("a");
  if(!target)continue;
  const raw=target.getAttribute("href")||"";
  const href=raw&&raw!=="#"&&!/^javascript:/i.test(raw)?target.href:"";
  // One photo and title may be discovered through multiple nested gallery anchors.
  // De-duplicate by actual destination first, then normalized title + image.
  const cleanHref=href ? href.replace(/#.*$/,'').replace(/([?&])preview_mode=1(&|$)/,'$1').replace(/[?&]$/,'') : '';
  const key=cleanHref || (upper(title)+'|'+photo);
  seen.add(tile);
  if(seenPosts.has(key))continue;
  seenPosts.add(key);
  out.push({title,photo,category,date,no,href,nativeLink:target});
 }
 return out;
}
function pagination(root){for(const sel of [".pagination",".pagination_wrap",".paging",".board_paging",".paging-block"]){const el=root.querySelector(sel);if(el&&visible(el))return el;}return null;}
function admin(){const u=(location.href||"").toLowerCase(),r=(document.referrer||"").toLowerCase();return !u.includes("preview_mode=1")&&(location.hostname==="admin.imweb.me"||r.includes("admin.imweb.me")||!!document.querySelector(".doz_admin,#admin_header,.admin_header,.design-mode,.design_mode"));}
if(admin())document.documentElement.classList.add("oreon-time-admin");
function build(root){
 if(root.dataset.oreonTimeBuilding==="1")return;root.dataset.oreonTimeBuilding="1";
 try{
 root.querySelectorAll(":scope > .oreon-time-shell").forEach(x=>x.remove());
 [...root.children].forEach(x=>x.classList.remove("oreon-time-native-hidden"));
 const posts=extract(root),page=pagination(root);
 // On unrecognized Imweb gallery markup, leave the native board visible instead of rendering an empty UI.
 if(!posts.length)return;
 // Do not reproduce WRITE buttons: manage and publish from Imweb admin. 
 const write=null;
 const shell=document.createElement("div");shell.className="oreon-time-shell";
 shell.innerHTML=`<div class="oreon-time-toolbar"><div class="oreon-time-tabs"><button class="oreon-time-tab is-active" data-cat="ALL">ALL</button><button class="oreon-time-tab" data-cat="CONFERENCE & EXHIBITION">Conference & Exhibition</button><button class="oreon-time-tab" data-cat="EMPLOYEE STORY">Employee Story</button><button class="oreon-time-tab" data-cat="GLOBAL PARTNERS">Global Partners</button></div><label class="oreon-time-search"><input type="search" placeholder="Search" aria-label="Search Oreon Time posts"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke-width="1.7"/><path d="M16.5 16.5L21 21" stroke-width="1.7" stroke-linecap="round"/></svg></label></div><div class="oreon-time-grid"></div><div class="oreon-time-empty" hidden>No OREON TIME posts found.</div><div class="oreon-time-pagination"></div><div class="oreon-time-admin-actions"></div>`;
 const grid=shell.querySelector(".oreon-time-grid");
 posts.forEach(p=>{
  const card=document.createElement("article");card.className="oreon-time-card";card.dataset.category=p.category;card.dataset.search=upper([p.title,p.category,p.date].join(" "));
  const a=document.createElement("a");a.className="oreon-time-card-link";a.href=p.href||"#";
  if(!p.href)a.addEventListener("click",e=>{e.preventDefault();p.nativeLink.click();});
  const photo=document.createElement("div");photo.className="oreon-time-photo";
  if(p.photo){const img=document.createElement("img");img.src=p.photo;img.alt="";img.loading="lazy";photo.appendChild(img);}
  else{const empty=document.createElement("div");empty.className="oreon-time-photo-empty";empty.textContent="OREON TIME";photo.appendChild(empty);}
  const info=document.createElement("div");info.className="oreon-time-info";
  if(p.category){const badge=document.createElement("span");badge.className="oreon-time-badge";badge.textContent=p.category;info.appendChild(badge);}
  const title=document.createElement("h3");title.className="oreon-time-title";title.textContent=p.title;info.appendChild(title);
  const meta=document.createElement("div");meta.className="oreon-time-meta";
  const no=document.createElement("span");no.textContent=p.no?"NO. "+p.no:"";const date=document.createElement("span");date.textContent=p.date;meta.append(no,date);info.appendChild(meta);
  a.append(photo,info);card.appendChild(a);grid.appendChild(card);
 });
 if(page)shell.querySelector(".oreon-time-pagination").appendChild(page.cloneNode(true));
 root.insertBefore(shell,root.firstChild);
 [...root.children].forEach(ch=>{if(ch!==shell)ch.classList.add("oreon-time-native-hidden");});
 const cards=[...grid.children],empty=shell.querySelector(".oreon-time-empty"),input=shell.querySelector("input");let active="ALL";
 function filter(){const q=upper(input.value);let count=0;cards.forEach(c=>{const show=(active==="ALL"||c.dataset.category===active)&&(!q||c.dataset.search.includes(q));c.style.display=show?"":"none";if(show)count++;});empty.hidden=!!count;empty.style.display=count?"none":"block";}
 shell.querySelectorAll(".oreon-time-tab").forEach(b=>b.addEventListener("click",()=>{shell.querySelectorAll(".oreon-time-tab").forEach(x=>x.classList.remove("is-active"));b.classList.add("is-active");active=b.dataset.cat;filter();}));
 input.addEventListener("input",filter);filter();
 if(write){const b=document.createElement("button");b.type="button";b.className="oreon-time-write";b.textContent="WRITE →";b.addEventListener("click",()=>{const href=write.getAttribute("href");if(href&&href!=="#"&&!/^javascript:/i.test(href))location.href=write.href;else write.click();});shell.querySelector(".oreon-time-admin-actions").appendChild(b);}
 }finally{root.dataset.oreonTimeBuilding="0";}
}
function boot(n=0){const root=document.getElementById(ID);if(!root){if(n<60)setTimeout(()=>boot(n+1),200);return;}
 build(root);
 [...root.querySelectorAll("a,button")].forEach(el=>{
   if(["글쓰기","WRITE"].includes(upper(el.textContent))&&!el.closest(".oreon-time-shell")){
     el.style.setProperty("display","none","important");
   }
 });
 let timer;new MutationObserver(mutations=>{if(!mutations.some(m=>{const e=m.target.nodeType===1?m.target:m.target.parentElement;return e&&!e.closest(".oreon-time-shell");}))return;clearTimeout(timer);timer=setTimeout(()=>{
  build(root);
  [...root.querySelectorAll("a,button")].forEach(el=>{
    if(["글쓰기","WRITE"].includes(upper(el.textContent))&&!el.closest(".oreon-time-shell"))
      el.style.setProperty("display","none","important");
  });
 },300);}).observe(root,{childList:true,subtree:true,characterData:true});}
boot();
})();