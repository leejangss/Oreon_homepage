/* OREON TIME — detail-page actions, additive patch. Keep V17 board JS unchanged. */
(()=>{
  'use strict';
  if(window.__oreonTimeDetailButtonsV18) return;
  window.__oreonTimeDetailButtonsV18=true;
  const ID='w202610103e49cc0075aa3';
  const norm=s=>String(s||'').replace(/\s+/g,'').trim();
  const actionSelector='a,button,input[type="button"],input[type="submit"]';
  function update(){
    const board=document.getElementById(ID);
    if(!board) return;
    // Do not modify navigation, page builder controls, or any unrelated buttons.
    board.querySelectorAll(actionSelector).forEach(el=>{
      const label=norm(el.tagName==='INPUT'?el.value:el.textContent);
      if(label==='글쓰기'||label==='글작성'||label==='글쓰기버튼'){
        if(el.dataset.ot18Hidden!=='yes'){
          el.dataset.ot18Hidden='yes';
          el.style.setProperty('display','none','important');
        }
      }else if(label==='목록'){
        if(el.tagName==='INPUT')el.value='List';
        else el.textContent='List';
        el.setAttribute('aria-label','List');
      }
    });
  }
  let queued=false;
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update();});};
  const boot=()=>{
    update();
    const root=document.getElementById(ID)||document.body;
    new MutationObserver(schedule).observe(root,{subtree:true,childList:true,characterData:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
