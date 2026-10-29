/* Replace the existing V01 file. Compatible with the existing iframe ID. */
(function(){
'use strict';
if(window.__oreonTimeParentBridgeV01)return;
window.__oreonTimeParentBridgeV01=true;
var frameId='oreon-time-motion-v09',boardId='w202610103e49cc0075aa3';
var origin='https://leejangss.github.io';
var allowed=['CHALLENGE','CAPABILITY','CREATIVITY','OPENNESS'];
function pageScroll(el,offset){
 if(!el)return;
 var top=window.scrollY+el.getBoundingClientRect().top+(offset||0)-105;
 window.scrollTo({top:Math.max(0,top),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
function boardSelect(cat,attempt){
 var board=document.getElementById(boardId),stage=board&&board.querySelector('.omc');
 if(!stage){if(attempt<35)setTimeout(function(){boardSelect(cat,attempt+1);},200);return;}
 document.dispatchEvent(new CustomEvent('oreon:category-select',{detail:{category:cat,source:'oreon-time-v09-iframe'}}));
 setTimeout(function(){pageScroll(stage,0);},100);
}
window.addEventListener('message',function(e){
 var f=document.getElementById(frameId);
 if(!f||e.origin!==origin||e.source!==f.contentWindow)return;
 var d=e.data;
 if(!d||typeof d!=='object'||d.namespace!=='OREON_TIME_V09')return;
 if(d.type==='height'){
  if(typeof d.height==='number'&&Number.isFinite(d.height)&&d.height>=300&&d.height<=30000)f.style.height=Math.ceil(d.height+2)+'px';
  return;
 }
 var cat=typeof d.category==='string'?d.category.toUpperCase():'';
 if(!allowed.includes(cat))return;
 if(d.type==='values'){
  if(typeof d.offset==='number'&&Number.isFinite(d.offset)&&d.offset>=0&&d.offset<30000)pageScroll(f,d.offset);
 }else if(d.type==='board')boardSelect(cat,0);
});
})();
