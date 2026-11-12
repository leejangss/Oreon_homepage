/* Load after the existing PC contact script. Presentation only. */
(function(){
var style=document.getElementById('oreon-contact-mobile-v1');
if(!style){style=document.createElement('style');style.id='oreon-contact-mobile-v1';document.head.appendChild(style);}
style.textContent=`
@media(max-width:767px){
:root #w2026090726d3d1f97041a{top:0!important;width:100%!important;max-width:100%!important;margin:0!important;padding:0 16px 48px!important}
:root #w2026090726d3d1f97041a .form-widget{zoom:1!important;width:100%!important;max-width:100%!important;margin:0!important;padding:26px 20px!important;border:1px solid rgba(22,132,194,.55)!important;border-radius:14px!important;container-type:normal}
:root #w2026090726d3d1f97041a .form-widget > .oreon-contact-wide-frame{display:none!important}
:root #w2026090726d3d1f97041a .form-widget .form-group{grid-template-columns:minmax(0,1fr)!important;gap:10px!important;margin-bottom:24px!important}
:root #w2026090726d3d1f97041a .form-widget .form-group>:not(input[type=hidden]){grid-column:1!important;grid-row:auto!important;min-width:0;max-width:100%}
:root #w2026090726d3d1f97041a .form-widget .form-group > .control-label,
:root #w2026090726d3d1f97041a .form-widget .form-group:not([id*="privacy"]):not([id*="agree"]) > .control-label{font-size:15px!important;line-height:1.55!important;white-space:normal!important;overflow-wrap:break-word!important;padding:0!important}
:root #w2026090726d3d1f97041a .form-widget .form-group:has(>.checkbox){display:flex!important;flex-wrap:wrap!important;gap:10px 18px!important}
:root #w2026090726d3d1f97041a .form-widget .form-group:has(>.checkbox)>.control-label{flex:0 0 100%}
:root #w2026090726d3d1f97041a .form-widget .checkbox label{font-size:14px!important;min-height:44px;line-height:1.6!important;align-items:center}
:root #w2026090726d3d1f97041a .form-widget :is(input.form-control,textarea.form-control,select.form-control){font-size:16px!important;min-height:48px!important}
:root #w2026090726d3d1f97041a .form-widget textarea.form-control{height:160px!important;min-height:160px!important}
:root #w2026090726d3d1f97041a .form-widget .form-control:not(input):not(textarea):not(select){height:160px!important;overflow-y:auto!important;scrollbar-width:none!important}
:root #w2026090726d3d1f97041a .form-widget .form-control::-webkit-scrollbar{display:none!important}
:root #w2026090726d3d1f97041a .form-widget :is(._input_form_submit,button[type=submit],.form>.btn-primary){width:100%!important;min-height:50px!important}
}
`;
})();
