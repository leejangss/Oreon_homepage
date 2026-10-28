/* OREON TIME V19 — Detail-page List button returns to the photo cards. V17 stays unchanged. */
(()=>{
  'use strict';
  if(window.__oreonTimeDetailListV19) return;
  window.__oreonTimeDetailListV19=true;
  const BOARD_ID='w202610103e49cc0075aa3';
  const KEY='oreonTimeReturnToMomentsV19';
  const norm=s=>String(s||'').replace(/\s+/g,'').trim().toLowerCase();
  const board=()=>document.getElementById(BOARD_ID);
  const target=()=>board()?.querySelector('.omc.ot12-stage .omc-track, .omc .omc-track, .omc.ot12-stage, .omc');
  let pending=false, retries=0, retryTimer=0;
  try{pending=sessionStorage.getItem(KEY)==='1';}catch(_){/* storage disabled */}
  function remember(){pending=true;retries=0;try{sessionStorage.setItem(KEY,'1');}catch(_){}}
  function clear(){pending=false;try{sessionStorage.removeItem(KEY);}catch(_){} }
  function tryScroll(){
    if(!pending)return;
    const el=target();
    if(el&&el.getBoundingClientRect().height>10){
      const rect=el.getBoundingClientRect();
      const destination=Math.max(0, window.scrollY+rect.top-110);
      window.scrollTo({top:destination,behavior:'smooth'});
      clear(); return;
    }
    if(++retries<65){clearTimeout(retryTimer);retryTimer=setTimeout(tryScroll,180);} // Imweb async board render
  }
  function update(){
    const root=board(); if(!root)return;
    root.querySelectorAll('a,button,input[type="button"],input[type="submit"]').forEach(el=>{
      const label=norm(el.tagName==='INPUT'?el.value:el.textContent);
      if(['글쓰기','글작성','글쓰기버튼'].includes(label)){
        el.style.setProperty('display','none','important');
      }else if(label==='목록'||label==='list'){
        if(el.tagName==='INPUT')el.value='List';else if(label==='목록')el.textContent='List';
        el.setAttribute('aria-label','List');
        if(el.dataset.ot19Bound!=='yes'){
          el.dataset.ot19Bound='yes';
          el.addEventListener('click',()=>{
            remember();
            // Leave Imweb's native List navigation intact. It may swap the view without page reload.
            setTimeout(tryScroll,250);
          },{capture:true});
        }
      }
    });
    if(pending&&target()){setTimeout(tryScroll,120);}
  }
  let scheduled=false;
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update();});}
  function boot(){
    update();
    new MutationObserver(schedule).observe(board()||document.body,{subtree:true,childList:true,characterData:true});
    if(pending)setTimeout(tryScroll,350);
    window.addEventListener('pageshow',()=>{try{pending=pending||sessionStorage.getItem(KEY)==='1';}catch(_){} if(pending)setTimeout(tryScroll,450);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
