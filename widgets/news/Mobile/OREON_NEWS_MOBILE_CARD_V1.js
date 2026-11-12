/* OREON NEWS mobile presentation. Load AFTER the existing V06 board script.
   Native board remains the sole source of posts, links and pagination.
   No duplicate board is created. Desktop presentation is preserved. */
(function(){
'use strict';
if(window.__oreonNewsMobileV1)return;
window.__oreonNewsMobileV1=true;
const id='w202609085cc91e7d0d0b8';
const rootSelector='#'+id;
const sheet=document.createElement('style');
sheet.id='oreon-news-mobile-teoxane-v1';
sheet.textContent=`
${rootSelector} .on-mobile-heading,${rootSelector} .on-mobile-meta,${rootSelector} .on-mobile-excerpt{display:none}
@media(max-width:767px){
#s2026080930f1bc2f3bf2e{background:#000107!important}
${rootSelector}{background:#000107!important;width:100%!important;max-width:none!important}
${rootSelector} .oreon-news-editorial{background:#000107!important;border:0!important;border-radius:0!important;padding:0 16px 32px!important;overflow:visible!important;color:#f0f3f7!important;font-family:Helvetica,Arial,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important}
${rootSelector} .on-head{display:none!important}
${rootSelector} .on-grid{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:24px!important;border:0!important;padding:0!important}
${rootSelector} .on-card{background:#0d1622!important;border:1px solid rgba(143,184,216,.45)!important;border-radius:14px!important;overflow:hidden!important;box-shadow:none!important;min-height:0!important}
${rootSelector} .on-visual{aspect-ratio:16/9!important;background:#101723!important}
${rootSelector} .on-image-backdrop{display:none!important}
${rootSelector} .on-image{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;transform:none!important}
${rootSelector} .on-info,${rootSelector} .on-card.on-no-image .on-info{padding:25px 25px 27px!important;justify-content:flex-start!important}
${rootSelector} .on-eyebrow{display:none!important}
${rootSelector} .on-mobile-meta{display:block!important;font:400 13px/1.5 Helvetica,Arial,sans-serif!important;color:#aeb9c9!important;margin:0 0 23px!important}
${rootSelector} .on-desktop-heading{display:none!important}
${rootSelector} .on-mobile-heading{display:inline!important}
${rootSelector} .on-title,${rootSelector} .on-card.on-no-image .on-title{display:block!important;-webkit-line-clamp:unset!important;overflow:visible!important;min-height:0!important;margin:0!important;font:400 24px/1.48 Helvetica,Arial,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important;letter-spacing:-.045em!important;color:#f0f3f7!important;word-break:keep-all!important;overflow-wrap:anywhere!important}
${rootSelector} .on-mobile-excerpt{display:block!important;margin:22px 0 0!important;font-size:15px!important;line-height:1.7!important;color:#aeb9c9!important}
${rootSelector} .on-meta{border:0!important;margin:29px 0 0!important;padding:0!important;min-height:44px!important;align-items:center!important;justify-content:flex-start!important}
${rootSelector} .on-meta .on-date{display:none!important}
${rootSelector} .on-meta-label{font-size:0!important;color:#f0f3f7!important}
${rootSelector} .on-meta-label::after{content:'Read more  →';font:400 16px/1.5 Helvetica,Arial,sans-serif;white-space:pre}
${rootSelector} .on-pager{display:flex!important;justify-content:center!important;margin:36px 0 0!important}
${rootSelector} .on-pager a{min-width:40px;min-height:40px}
${rootSelector} .on-pager a,${rootSelector} .on-pager span{color:#d7e2ee!important}
}
@media(max-width:360px){
${rootSelector} .on-info{padding:22px 20px!important}
${rootSelector} .on-title{font-size:22px!important}
}`;
document.head.appendChild(sheet);
function enhance(){
const root=document.getElementById(id);if(!root)return;
root.querySelectorAll('.oreon-news-editorial .on-card:not([data-mobile-news-ready])').forEach(card=>{
const title=card.querySelector('.on-title'),info=card.querySelector('.on-info');
if(!title||!info)return;
const original=title.textContent.trim();
const lead=original.match(/^(20\d{2}[-./]\d{1,2}[-./]\d{1,2})\s*/);
const nativeDate=card.querySelector('.on-date');
const date=lead?lead[1]:(nativeDate?nativeDate.textContent.trim():'');
const cat=card.querySelector('.on-badge');
const meta=document.createElement('p');meta.className='on-mobile-meta';
meta.textContent=[cat?cat.textContent.trim():'NEWS',date].filter(Boolean).join(' · ');
info.insertBefore(meta,info.firstChild);
const desktop=document.createElement('span');desktop.className='on-desktop-heading';desktop.textContent=original;
const mobile=document.createElement('span');mobile.className='on-mobile-heading';mobile.textContent=lead?original.slice(lead[0].length):original;
title.replaceChildren(desktop,mobile);
card.dataset.mobileNewsReady='true';
});
}
let scheduled=false;
const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance()})});
function boot(){enhance();observer.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
