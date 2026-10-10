/* Products detail V1: shared transparent layout for the Products board. Keep listing V3. */
(function(){
'use strict';
var params=new URL(location.href).searchParams;
if(params.get('bmode')!=='view'||!params.get('idx')||!/^\/47\/?$/.test(location.pathname))return;
var style=document.createElement('style');
style.textContent=`
#oreon-product-detail{color:#eaf2fa;font-family:'Outfit','IBM Plex Sans',Arial,sans-serif;padding:56px 0 80px;max-width:1320px;margin:auto}
#oreon-product-detail *{box-sizing:border-box}
#oreon-product-detail .rd-layout{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(32px,5vw,80px);align-items:start}
#oreon-product-detail .rd-media{position:sticky;top:32px;margin:0;padding:clamp(24px,4vw,56px);aspect-ratio:1/1.15;display:flex;align-items:center;justify-content:center;border:1px solid rgba(130,217,255,.75);border-radius:28px;background:radial-gradient(ellipse at 50% 20%,rgba(64,144,214,.13),transparent 65%),#07101d;box-shadow:inset 0 0 38px #69ceff08,0 18px 60px #0003}
#oreon-product-detail .rd-media img{display:block!important;position:static!important;width:100%!important;height:100%!important;max-height:580px;object-fit:contain;margin:0!important}
#oreon-product-detail .rd-category{color:#8fd8fc;letter-spacing:.18em;font-size:12px;margin:0 0 18px;text-transform:uppercase}
#oreon-product-detail h1{font:300 clamp(42px,5vw,68px)/1.08 'Outfit',sans-serif;letter-spacing:-.035em;margin:0 0 22px;color:#f4f8ff}
#oreon-product-detail .rd-inquiry{font-size:14px;color:#8f9fae;margin:0 0 36px;display:flex;flex-wrap:wrap;align-items:center;gap:10px}
#oreon-product-detail .rd-inquiry a{color:#9adcff;text-decoration:none;border-bottom:1px solid #9adcff66;padding:4px 0}
#oreon-product-detail .rd-content{border-top:1px solid #8fd8fc30;padding-top:28px;color:#b9c8d8;font:300 15px/1.85 'IBM Plex Sans',Arial,sans-serif;overflow-wrap:anywhere;scroll-margin-top:40px}
#oreon-product-detail .rd-content h6{font:400 19px/1.5 'Outfit',sans-serif;color:#9edbff;margin:0 0 30px;letter-spacing:.02em}
#oreon-product-detail .rd-content h3{font:400 22px/1.3 'Outfit',sans-serif;letter-spacing:-.015em;color:#f1f6ff;margin:32px 0 16px}
#oreon-product-detail .rd-content p{margin:0 0 16px}
#oreon-product-detail .rd-content ul{padding-left:20px;margin:0 0 26px}
#oreon-product-detail .rd-content li{padding-left:5px;margin:0 0 10px}
#oreon-product-detail .rd-content li::marker{color:#7dcdf5}
#oreon-product-detail .rd-content img{max-width:100%;height:auto}
#oreon-product-detail .rd-content table{max-width:100%;display:block;overflow-x:auto}
#oreon-product-detail .rd-nav{margin-top:48px;padding-top:24px;border-top:1px solid #ffffff12}
#oreon-product-detail .rd-list{display:inline-flex;align-items:center;gap:12px;border:1px solid #8fd8fc66;border-radius:999px;padding:11px 25px;color:#d8f0ff;text-decoration:none;font-size:14px;transition:background .2s}
#oreon-product-detail .rd-list:hover{background:#8fd8fc16}
#oreon-product-detail a:focus-visible{outline:2px solid #8fd8fc;outline-offset:5px}
#w202610106ffb71b28cee8.oreon-product-styled .rd-native-hidden{display:none!important}
@media(max-width:800px){#oreon-product-detail{padding:32px 8px 56px}#oreon-product-detail .rd-layout{grid-template-columns:1fr;gap:36px}#oreon-product-detail .rd-media{position:relative;top:auto;max-width:520px;width:100%;margin:auto;aspect-ratio:1/1}#oreon-product-detail .rd-media img{max-height:420px}#oreon-product-detail h1{font-size:44px}}
@media(prefers-reduced-motion:reduce){#oreon-product-detail *{transition:none!important;scroll-behavior:auto!important}}

/* Reference layout overrides: no panel background or image frame. */
#oreon-product-detail{background:transparent!important;font-family:'Myriad Pro','Segoe UI',Arial,sans-serif;padding:70px 0 90px;max-width:1440px}
#oreon-product-detail .rd-layout{grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(36px,5vw,84px)}
#oreon-product-detail .rd-media{position:relative;top:auto;align-self:center;padding:0;margin:140px 0 0;aspect-ratio:auto;border:0;border-radius:0;background:transparent;box-shadow:none;min-width:0}
#oreon-product-detail .rd-media img{width:100%!important;height:auto!important;max-height:660px;object-fit:contain}
#oreon-product-detail .rd-category{display:none}
#oreon-product-detail .rd-heading-row{display:flex;align-items:baseline;flex-wrap:wrap;gap:14px 26px;margin-bottom:28px}
#oreon-product-detail h1{font:700 clamp(42px,4.1vw,64px)/1.08 'Myriad Pro','Segoe UI',Arial,sans-serif;letter-spacing:-.02em;margin:0;color:#fff}
#oreon-product-detail .rd-inquiry{display:block;margin:0;color:#38bbed;font:400 clamp(17px,1.65vw,25px)/1.4 'Myriad Pro','Segoe UI',Arial,sans-serif}
#oreon-product-detail .rd-inquiry a{color:inherit;border:0;padding:0}
#oreon-product-detail .rd-content{border:0;padding:0;font:400 clamp(16px,1.35vw,20px)/1.55 'Myriad Pro','Segoe UI',Arial,sans-serif;color:#f1f3f7}
#oreon-product-detail .rd-content h6{font:400 clamp(25px,2.3vw,36px)/1.4 'Myriad Pro','Segoe UI',Arial,sans-serif;color:#fff;margin:0 0 46px;letter-spacing:0}
#oreon-product-detail .rd-section{position:relative;border-left:1px solid #38bbed;padding:0 0 52px 28px;margin:0}
#oreon-product-detail .rd-section:last-child{padding-bottom:0}
#oreon-product-detail .rd-section::before{content:'';position:absolute;width:9px;height:9px;background:#38bbed;border-radius:50%;left:-5px;top:10px}
#oreon-product-detail .rd-content h3{font:700 clamp(19px,1.5vw,24px)/1.4 'Myriad Pro','Segoe UI',Arial,sans-serif;color:white;margin:0 0 12px}
#oreon-product-detail .rd-content ul{list-style:none;margin:0;padding:0}
#oreon-product-detail .rd-content li{padding:0;margin:0 0 6px}
#oreon-product-detail .rd-content p{margin:0 0 12px}
@media(max-width:800px){#oreon-product-detail{padding:32px 8px 56px}#oreon-product-detail .rd-layout{grid-template-columns:1fr;gap:32px}#oreon-product-detail .rd-media{margin:0 auto;max-width:440px;width:100%}#oreon-product-detail .rd-media img{max-height:420px}#oreon-product-detail .rd-heading-row{gap:12px;margin-bottom:24px}#oreon-product-detail h1{font-size:44px}#oreon-product-detail .rd-section{padding-left:22px;padding-bottom:34px}#oreon-product-detail .rd-content h6{margin-bottom:30px}}
`;
function init(){
var widget=document.getElementById('w202610106ffb71b28cee8');
if(!widget)return false;
if(document.getElementById('oreon-product-detail'))return true;
var view=widget.querySelector('.board_view'),body=widget.querySelector('.board_txt_area'),nativeTitle=widget.querySelector('.view_tit');
if(!view||!body||!nativeTitle)return false;
var titleCopy=nativeTitle.cloneNode(true);titleCopy.querySelectorAll('a,.category').forEach(function(x){x.remove()});
var name=titleCopy.textContent.trim();
var category=nativeTitle.querySelector('.category');
var content=body.cloneNode(true);content.removeAttribute('class');content.className='rd-content';content.id='oreon-product-specifications';
content.querySelectorAll('[style]').forEach(function(x){x.removeAttribute('style')});
content.querySelectorAll('[id]').forEach(function(x){x.removeAttribute('id')});
var image=content.querySelector('img');
var figure=document.createElement('figure');figure.className='rd-media';
if(image){image.className='';image.alt=name;figure.appendChild(image)}
content.querySelectorAll('p').forEach(function(p){
if(p.textContent.trim()===name&&!p.querySelector('img,a'))p.remove();
});
var inquiryFound=false;
content.querySelectorAll('div,p').forEach(function(x){
if(x.children.length===0&&/^Pricing inquiry\s*\(see details\)$/i.test(x.textContent.trim())){inquiryFound=true;x.remove()}
});
// Recognize common section labels regardless of editor formatting.
var sectionLabel=/^(Key Characteristics|Characteristics|Features|Key Features|Benefits|Indications|Applications|Usage|How to Use|Type|Description|Product Description|Spec|Specs|Specifications|Composition|Storage|주요 특징|특징|제품 설명|설명|적응증|사용 방법|규격|사양|성분|보관 방법)\s*[:：]?$/i;
Array.from(content.querySelectorAll('p,div,h2,h3,h4,h5,h6')).forEach(function(x){
 if(!content.contains(x))return;
 var label=x.textContent.trim();
 // Containers holding multiple paragraphs must not be mistaken for headings.
 if(x.querySelector('p,div,h2,h3,h4,h5,h6,ul,ol,table,img'))return;
 var explicitHeading=/^H[2-5]$/.test(x.tagName);
 if(sectionLabel.test(label)||explicitHeading){var h=document.createElement('h3');h.textContent=label.replace(/[:：]$/, '');x.replaceWith(h)}
});
Array.from(content.querySelectorAll('p,div')).reverse().forEach(function(x){if(!x.textContent.trim()&&!x.querySelector('img,video,iframe,table,a,button,input'))x.remove()});
// Group existing section headings and their content without inventing copy.
Array.from(content.querySelectorAll('h3')).forEach(function(h){
 var group=document.createElement('section');group.className='rd-section';h.before(group);group.appendChild(h);
 while(group.nextSibling){var next=group.nextSibling;if(next.nodeType===1&&next.tagName==='H3')break;group.appendChild(next)}
});
var root=document.createElement('article');root.id='oreon-product-detail';
var layout=document.createElement('div');layout.className='rd-layout';
var right=document.createElement('div');
var label=document.createElement('p');label.className='rd-category';label.textContent=category?category.textContent:'Product';
var heading=document.createElement('h1');heading.textContent=name;
var inquiry=document.createElement('p');inquiry.className='rd-inquiry';
if(inquiryFound){var price=document.createElement('span');price.textContent='Pricing inquiry ';inquiry.appendChild(price)}
var details=document.createElement('a');details.href='#oreon-product-specifications';details.textContent=inquiryFound?'(see details)':'See details';inquiry.appendChild(details);
var headingRow=document.createElement('header');headingRow.className='rd-heading-row';headingRow.append(heading,inquiry);right.append(label,headingRow,content);if(image)layout.appendChild(figure);else layout.style.gridTemplateColumns='minmax(0,1fr)';layout.appendChild(right);root.appendChild(layout);
var nav=document.createElement('nav');nav.className='rd-nav';nav.setAttribute('aria-label','Product navigation');
var list=document.createElement('a');list.className='rd-list';list.href='/47';list.textContent='← List';nav.appendChild(list);root.appendChild(nav);
// Hide native presentation only; the saved post is never modified.
Array.from(view.children).forEach(function(x){x.classList.add('rd-native-hidden')});
view.appendChild(root);widget.classList.add('oreon-product-styled');document.head.appendChild(style);
// Also cover administrator-only write controls if rendered outside board_view.
widget.querySelectorAll('a,button').forEach(function(x){if(!root.contains(x)&&/^(글쓰기|Write)$/i.test(x.textContent.trim()))x.classList.add('rd-native-hidden')});
return true;
}
if(!init()){var observer=new MutationObserver(function(){if(init())observer.disconnect()});observer.observe(document.documentElement,{subtree:true,childList:true});setTimeout(function(){observer.disconnect()},20000)}
})();
