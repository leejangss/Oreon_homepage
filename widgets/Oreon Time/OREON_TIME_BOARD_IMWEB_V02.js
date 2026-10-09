/* OREON TIME — Imweb board skin V02. Based on OREON IR V5 visual system. */
(function(){
'use strict';
const ID='w202610103e49cc0075aa3';
const CATS=['CONFERENCE & EXHIBITION','EMPLOYEE STORY','GLOBAL PARTNERS'];
const CSSID='oreon-time-board-v02-css-'+ID;
if(!document.getElementById(CSSID)){
const s=document.createElement('style');s.id=CSSID;s.textContent=`
#${ID}{max-width:1400px!important;margin:0 auto!important;padding:0!important;background:transparent!important}
#${ID}>.oreon-time-native-hidden{display:none!important}
#${ID} .oreon-time-shell{background:#0b111b;border:1px solid rgba(160,180,205,.18);border-radius:22px;padding:48px 52px 40px;box-sizing:border-box;overflow:hidden}
#${ID} .oreon-time-toolbar{display:flex;justify-content:space-between;align-items:center;gap:28px;margin:0 0 34px}
#${ID} .oreon-time-tabs{display:flex;align-items:center;flex-wrap:wrap;gap:12px}
#${ID} .oreon-time-tab{appearance:none;height:46px;padding:0 26px;border:1px solid rgba(189,205,224,.55);border-radius:999px;background:transparent;color:#d5dce7;font:600 14px/1 Arial,sans-serif;letter-spacing:.02em;cursor:pointer;transition:transform .15s,box-shadow .25s,background .25s,border-color .25s}
#${ID} .oreon-time-tab:hover{border-color:#2f6ce0;color:white;transform:translateY(-1px);box-shadow:0 0 0 3px rgba(47,168,232,.1),0 0 16px rgba(47,108,255,.2)}
#${ID} .oreon-time-tab.is-active{background:linear-gradient(135deg,#071126 0%,#102d88 55%,#1949b8 100%);border-color:#1949b8;color:white}
#${ID} .oreon-time-search{position:relative;width:min(340px,32vw);flex:0 0 auto}
#${ID} .oreon-time-search input{width:100%;height:46px;box-sizing:border-box;border:1px solid rgba(185,198,217,.35);border-radius:999px;outline:0;background:rgba(255,255,255,.035);color:#eef4fb;padding:0 48px 0 22px;font:500 14px/1 Arial,sans-serif}
#${ID} .oreon-time-search input::placeholder{color:#aab4c4}
#${ID} .oreon-time-search svg{position:absolute;right:18px;top:50%;width:18px;height:18px;transform:translateY(-50%);stroke:#9fb0c7;pointer-events:none}
#${ID} .oreon-time-head,#${ID} .oreon-time-row{display:grid;grid-template-columns:7% minmax(0,1fr) 23% 15%;align-items:center}
#${ID} .oreon-time-head{min-height:58px;border-top:1px solid rgba(172,190,213,.28);border-bottom:1px solid rgba(172,190,213,.28);color:#f0f4f9;font:700 13px/1.3 Arial,sans-serif;letter-spacing:.02em}
#${ID} .oreon-time-row{min-height:76px;border-bottom:1px solid rgba(160,180,205,.18);color:#aeb9c9;font:500 13px/1.45 Arial,sans-serif;transition:background .22s}
#${ID} .oreon-time-row:hover{background:rgba(100,160,210,.045)}
#${ID} .oreon-time-cell{padding:0 12px;min-width:0}
#${ID} .oreon-time-title a{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#f0f3f7!important;font-weight:600;text-decoration:none!important;transition:color .22s}
#${ID} .oreon-time-row:hover .oreon-time-title a{color:#6fb6ef!important}
#${ID} .oreon-time-date{text-align:right}
#${ID} .oreon-time-badge{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:0 14px;border:1px solid rgba(47,108,224,.55);border-radius:999px;color:#8fb8ff;font:600 11px/1.2 Arial,sans-serif;letter-spacing:.04em;white-space:nowrap}
#${ID} .oreon-time-empty{display:none;padding:42px 12px 18px;text-align:center;color:#8f9caf;font:500 14px/1.5 Arial,sans-serif}
#${ID} .oreon-time-pagination{display:flex;justify-content:center;margin-top:26px}
#${ID} .oreon-time-pagination a,#${ID} .oreon-time-pagination span{color:#aeb9c9!important}
#${ID} .oreon-time-admin-actions{display:none!important;justify-content:flex-end;margin-top:26px}
#${ID} .oreon-time-write{display:none!important;height:44px;padding:0 24px;align-items:center;justify-content:center;border:0;border-radius:999px;background:linear-gradient(135deg,#071126,#102d88 55%,#1949b8);color:white!important;text-decoration:none!important;font:700 13px/1 Arial,sans-serif;cursor:pointer}
html.oreon-time-admin #${ID} .oreon-time-admin-actions{display:flex!important}
html.oreon-time-admin #${ID} .oreon-time-write{display:inline-flex!important}
@media(max-width:1100px){#${ID} .oreon-time-shell{padding:30px 24px}#${ID} .oreon-time-toolbar{flex-direction:column;align-items:stretch;gap:18px}#${ID} .oreon-time-search{width:100%}#${ID} .oreon-time-tab{height:40px;padding:0 16px;font-size:12px}}
@media(max-width:700px){#${ID} .oreon-time-shell{padding:24px 16px;border-radius:18px}#${ID} .oreon-time-tabs{gap:8px}#${ID} .oreon-time-tab{padding:0 12px;font-size:11px}#${ID} .oreon-time-head,#${ID} .oreon-time-row{grid-template-columns:10% minmax(0,1fr) 37%}#${ID} .oreon-time-date{display:none}#${ID} .oreon-time-badge{padding:0 8px;font-size:9px;letter-spacing:0;white-space:normal;text-align:center}#${ID} .oreon-time-head{font-size:11px}#${ID} .oreon-time-row{font-size:12px;min-height:68px}}
`;document.head.appendChild(s);
}
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const up=s=>norm(s).toUpperCase();
const excluded=new Set(['ALL','SEARCH','글쓰기','WRITE','CONFERENCE & EXHIBITION','EMPLOYEE STORY','GLOBAL PARTNERS']);
const isDate=t=>/^20\d{2}[-./]\d{1,2}[-./]\d{1,2}$/.test(norm(t))||/^\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+20\d{2}$/i.test(norm(t))||/^(\d+)\s*(분|시간|일|주|개월|년)전$/.test(norm(t))||norm(t)==='방금';
function visible(el){if(!el||!el.getBoundingClientRect)return false;const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';}
function leaves(scope){return [...scope.querySelectorAll('*')].filter(el=>visible(el)&&norm(el.textContent)&&![...el.children].some(ch=>norm(ch.textContent)===norm(el.textContent)));}
function rowFor(a,root){let n=a;for(let i=0;i<8&&n&&n!==root;i++,n=n.parentElement){if(norm(n.textContent).length>800)continue;const l=leaves(n);if(l.some(el=>isDate(el.textContent))&&l.some(el=>/^\d+$/.test(norm(el.textContent)))&&n.querySelectorAll('a').length<=4)return n;}return null;}
function extract(root){const out=[],seen=new Set();for(const a of root.querySelectorAll('a')){if(!visible(a))continue;const title=norm(a.textContent);if(!title||excluded.has(up(title))||/^(이동|수정|지우기|삭제|공유|인쇄)$/.test(title))continue;const row=rowFor(a,root);if(!row||seen.has(row))continue;seen.add(row);const l=leaves(row);const nums=l.filter(x=>/^\d+$/.test(norm(x.textContent))).sort((x,y)=>x.getBoundingClientRect().left-y.getBoundingClientRect().left);const dates=l.filter(x=>isDate(x.textContent));const category=CATS.find(c=>up(row.textContent).includes(c))||'';const raw=a.getAttribute('href')||'';out.push({no:nums.length?norm(nums[0].textContent):String(out.length+1),title,category,date:dates.length?norm(dates[0].textContent):'',href:raw&&raw!=='#'&&!/^javascript:/i.test(raw)?a.href:'',nativeLink:a});}if(out.length>1&&out.every(x=>/^\d+$/.test(x.no)))out.sort((a,b)=>Number(b.no)-Number(a.no));return out;}
function getPagination(root){for(const sel of ['.pagination','.pagination_wrap','.paging','.board_paging','.paging-block']){const el=root.querySelector(sel);if(el&&visible(el))return el;}return null;}
function detectAdmin(){const u=(location.href||'').toLowerCase(),r=(document.referrer||'').toLowerCase();return !u.includes('preview_mode=1')&&(location.hostname==='admin.imweb.me'||r.includes('admin.imweb.me')||!!document.querySelector('.doz_admin,#admin_header,.admin_header,.design-mode,.design_mode'));}
if(detectAdmin())document.documentElement.classList.add('oreon-time-admin');
function build(root){if(root.dataset.oreonTimeBuilding==='1')return;root.dataset.oreonTimeBuilding='1';try{
root.querySelectorAll(':scope > .oreon-time-shell').forEach(el=>el.remove());[...root.children].forEach(el=>el.classList.remove('oreon-time-native-hidden'));
const posts=extract(root),pagination=getPagination(root);
const write=[...root.querySelectorAll('a,button')].find(el=>visible(el)&&['글쓰기','WRITE'].includes(up(el.textContent)))||root.querySelector('.btn-write');
const shell=document.createElement('div');shell.className='oreon-time-shell';
shell.innerHTML='<div class="oreon-time-toolbar"><div class="oreon-time-tabs"><button type="button" class="oreon-time-tab is-active" data-cat="ALL">ALL</button><button type="button" class="oreon-time-tab" data-cat="CONFERENCE & EXHIBITION">Conference & Exhibition</button><button type="button" class="oreon-time-tab" data-cat="EMPLOYEE STORY">Employee Story</button><button type="button" class="oreon-time-tab" data-cat="GLOBAL PARTNERS">Global Partners</button></div><label class="oreon-time-search" aria-label="Search Oreon Time posts"><input type="search" placeholder="Search"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke-width="1.7"/><path d="M16.5 16.5L21 21" stroke-width="1.7" stroke-linecap="round"/></svg></label></div><div class="oreon-time-head"><div class="oreon-time-cell">NO</div><div class="oreon-time-cell">TITLE</div><div class="oreon-time-cell">CATEGORY</div><div class="oreon-time-cell oreon-time-date">DATE</div></div><div class="oreon-time-body"></div><div class="oreon-time-empty" hidden>No OREON TIME posts found.</div><div class="oreon-time-pagination"></div><div class="oreon-time-admin-actions"></div>';
const body=shell.querySelector('.oreon-time-body');for(const p of posts){const row=document.createElement('div');row.className='oreon-time-row';row.dataset.category=up(p.category);row.dataset.search=up([p.title,p.category,p.date].join(' '));row.innerHTML='<div class="oreon-time-cell oreon-time-no"></div><div class="oreon-time-cell oreon-time-title"><a></a></div><div class="oreon-time-cell oreon-time-category"></div><div class="oreon-time-cell oreon-time-date"></div>';row.querySelector('.oreon-time-no').textContent=p.no;const link=row.querySelector('.oreon-time-title a');link.textContent=p.title;link.href=p.href||'#';if(!p.href)link.addEventListener('click',e=>{e.preventDefault();p.nativeLink.click();});const cell=row.querySelector('.oreon-time-category');if(p.category){const badge=document.createElement('span');badge.className='oreon-time-badge';badge.textContent=p.category;cell.appendChild(badge);}else cell.textContent='—';row.querySelector('.oreon-time-date').textContent=p.date||'—';body.appendChild(row);}
if(pagination)shell.querySelector('.oreon-time-pagination').appendChild(pagination.cloneNode(true));root.insertBefore(shell,root.firstChild);[...root.children].forEach(ch=>{if(ch!==shell)ch.classList.add('oreon-time-native-hidden');});
const rows=[...shell.querySelectorAll('.oreon-time-row')],empty=shell.querySelector('.oreon-time-empty'),input=shell.querySelector('input');let active='ALL';function filter(){const q=up(input.value);let count=0;rows.forEach(row=>{const yes=(active==='ALL'||row.dataset.category===active)&&(!q||row.dataset.search.includes(q));row.style.display=yes?'grid':'none';if(yes)count++;});empty.hidden=count>0;empty.style.display=count?'none':'block';}shell.querySelectorAll('.oreon-time-tab').forEach(btn=>btn.addEventListener('click',()=>{shell.querySelectorAll('.oreon-time-tab').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');active=btn.dataset.cat;filter();}));input.addEventListener('input',filter);filter();
if(write){const btn=document.createElement('button');btn.type='button';btn.className='oreon-time-write';btn.textContent='WRITE →';btn.addEventListener('click',()=>{const href=write.getAttribute('href');if(href&&href!=='#'&&!/^javascript:/i.test(href))location.href=write.href;else write.click();});shell.querySelector('.oreon-time-admin-actions').appendChild(btn);}
}finally{root.dataset.oreonTimeBuilding='0';}}
function boot(tries){const root=document.getElementById(ID);if(!root){if(tries<60)setTimeout(()=>boot(tries+1),200);return;}build(root);let timer;new MutationObserver(ms=>{if(!ms.some(m=>{const el=m.target.nodeType===1?m.target:m.target.parentElement;return el&&!el.closest('.oreon-time-shell');}))return;clearTimeout(timer);timer=setTimeout(()=>build(root),250);}).observe(root,{childList:true,subtree:true,characterData:true});}
boot(0);
})();
