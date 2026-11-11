/* Add AFTER the existing PC footer script. Reuses its DOM, links and native Imweb form. */
(function(){
'use strict';
const id='oreon-footer-mobile-shared-v1';
if(document.getElementById(id))return;
const style=document.createElement('style');style.id=id;style.textContent="@media(max-width:767px){\n#oreon-footer-root .footer{padding:32px 22px 26px}\n#oreon-footer-root .columns{display:grid;grid-template-columns:minmax(0,1fr);gap:0}\n#oreon-footer-root .columns>*{min-width:0}\n#oreon-footer-root .columns>nav,#oreon-footer-root .brand-tagline,#oreon-footer-root .company>h2{display:none}\n#oreon-footer-root .brand{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-bottom:12px}\n#oreon-footer-root .brand .logo{width:130px;height:47px;left:-6px;margin:0;flex-shrink:0}\n#oreon-footer-root .brand .socials{width:auto;gap:0;margin:0}\n#oreon-footer-root .socials button{width:44px;height:44px}\n#oreon-footer-root .socials button img{width:27px!important;height:27px!important}\n#oreon-footer-root .company{padding:22px 0 24px;border-top:1px solid #242424}\n#oreon-footer-root .company-contact{font-size:13px;line-height:1.65;margin:0}\n#oreon-footer-root .company-contact address{margin-bottom:0}\n#oreon-footer-root .company-contact>a{margin:0;padding:0}\n#oreon-footer-root .company>p{font-size:11px;margin:12px 0 0;color:#858d9d}\n#oreon-footer-root .columns>.newsletter{padding:22px 18px;border-radius:16px}\n#oreon-footer-root .columns .newsletter h2{font-size:18px;text-align:left;margin:0 0 18px;letter-spacing:-.025em}\n#oreon-footer-root .newsletter input[type=email],#oreon-footer-root #w202610292108507a495eb input[type=email]{font-size:16px;min-height:48px}\n#oreon-footer-root .newsletter button,#oreon-footer-root #w202610292108507a495eb ._input_form_submit{min-height:48px;margin-top:12px}\n#oreon-footer-root .bottom{display:flex;flex-direction:column;gap:14px;margin-top:26px;padding-top:20px;border-top:1px solid #242424;font-size:10px;line-height:1.6}\n#oreon-footer-root .legal{order:-1;gap:22px;font-size:11px}\n}\n\n#oreon-footer-root .oreon-mobile-address-space,#oreon-footer-root .oreon-mobile-address-break{display:none}\n@media(max-width:767px){#oreon-footer-root address br:not(.oreon-mobile-address-break){display:none}#oreon-footer-root .oreon-mobile-address-space{display:inline}#oreon-footer-root .oreon-mobile-address-break{display:initial}}";
const seen=new WeakSet();
function layout(){
 const root=document.getElementById('oreon-footer-root');if(!root)return;
 if(style.parentNode!==root)root.appendChild(style);
 const address=root.querySelector('.company-contact address');
 if(!address||seen.has(address))return;
 seen.add(address);
 address.querySelectorAll('br').forEach(function(br){
  const space=document.createElement('span');space.className='oreon-mobile-address-space';space.textContent=' ';br.after(space);
 });
 const walker=document.createTreeWalker(address,NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode())){
  const at=node.data.indexOf('Songpa-gu');
  if(at<0)continue;
  const rest=node.splitText(at);
  const br=document.createElement('br');br.className='oreon-mobile-address-break';rest.before(br);break;
 }
}
let queued=false;
const observer=new MutationObserver(function(){
 if(queued)return;queued=true;queueMicrotask(function(){queued=false;layout();});
});
observer.observe(document.documentElement,{childList:true,subtree:true});layout();
})();
