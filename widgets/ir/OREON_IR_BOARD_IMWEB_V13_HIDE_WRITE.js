/* OREON IR BOARD - Imweb custom renderer v13 HIDE WRITE
   Target widget: w20260920efdd7cabae0a1
   Fixes:
   - Reads all native board pages instead of only the currently visible page.
   - Fetches with cache disabled so recently edited Imweb posts are reflected.
   - Strengthens NOTICE / IR NEWS category detection.
   - Keeps the existing custom design, typography, detail-view behavior and CTA.
*/
(function () {
  const ID = "w20260920efdd7cabae0a1";
  const STYLE_ID = "oreon-ir-board-v12-style";
  const CATS = ["NOTICE", "IR NEWS"];
  const EXCLUDE = new Set(["글쓰기","WRITE","IR NEWS","SEARCH","ALL","NOTICE","이동","수정","지우기","삭제","공유","인쇄"]);
  const PAGE_SIZE = 10;
  const MAX_FETCH_PAGES = 40;

  [
    "oreon-ir-board-v5-style","oreon-ir-board-v6-style","oreon-ir-board-v8-style",
    "oreon-ir-board-v9-style","oreon-ir-board-v10-style","oreon-ir-board-v11-style"
  ].forEach(id => {
    const old = document.getElementById(id);
    if (old) old.remove();
  });

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
:root{
  --oir-bg:#020711;
  --oir-card:#0b111b;
  --oir-line:rgba(160,180,205,.18);
  --oir-line-strong:rgba(172,190,213,.28);
  --oir-text:#f2f5f9;
  --oir-sub:#aeb9c9;
  --oir-blue1:#071126;
  --oir-blue2:#102d88;
  --oir-blue3:#1949b8;
  --oir-hover1:#0c1a3d;
  --oir-hover2:#1740c4;
  --oir-hover3:#2f6ce0;
}
#${ID}{
  max-width:1400px!important;
  margin:0 auto!important;
  padding:0!important;
  background:transparent!important;
}
#${ID} > .oreon-ir-native-hidden{display:none!important}

#${ID} .oreon-ir-shell{
  background:var(--oir-card);
  border:1px solid var(--oir-line);
  border-radius:22px;
  padding:48px 52px 40px;
  box-sizing:border-box;
  overflow:hidden;
}
#${ID} .oreon-ir-toolbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:28px;
  margin:0 0 34px;
}
#${ID} .oreon-ir-tabs{
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:12px;
}
#${ID} .oreon-ir-tab{
  appearance:none;
  height:46px;
  padding:0 26px;
  border:1px solid rgba(189,205,224,.55);
  border-radius:999px;
  background:transparent;
  color:#d5dce7;
  font:600 17px/1 Arial,sans-serif;
  letter-spacing:.02em;
  cursor:pointer;
  transition:transform .15s ease,box-shadow .25s ease,background .25s ease,border-color .25s ease;
}
#${ID} .oreon-ir-tab:hover{
  border-color:var(--oir-hover3);
  color:#fff;
  transform:translateY(-1px);
  box-shadow:0 0 0 3px rgba(47,168,232,.10),0 0 16px rgba(47,108,255,.20);
}
#${ID} .oreon-ir-tab.is-active{
  background:linear-gradient(135deg,var(--oir-blue1) 0%,var(--oir-blue2) 55%,var(--oir-blue3) 100%);
  border-color:var(--oir-blue3);
  color:#fff;
}
#${ID} .oreon-ir-search{
  position:relative;
  width:min(340px,32vw);
  flex:0 0 auto;
}
#${ID} .oreon-ir-search input{
  width:100%;
  height:46px;
  box-sizing:border-box;
  border:1px solid rgba(185,198,217,.35);
  border-radius:999px;
  outline:0;
  background:rgba(255,255,255,.035);
  color:#eef4fb;
  padding:0 48px 0 22px;
  font:500 17px/1 Arial,sans-serif;
}
#${ID} .oreon-ir-search input::placeholder{color:#aab4c4}
#${ID} .oreon-ir-search svg{
  position:absolute;
  right:18px;
  top:50%;
  width:18px;
  height:18px;
  transform:translateY(-50%);
  stroke:#9fb0c7;
  pointer-events:none;
}
#${ID} .oreon-ir-head,
#${ID} .oreon-ir-row{
  display:grid;
  grid-template-columns:7% minmax(0,1fr) 18% 15%;
  align-items:center;
  column-gap:0;
}
#${ID} .oreon-ir-head{
  min-height:58px;
  border-top:1px solid var(--oir-line-strong);
  border-bottom:1px solid var(--oir-line-strong);
  color:#f0f4f9;
  font:700 16px/1.3 Arial,sans-serif;
  letter-spacing:.02em;
}
#${ID} .oreon-ir-row{
  min-height:76px;
  border-bottom:1px solid var(--oir-line);
  color:var(--oir-sub);
  font:500 16px/1.45 Arial,sans-serif;
  transition:background .22s ease;
}
#${ID} .oreon-ir-row:hover{background:rgba(100,160,210,.045)}
#${ID} .oreon-ir-cell{padding:0 12px;min-width:0}
#${ID} .oreon-ir-cell--title a{
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:#f0f3f7!important;
  font-weight:600;
  text-decoration:none!important;
  transition:color .22s ease;
}
#${ID} .oreon-ir-row:hover .oreon-ir-cell--title a{color:#6fb6ef!important}
#${ID} .oreon-ir-cell--date{text-align:right}
#${ID} .oreon-ir-badge{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:30px;
  padding:0 14px;
  border:1px solid rgba(47,108,224,.55);
  border-radius:999px;
  color:#8fb8ff;
  font:600 14px/1 Arial,sans-serif;
  letter-spacing:.07em;
  white-space:nowrap;
}
#${ID} .oreon-ir-empty{
  display:none;
  padding:42px 12px 18px;
  text-align:center;
  color:#8f9caf;
  font:500 17px/1.5 Arial,sans-serif;
}
#${ID} .oreon-ir-pagination{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  gap:8px;
  margin-top:26px;
}
#${ID} .oreon-ir-page{
  min-width:36px;
  height:36px;
  padding:0 10px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border:1px solid rgba(185,198,217,.25);
  border-radius:999px;
  background:transparent;
  color:#aeb9c9;
  font:600 13px/1 Arial,sans-serif;
  cursor:pointer;
}
#${ID} .oreon-ir-page:hover{
  color:#fff;
  border-color:rgba(47,108,224,.65);
}
#${ID} .oreon-ir-page.is-active{
  color:#fff;
  border-color:var(--oir-blue3);
  background:linear-gradient(135deg,var(--oir-blue1) 0%,var(--oir-blue2) 55%,var(--oir-blue3) 100%);
}
#${ID} .oreon-ir-page:disabled{opacity:.35;cursor:default}

#${ID} .oreon-ir-admin-actions{
  display:flex;
  justify-content:flex-end;
  margin-top:26px;
}
#${ID} .oreon-ir-write{
  height:44px;
  padding:0 24px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  border:0;
  border-radius:999px;
  background:linear-gradient(135deg,var(--oir-blue1) 0%,var(--oir-blue2) 55%,var(--oir-blue3) 100%);
  color:#fff!important;
  text-decoration:none!important;
  font:700 16px/1 Arial,sans-serif;
  cursor:pointer;
  transition:transform .15s ease,box-shadow .25s ease,background .25s ease;
}
#${ID} .oreon-ir-write:hover{
  transform:translateY(-1px);
  background:linear-gradient(135deg,var(--oir-hover1) 0%,var(--oir-hover2) 55%,var(--oir-hover3) 100%);
  box-shadow:0 0 0 3px rgba(47,168,232,.14),0 0 18px rgba(47,108,255,.30);
}

.oreon-ir-contact-v4{
  width:min(1400px,calc(100% - 40px));
  margin:72px auto 0;
  padding:56px 64px;
  box-sizing:border-box;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:40px;
  background:var(--oir-card);
  border:1px solid var(--oir-line);
  border-radius:22px;
}
.oreon-ir-contact-v4 h3{
  margin:0 0 10px;
  color:var(--oir-text);
  font:700 27px/1.3 Arial,sans-serif;
}
.oreon-ir-contact-v4 p{
  margin:0;
  color:var(--oir-sub);
  font:500 18px/1.7 Arial,sans-serif;
}
.oreon-ir-contact-v4 a{
  min-width:180px;
  height:54px;
  padding:0 26px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:18px;
  border-radius:999px;
  background:linear-gradient(135deg,var(--oir-blue1) 0%,var(--oir-blue2) 55%,var(--oir-blue3) 100%);
  color:#f2f6fb!important;
  text-decoration:none!important;
  font:700 17px/1 Arial,sans-serif;
  transition:transform .15s ease,box-shadow .25s ease,background .25s ease;
}
.oreon-ir-contact-v4 a:hover{
  transform:translateY(-2px);
  background:linear-gradient(135deg,var(--oir-hover1) 0%,var(--oir-hover2) 55%,var(--oir-hover3) 100%);
  box-shadow:0 0 0 3px rgba(47,168,232,.18),0 0 20px 3px rgba(47,108,255,.38);
}

/* Keep the larger V11 typography */
#${ID} .oreon-ir-tab{font-size:17px!important}
#${ID} .oreon-ir-search input{font-size:17px!important}
#${ID} .oreon-ir-head{font-size:16px!important}
#${ID} .oreon-ir-row{font-size:16px!important}
#${ID} .oreon-ir-badge{font-size:14px!important}
#${ID} .oreon-ir-empty{font-size:17px!important}
#${ID} .oreon-ir-write{font-size:16px!important}
.oreon-ir-contact-v4 h3{font-size:27px!important}
.oreon-ir-contact-v4 p{font-size:18px!important}
.oreon-ir-contact-v4 a{font-size:17px!important}

@media(max-width:900px){
  #${ID} .oreon-ir-shell{border-radius:18px;padding:30px 24px}
  #${ID} .oreon-ir-toolbar{flex-direction:column;align-items:stretch;gap:18px}
  #${ID} .oreon-ir-search{width:100%}
  #${ID} .oreon-ir-tab{height:40px;padding:0 18px;font-size:15px!important}
  #${ID} .oreon-ir-head,
  #${ID} .oreon-ir-row{grid-template-columns:10% minmax(0,1fr) 35%}
  #${ID} .oreon-ir-cell--date{display:none}
  .oreon-ir-contact-v4{margin-top:46px;padding:36px 28px;flex-direction:column;align-items:flex-start}
  .oreon-ir-contact-v4 a{width:100%;box-sizing:border-box}
}
@media(max-width:560px){
  #${ID} .oreon-ir-shell{padding:24px 16px}
  #${ID} .oreon-ir-tabs{gap:8px}
  #${ID} .oreon-ir-tab{padding:0 14px;font-size:14px!important}
  #${ID} .oreon-ir-head{font-size:14px!important}
  #${ID} .oreon-ir-row{font-size:15px;min-height:68px}
  #${ID} .oreon-ir-head,
  #${ID} .oreon-ir-row{grid-template-columns:12% minmax(0,1fr) 30%}
  #${ID} .oreon-ir-badge{padding:0 9px;font-size:12px!important;letter-spacing:.04em}
}
`;
    document.head.appendChild(style);
  }

  const norm = s => (s || "").replace(/\s+/g, " ").trim();
  const upper = s => norm(s).toUpperCase();

  function isDateText(t){
    const s = norm(t);
    return /^20\d{2}[-./]\d{1,2}[-./]\d{1,2}$/.test(s) ||
           /^\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+20\d{2}$/i.test(s) ||
           /^(\d+)\s*(분|시간|일|주|개월|년)전$/.test(s) ||
           s === "방금";
  }

  function getLeafTexts(scope){
    return [...scope.querySelectorAll("*")].filter(el=>{
      const txt = norm(el.textContent);
      if(!txt) return false;
      return ![...el.children].some(ch=>norm(ch.textContent) === txt);
    });
  }

  function findRowForAnchor(a, root){
    let n = a;
    for(let i=0;i<9 && n && n!==root;i++,n=n.parentElement){
      const txt = norm(n.textContent);
      if(!txt || txt.length > 1200) continue;

      const leaves = getLeafTexts(n);
      const hasDate = leaves.some(el=>isDateText(el.textContent));
      const hasNum = leaves.some(el=>/^\d+$/.test(norm(el.textContent)));
      const links = n.querySelectorAll("a").length;

      if(hasDate && hasNum && links <= 8) return n;
    }
    return null;
  }

  function detectCategory(row){
    const pool = [];
    const push = v => { if(v) pool.push(upper(v)); };

    push(row.textContent);
    push(row.innerHTML);

    row.querySelectorAll('[class*="cate" i],[class*="category" i],[data-category],[data-cate],[data-category-name],[title],[aria-label]').forEach(el=>{
      push(el.textContent);
      ["data-category","data-cate","data-category-name","title","aria-label"].forEach(k=>push(el.getAttribute(k)));
    });

    row.querySelectorAll("a[href]").forEach(a=>{
      const h = a.getAttribute("href") || "";
      try{ push(decodeURIComponent(h)); }catch(e){ push(h); }
    });

    const joined = pool.join(" | ");
    if(/\bIR[\s_-]*NEWS\b/i.test(joined)) return "IR NEWS";
    if(/\bNOTICE\b/i.test(joined)) return "NOTICE";
    return "";
  }

  function cleanHref(a, baseUrl){
    const raw = (a && a.getAttribute && a.getAttribute("href")) || "";
    if(!raw || raw === "#" || /^javascript:/i.test(raw)) return "";
    try{
      return new URL(raw, baseUrl || location.href).href;
    }catch(e){
      return "";
    }
  }

  function titleScore(a, row, baseUrl){
    const txt = norm(a.textContent);
    if(!txt || EXCLUDE.has(upper(txt)) || isDateText(txt) || /^\d+$/.test(txt)) return -999;

    const href = cleanHref(a, baseUrl);
    let score = Math.min(txt.length, 80);

    if(/[?&](bmode|mode)=view(?:&|$)/i.test(href)) score += 200;
    if(/[?&](idx|board_idx|post_idx)=/i.test(href)) score += 120;
    if(/\/board\//i.test(href)) score += 50;
    if(CATS.includes(upper(txt))) score -= 300;

    const cat = detectCategory(row);
    if(cat && upper(txt) === cat) score -= 300;

    return score;
  }

  function extractPosts(root, baseUrl){
    const allAnchors = [...root.querySelectorAll("a")];
    const rows = [];
    const seenRows = new Set();

    for(const a of allAnchors){
      const txt = norm(a.textContent);
      if(!txt || EXCLUDE.has(upper(txt))) continue;

      const row = findRowForAnchor(a, root);
      if(!row || seenRows.has(row)) continue;

      seenRows.add(row);
      rows.push(row);
    }

    const out = [];

    for(const row of rows){
      const leaves = getLeafTexts(row);
      const nums = leaves
        .map(el=>norm(el.textContent))
        .filter(t=>/^\d+$/.test(t))
        .map(Number)
        .filter(Number.isFinite);

      const dates = leaves.map(el=>norm(el.textContent)).filter(isDateText);
      const anchors = [...row.querySelectorAll("a")];

      let titleAnchor = null;
      let bestScore = -9999;
      for(const a of anchors){
        const sc = titleScore(a,row,baseUrl);
        if(sc > bestScore){
          bestScore = sc;
          titleAnchor = a;
        }
      }
      if(!titleAnchor || bestScore < 0) continue;

      const title = norm(titleAnchor.textContent);
      if(!title || EXCLUDE.has(upper(title))) continue;

      const href = cleanHref(titleAnchor,baseUrl);
      const category = detectCategory(row);

      out.push({
        no: nums.length ? String(Math.max(...nums)) : "",
        title,
        category,
        date: dates.length ? dates[0] : "",
        href,
        nativeLink: titleAnchor
      });
    }

    return out;
  }

  function canonicalUrl(url){
    try{
      const u = new URL(url,location.href);
      u.hash = "";
      u.searchParams.delete("oir_refresh");
      return u.href;
    }catch(e){
      return url || "";
    }
  }

  function postKey(p){
    const href = canonicalUrl(p.href || "");
    if(href) return "H:"+href;
    return "T:"+upper(p.title)+"|"+upper(p.date);
  }

  function mergePosts(target, posts){
    const seen = new Set(target.map(postKey));
    for(const p of posts){
      const k = postKey(p);
      if(seen.has(k)) continue;
      seen.add(k);
      target.push(p);
    }
  }

  function getPaginationContainers(root){
    const selectors = [
      ".pagination",".pagination_wrap",".paging",".board_paging",".paging-block",
      '[class*="paging" i]','[class*="pagination" i]'
    ];
    const out = [];
    const seen = new Set();
    selectors.forEach(sel=>{
      try{
        root.querySelectorAll(sel).forEach(el=>{
          if(!seen.has(el)){ seen.add(el); out.push(el); }
        });
      }catch(e){}
    });
    return out;
  }

  function pageNumberFromControl(el){
    const attrs = ["data-page","data-pageno","data-page-no","data-page_num","data-page-num"];
    for(const k of attrs){
      const v = el.getAttribute && el.getAttribute(k);
      if(v && /^\d+$/.test(v)) return Number(v);
    }

    const txt = norm(el.textContent);
    if(/^\d+$/.test(txt)) return Number(txt);

    const onclick = (el.getAttribute && el.getAttribute("onclick")) || "";
    const m = onclick.match(/(?:page|pageno|page_no|pageNum)\D{0,8}(\d+)/i);
    return m ? Number(m[1]) : null;
  }

  function makePageUrl(baseUrl,pageNo){
    try{
      const u = new URL(baseUrl,location.href);
      u.hash = "";
      u.searchParams.set("page",String(pageNo));
      return u.href;
    }catch(e){
      return "";
    }
  }

  function discoverPaginationUrls(root,baseUrl){
    const found = [];
    const seen = new Set();

    const add = url=>{
      if(!url) return;
      try{
        const u = new URL(url,baseUrl || location.href);
        if(u.origin !== location.origin) return;
        if(/[?&](bmode|mode)=view(?:&|$)/i.test(u.href)) return;
        const key = canonicalUrl(u.href);
        if(seen.has(key)) return;
        seen.add(key);
        found.push(u.href);
      }catch(e){}
    };

    const containers = getPaginationContainers(root);
    containers.forEach(box=>{
      box.querySelectorAll("a,button").forEach(el=>{
        const href = el.getAttribute && el.getAttribute("href");
        if(href && href !== "#" && !/^javascript:/i.test(href)){
          add(new URL(href,baseUrl || location.href).href);
        }else{
          const n = pageNumberFromControl(el);
          if(n) add(makePageUrl(baseUrl || location.href,n));
        }
      });
    });

    return found;
  }

  async function fetchBoardPage(url){
    try{
      const u = new URL(url,location.href);
      u.hash = "";
      u.searchParams.set("oir_refresh",String(Date.now()));

      const res = await fetch(u.href,{
        method:"GET",
        credentials:"same-origin",
        cache:"no-store",
        headers:{
          "Cache-Control":"no-cache",
          "Pragma":"no-cache"
        }
      });

      if(!res.ok) return null;

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html,"text/html");
      const root = doc.getElementById(ID);
      if(!root) return null;

      return {root, url:canonicalUrl(url)};
    }catch(e){
      return null;
    }
  }

  async function collectAllPosts(liveRoot){
    const collected = [];
    const pageQueue = [];
    const queued = new Set();
    const visited = new Set();

    const enqueue = url=>{
      const key = canonicalUrl(url);
      if(!key || queued.has(key) || visited.has(key)) return;
      queued.add(key);
      pageQueue.push(key);
    };

    // First request the current page fresh. This avoids stale Imweb DOM after editing a post.
    const freshCurrent = await fetchBoardPage(location.href);
    const firstRoot = freshCurrent ? freshCurrent.root : liveRoot;
    const firstBase = freshCurrent ? freshCurrent.url : location.href;

    mergePosts(collected,extractPosts(firstRoot,firstBase));
    discoverPaginationUrls(firstRoot,firstBase).forEach(enqueue);

    // If the board markup exposes page numbers only through JS, add page=2 as a conservative fallback.
    if(pageQueue.length === 0){
      enqueue(makePageUrl(location.href,2));
    }

    let fetchedPages = 0;
    let consecutiveNoNew = 0;

    while(pageQueue.length && fetchedPages < MAX_FETCH_PAGES){
      const url = pageQueue.shift();
      queued.delete(url);
      if(visited.has(url)) continue;
      visited.add(url);
      fetchedPages++;

      const before = collected.length;
      const page = await fetchBoardPage(url);
      if(!page){
        consecutiveNoNew++;
        if(consecutiveNoNew >= 2) break;
        continue;
      }

      const posts = extractPosts(page.root,page.url);
      mergePosts(collected,posts);
      discoverPaginationUrls(page.root,page.url).forEach(enqueue);

      if(collected.length === before){
        consecutiveNoNew++;
      }else{
        consecutiveNoNew = 0;
      }

      // Sequential fallback for Imweb boards whose pagination buttons do not contain real hrefs.
      const current = new URL(page.url,location.href);
      const currentPage = Number(current.searchParams.get("page") || "1");
      if(pageQueue.length === 0 && posts.length > 0 && currentPage < MAX_FETCH_PAGES){
        enqueue(makePageUrl(location.href,currentPage + 1));
      }

      if(consecutiveNoNew >= 2) break;
    }

    // Preserve native board ordering; only use numeric NO to stabilize newest-first order when available.
    const numeric = collected.filter(p=>/^\d+$/.test(p.no || ""));
    if(numeric.length === collected.length && collected.length > 1){
      collected.sort((a,b)=>Number(b.no)-Number(a.no));
    }

    return collected;
  }

  function isDetailView(root){
    const url = new URL(window.location.href);
    const bmode = (url.searchParams.get("bmode") || "").toLowerCase();
    const mode = (url.searchParams.get("mode") || "").toLowerCase();

    if(bmode === "view" || mode === "view") return true;

    const strictSelectors = [
      ".board_view_wrap",".board_view_body",".board_view_title",
      ".board-detail",".post_view"
    ];

    for(const sel of strictSelectors){
      try{
        const el = root.querySelector(sel);
        if(el) return true;
      }catch(e){}
    }
    return false;
  }

  function restoreNativeDetail(root){
    root.querySelectorAll(":scope > .oreon-ir-shell").forEach(el=>el.remove());
    [...root.children].forEach(ch=>ch.classList.remove("oreon-ir-native-hidden"));

    document
      .querySelectorAll('.oreon-ir-contact-v4[data-for="'+ID+'"],.oreon-ir-contact-v3[data-for="'+ID+'"]')
      .forEach(el=>el.remove());

    root.dataset.oreonIrV12Building = "0";
  }

  function renderPagination(shell,totalPages,currentPage,onPage){
    const wrap = shell.querySelector(".oreon-ir-pagination");
    wrap.innerHTML = "";
    if(totalPages <= 1) return;

    const makeBtn = (label,page,active,disabled)=>{
      const b = document.createElement("button");
      b.type = "button";
      b.className = "oreon-ir-page" + (active ? " is-active" : "");
      b.textContent = label;
      b.disabled = !!disabled;
      if(!disabled && !active) b.addEventListener("click",()=>onPage(page));
      return b;
    };

    wrap.appendChild(makeBtn("‹",currentPage-1,false,currentPage<=1));

    const start = Math.max(1,currentPage-2);
    const end = Math.min(totalPages,start+4);
    const adjustedStart = Math.max(1,end-4);

    for(let p=adjustedStart;p<=end;p++){
      wrap.appendChild(makeBtn(String(p),p,p===currentPage,false));
    }

    wrap.appendChild(makeBtn("›",currentPage+1,false,currentPage>=totalPages));
  }

  async function build(root){
    if(isDetailView(root)){
      restoreNativeDetail(root);
      return;
    }

    if(root.dataset.oreonIrV12Building === "1") return;
    root.dataset.oreonIrV12Building = "1";

    root.querySelectorAll(":scope > .oreon-ir-shell").forEach(el=>el.remove());
    [...root.children].forEach(ch=>ch.classList.remove("oreon-ir-native-hidden"));

    const nativeWrite = [...root.querySelectorAll("a,button")].find(el=>{
      const t = upper(el.textContent);
      return t === "글쓰기" || t === "WRITE";
    }) || root.querySelector(".btn-write");

    const shell = document.createElement("div");
    shell.className = "oreon-ir-shell";
    shell.innerHTML = `
      <div class="oreon-ir-toolbar">
        <div class="oreon-ir-tabs">
          <button type="button" class="oreon-ir-tab is-active" data-cat="ALL">ALL</button>
          <button type="button" class="oreon-ir-tab" data-cat="NOTICE">NOTICE</button>
          <button type="button" class="oreon-ir-tab" data-cat="IR NEWS">IR NEWS</button>
        </div>
        <label class="oreon-ir-search" aria-label="Search IR posts">
          <input type="search" placeholder="Search">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke-width="1.7"/><path d="M16.5 16.5L21 21" stroke-width="1.7" stroke-linecap="round"/></svg>
        </label>
      </div>
      <div class="oreon-ir-head">
        <div class="oreon-ir-cell">NO</div>
        <div class="oreon-ir-cell">TITLE</div>
        <div class="oreon-ir-cell">CATEGORY</div>
        <div class="oreon-ir-cell oreon-ir-cell--date">DATE</div>
      </div>
      <div class="oreon-ir-body"></div>
      <div class="oreon-ir-empty" hidden>No IR posts found.</div>
      <div class="oreon-ir-pagination"></div>
      <div class="oreon-ir-admin-actions"></div>
    `;

    root.insertBefore(shell,root.firstChild);
    [...root.children].forEach(ch=>{
      if(ch !== shell) ch.classList.add("oreon-ir-native-hidden");
    });

    const body = shell.querySelector(".oreon-ir-body");
    const empty = shell.querySelector(".oreon-ir-empty");
    const input = shell.querySelector(".oreon-ir-search input");

    let activeCat = "ALL";
    let currentPage = 1;
    let posts = [];

    try{
      posts = await collectAllPosts(root);
    }catch(e){
      posts = [];
    }

    body.innerHTML = "";

    posts.forEach((p,index)=>{
      const row = document.createElement("div");
      row.className = "oreon-ir-row";
      row.dataset.category = upper(p.category);
      row.dataset.search = upper(p.title+" "+p.category+" "+p.date);
      row.dataset.index = String(index);

      row.innerHTML = `
        <div class="oreon-ir-cell oreon-ir-cell--no"></div>
        <div class="oreon-ir-cell oreon-ir-cell--title"><a></a></div>
        <div class="oreon-ir-cell oreon-ir-cell--category"></div>
        <div class="oreon-ir-cell oreon-ir-cell--date"></div>
      `;

      row.querySelector(".oreon-ir-cell--no").textContent = p.no || String(posts.length-index);

      const link = row.querySelector(".oreon-ir-cell--title a");
      link.textContent = p.title;
      link.href = p.href || "#";
      if(!p.href && p.nativeLink){
        link.addEventListener("click",function(e){
          e.preventDefault();
          p.nativeLink.click();
        });
      }

      const catCell = row.querySelector(".oreon-ir-cell--category");
      if(p.category){
        const badge = document.createElement("span");
        badge.className = "oreon-ir-badge";
        badge.textContent = p.category;
        catCell.appendChild(badge);
      }else{
        catCell.textContent = "—";
      }

      row.querySelector(".oreon-ir-cell--date").textContent = p.date || "—";
      body.appendChild(row);
    });

    const rows = [...shell.querySelectorAll(".oreon-ir-row")];

    function applyFilter(){
      const q = upper(input.value);
      const matched = rows.filter(row=>{
        const rowCat = upper(row.dataset.category || "");
        const catOk = activeCat === "ALL" || rowCat === activeCat;
        const searchOk = !q || upper(row.dataset.search || "").includes(q);
        return catOk && searchOk;
      });

      const totalPages = Math.max(1,Math.ceil(matched.length/PAGE_SIZE));
      if(currentPage > totalPages) currentPage = totalPages;

      rows.forEach(r=>r.style.display="none");
      const start = (currentPage-1)*PAGE_SIZE;
      matched.slice(start,start+PAGE_SIZE).forEach(r=>r.style.display="grid");

      empty.hidden = matched.length !== 0;
      empty.style.display = matched.length ? "none" : "block";

      renderPagination(shell,matched.length ? totalPages : 0,currentPage,(page)=>{
        currentPage = page;
        applyFilter();
      });
    }

    shell.querySelectorAll(".oreon-ir-tab").forEach(btn=>{
      btn.addEventListener("click",()=>{
        shell.querySelectorAll(".oreon-ir-tab").forEach(b=>b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeCat = btn.dataset.cat;
        currentPage = 1;
        applyFilter();
      });
    });

    input.addEventListener("input",()=>{
      currentPage = 1;
      applyFilter();
    });

    applyFilter();

    // WRITE button intentionally hidden in v13.

    document.querySelectorAll('.oreon-ir-contact-v3[data-for="'+ID+'"]').forEach(el=>el.remove());
    const existingCTA = document.querySelector('.oreon-ir-contact-v4[data-for="'+ID+'"]');

    if(!existingCTA){
      const cta = document.createElement("div");
      cta.className = "oreon-ir-contact-v4";
      cta.dataset.for = ID;
      cta.innerHTML = `
        <div>
          <h3>Have a question for our IR team?</h3>
          <p>Reach out through our Contact page and our team will follow up.</p>
        </div>
        <a href="https://test202608.imweb.me/23">Contact Us <span aria-hidden="true">→</span></a>
      `;
      const anchor = root.closest("section,.section_wrap,.section_first,.doz_row") || root;
      if(anchor.parentNode) anchor.parentNode.insertBefore(cta,anchor.nextSibling);
    }

    root.dataset.oreonIrV12Building = "0";
  }

  function boot(tries){
    const root = document.getElementById(ID);

    if(!root){
      if((tries||0) < 50) setTimeout(()=>boot((tries||0)+1),200);
      return;
    }

    if(isDetailView(root)){
      restoreNativeDetail(root);
    }else{
      build(root);
    }

    let timer = null;
    const obs = new MutationObserver(muts=>{
      const changedNative = muts.some(m=>{
        const t = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        return t &&
          !t.closest(".oreon-ir-shell") &&
          !t.closest(".oreon-ir-contact-v4");
      });

      if(!changedNative) return;

      clearTimeout(timer);
      timer = setTimeout(()=>{
        if(isDetailView(root)){
          restoreNativeDetail(root);
        }else{
          build(root);
        }
      },600);
    });

    obs.observe(root,{childList:true,subtree:true,characterData:true});
  }

  boot(0);
})();