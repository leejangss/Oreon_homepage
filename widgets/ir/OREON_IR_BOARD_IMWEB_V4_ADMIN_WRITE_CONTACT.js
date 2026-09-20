/* OREON IR BOARD - Imweb custom renderer v4
   Target widget: w20260920efdd7cabae0a1
   Rebuilds the visible IR list from Imweb's native board DOM instead of assuming a <table>.
*/
(function () {
  const ID = "w20260920efdd7cabae0a1";
  const STYLE_ID = "oreon-ir-board-v4-style";

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
  font:600 14px/1 Arial,sans-serif;
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
  font:500 14px/1 Arial,sans-serif;
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
  font:700 13px/1.3 Arial,sans-serif;
  letter-spacing:.02em;
}
#${ID} .oreon-ir-row{
  min-height:76px;
  border-bottom:1px solid var(--oir-line);
  color:var(--oir-sub);
  font:500 13px/1.45 Arial,sans-serif;
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
  font:600 11px/1 Arial,sans-serif;
  letter-spacing:.07em;
  white-space:nowrap;
}
#${ID} .oreon-ir-empty{
  padding:42px 12px 18px;
  text-align:center;
  color:#8f9caf;
  font:500 14px/1.5 Arial,sans-serif;
}
#${ID} .oreon-ir-pagination{
  display:flex;
  justify-content:center;
  margin-top:26px;
}
#${ID} .oreon-ir-pagination a,
#${ID} .oreon-ir-pagination span{
  color:#aeb9c9!important;
}

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
  font:700 13px/1 Arial,sans-serif;
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
  font:700 24px/1.3 Arial,sans-serif;
}
.oreon-ir-contact-v4 p{
  margin:0;
  color:var(--oir-sub);
  font:500 15px/1.7 Arial,sans-serif;
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
  font:700 14px/1 Arial,sans-serif;
  transition:transform .15s ease,box-shadow .25s ease,background .25s ease;
}
.oreon-ir-contact-v4 a:hover{
  transform:translateY(-2px);
  background:linear-gradient(135deg,var(--oir-hover1) 0%,var(--oir-hover2) 55%,var(--oir-hover3) 100%);
  box-shadow:0 0 0 3px rgba(47,168,232,.18),0 0 20px 3px rgba(47,108,255,.38);
}

@media(max-width:900px){
  #${ID} .oreon-ir-shell{border-radius:18px;padding:30px 24px}
  #${ID} .oreon-ir-toolbar{flex-direction:column;align-items:stretch;gap:18px}
  #${ID} .oreon-ir-search{width:100%}
  #${ID} .oreon-ir-tab{height:40px;padding:0 18px;font-size:12px}
  #${ID} .oreon-ir-head,
  #${ID} .oreon-ir-row{grid-template-columns:10% minmax(0,1fr) 35%}
  #${ID} .oreon-ir-cell--date{display:none}
  .oreon-ir-contact-v4{margin-top:46px;padding:36px 28px;flex-direction:column;align-items:flex-start}
  .oreon-ir-contact-v4 a{width:100%;box-sizing:border-box}
}
@media(max-width:560px){
  #${ID} .oreon-ir-shell{padding:24px 16px}
  #${ID} .oreon-ir-tabs{gap:8px}
  #${ID} .oreon-ir-tab{padding:0 14px;font-size:11px}
  #${ID} .oreon-ir-head{font-size:11px}
  #${ID} .oreon-ir-row{font-size:12px;min-height:68px}
  #${ID} .oreon-ir-head,
  #${ID} .oreon-ir-row{grid-template-columns:12% minmax(0,1fr) 30%}
  #${ID} .oreon-ir-badge{padding:0 9px;font-size:9px;letter-spacing:.04em}
}
`;
    document.head.appendChild(style);
  }

  const norm = s => (s || "").replace(/\s+/g, " ").trim();
  const upper = s => norm(s).toUpperCase();
  const CATS = ["NOTICE", "FINANCIAL DATA", "IR ARCHIVE"];
  const EXCLUDE = new Set(["글쓰기","WRITE","IR NEWS","SEARCH","ALL","NOTICE","FINANCIAL DATA","IR ARCHIVE"]);

  function isDateText(t){
    const s = norm(t);
    return /^20\d{2}[-./]\d{1,2}[-./]\d{1,2}$/.test(s) ||
           /^\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+20\d{2}$/i.test(s) ||
           /^(\d+)\s*(분|시간|일|주|개월|년)전$/.test(s) ||
           s === "방금";
  }

  function isVisible(el){
    if(!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.display !== "none" && cs.visibility !== "hidden";
  }

  function leafTexts(scope){
    return [...scope.querySelectorAll("*")].filter(el=>{
      if(!isVisible(el)) return false;
      const txt = norm(el.textContent);
      if(!txt) return false;
      return ![...el.children].some(ch=>norm(ch.textContent) === txt);
    });
  }

  function findRowForAnchor(a, root){
    let n = a;
    for(let i=0;i<8 && n && n!==root;i++,n=n.parentElement){
      const txt = norm(n.textContent);
      if(txt.length > 800) continue;
      const leaves = leafTexts(n);
      const hasDate = leaves.some(el=>isDateText(el.textContent));
      const hasNum = leaves.some(el=>/^\d+$/.test(norm(el.textContent)));
      const linkCount = n.querySelectorAll("a").length;
      if(hasDate && hasNum && linkCount <= 4) return n;
    }
    return null;
  }

  function extractPosts(root){
    const anchors = [...root.querySelectorAll("a")].filter(a=>{
      if(!isVisible(a)) return false;
      const txt = norm(a.textContent);
      if(!txt || EXCLUDE.has(upper(txt))) return false;
      return !/^(이동|수정|지우기|삭제|공유|인쇄)$/.test(txt);
    });

    const out = [];
    const seen = new Set();

    for(const a of anchors){
      const row = findRowForAnchor(a, root);
      if(!row || seen.has(row)) continue;

      const leaves = leafTexts(row);
      const nums = leaves
        .filter(el=>/^\d+$/.test(norm(el.textContent)))
        .sort((x,y)=>x.getBoundingClientRect().left-y.getBoundingClientRect().left);
      const dates = leaves.filter(el=>isDateText(el.textContent));

      const rowText = upper(row.textContent);
      const category = CATS.find(c=>rowText.includes(c)) || "";

      const title = norm(a.textContent);
      if(!title || EXCLUDE.has(upper(title))) continue;

      const rawHref = a.getAttribute("href") || "";
      const safeHref = rawHref && rawHref !== "#" && !/^javascript:/i.test(rawHref) ? a.href : "";

      seen.add(row);
      out.push({
        no: nums.length ? norm(nums[0].textContent) : String(out.length + 1),
        title,
        category,
        date: dates.length ? norm(dates[0].textContent) : "",
        href: safeHref,
        nativeLink: a
      });
    }

    if(out.length > 1 && out.every(x=>/^\d+$/.test(x.no))){
      out.sort((a,b)=>Number(b.no)-Number(a.no));
    }
    return out;
  }

  function findNativePagination(root){
    const selectors = [".pagination",".pagination_wrap",".paging",".board_paging",".paging-block"];
    for(const sel of selectors){
      const el = root.querySelector(sel);
      if(el && isVisible(el)) return el;
    }
    return null;
  }

  function build(root){
    if(root.dataset.oreonIrV4Building === "1") return;
    root.dataset.oreonIrV4Building = "1";

    // Remove our prior custom render before scanning native content.
    root.querySelectorAll(":scope > .oreon-ir-shell").forEach(el=>el.remove());
    [...root.children].forEach(ch=>ch.classList.remove("oreon-ir-native-hidden"));

    const posts = extractPosts(root);
    const pagination = findNativePagination(root);
    const nativeWrite = [...root.querySelectorAll("a,button")].find(el=>{
      const t = upper(el.textContent);
      return isVisible(el) && (t === "글쓰기" || t === "WRITE");
    }) || root.querySelector(".btn-write");

    const shell = document.createElement("div");
    shell.className = "oreon-ir-shell";
    shell.innerHTML = `
      <div class="oreon-ir-toolbar">
        <div class="oreon-ir-tabs">
          <button type="button" class="oreon-ir-tab is-active" data-cat="ALL">ALL</button>
          <button type="button" class="oreon-ir-tab" data-cat="NOTICE">NOTICE</button>
          <button type="button" class="oreon-ir-tab" data-cat="FINANCIAL DATA">FINANCIAL DATA</button>
          <button type="button" class="oreon-ir-tab" data-cat="IR ARCHIVE">IR ARCHIVE</button>
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

    const body = shell.querySelector(".oreon-ir-body");
    posts.forEach(p=>{
      const row = document.createElement("div");
      row.className = "oreon-ir-row";
      row.dataset.category = upper(p.category);
      row.dataset.search = upper(p.title + " " + p.category + " " + p.date);
      row.innerHTML = `
        <div class="oreon-ir-cell oreon-ir-cell--no"></div>
        <div class="oreon-ir-cell oreon-ir-cell--title"><a></a></div>
        <div class="oreon-ir-cell oreon-ir-cell--category"></div>
        <div class="oreon-ir-cell oreon-ir-cell--date"></div>
      `;
      row.querySelector(".oreon-ir-cell--no").textContent = p.no;
      const link = row.querySelector(".oreon-ir-cell--title a");
      link.textContent = p.title;
      link.href = p.href || "#";
      if(!p.href && p.nativeLink){
        link.addEventListener("click",function(e){
          e.preventDefault();
          p.nativeLink.click();
        });
      }
      if(p.category){
        const badge = document.createElement("span");
        badge.className = "oreon-ir-badge";
        badge.textContent = p.category;
        row.querySelector(".oreon-ir-cell--category").appendChild(badge);
      } else {
        row.querySelector(".oreon-ir-cell--category").textContent = "—";
      }
      row.querySelector(".oreon-ir-cell--date").textContent = p.date || "—";
      body.appendChild(row);
    });

    if(pagination){
      shell.querySelector(".oreon-ir-pagination").appendChild(pagination.cloneNode(true));
    }

    root.insertBefore(shell, root.firstChild);
    [...root.children].forEach(ch=>{
      if(ch !== shell) ch.classList.add("oreon-ir-native-hidden");
    });

    const rows = [...shell.querySelectorAll(".oreon-ir-row")];
    const empty = shell.querySelector(".oreon-ir-empty");
    const input = shell.querySelector(".oreon-ir-search input");
    let activeCat = "ALL";

    function filter(){
      const q = upper(input.value);
      let count = 0;
      rows.forEach(row=>{
        const catOk = activeCat === "ALL" || row.dataset.category === activeCat;
        const searchOk = !q || row.dataset.search.includes(q);
        const show = catOk && searchOk;
        row.hidden = !show;
        if(show) count++;
      });
      empty.hidden = count !== 0;
    }

    shell.querySelectorAll(".oreon-ir-tab").forEach(btn=>{
      btn.addEventListener("click",()=>{
        shell.querySelectorAll(".oreon-ir-tab").forEach(b=>b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeCat = btn.dataset.cat;
        filter();
      });
    });
    input.addEventListener("input",filter);

    // Owner/admin WRITE button: only appears when Imweb itself rendered a native write control.
    if(nativeWrite){
      const actions = shell.querySelector(".oreon-ir-admin-actions");
      const write = document.createElement("button");
      write.type = "button";
      write.className = "oreon-ir-write";
      write.innerHTML = 'WRITE <span aria-hidden="true">→</span>';
      write.addEventListener("click",function(){
        const href = nativeWrite.getAttribute && nativeWrite.getAttribute("href");
        if(href && href !== "#" && !/^javascript:/i.test(href)){
          window.location.href = nativeWrite.href;
        }else{
          nativeWrite.click();
        }
      });
      actions.appendChild(write);
    }

    // CTA
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
      anchor.parentNode.insertBefore(cta, anchor.nextSibling);
    }

    root.dataset.oreonIrV4Building = "0";
  }

  function boot(tries){
    const root = document.getElementById(ID);
    if(!root){
      if((tries||0) < 50) setTimeout(()=>boot((tries||0)+1),200);
      return;
    }
    build(root);

    let timer = null;
    const obs = new MutationObserver(muts=>{
      const changedNative = muts.some(m=>{
        const t = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        return t && !t.closest(".oreon-ir-shell") && !t.closest(".oreon-ir-contact-v4");
      });
      if(!changedNative) return;
      clearTimeout(timer);
      timer = setTimeout(()=>build(root),250);
    });
    obs.observe(root,{childList:true,subtree:true,characterData:true});
  }

  boot(0);
})();