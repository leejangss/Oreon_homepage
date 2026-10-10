/* OREON Contact: translate display text only.
 * The full privacy policy is intentionally unchanged until its source is supplied.
 * Does not change form values, submission, validation, or styling.
 */
(function () {
  'use strict';
  var instanceKey = '__oreonContactEnglish_w2026090726d3d1f97041a';
  if (window[instanceKey]) return;
  window[instanceKey] = true;

  var translations = new Map([
    ['개인정보 수집 및 이용 동의', 'Consent to the Collection and Use of Personal Information'],
    ['개인정보 수집 및 이용에 동의합니다.', 'I agree to the collection and use of my personal information.'],
    ['개인정보 수집 및 이용에 동의합니다', 'I agree to the collection and use of my personal information.'],
    ['파일 업로드', 'Upload File'],
    ['파일 올리기', 'Upload File']
  ]);

  function init() {
    var section = document.getElementById('w2026090726d3d1f97041a');
    if (!section) return false;
    function translate() {
      var forms = Array.from(section.querySelectorAll('.form-widget'));
      if (section.matches('.form-widget')) forms.unshift(section);
      forms.forEach(function (form) {
        var walker = document.createTreeWalker(form, NodeFilter.SHOW_TEXT, {
          acceptNode: function (node) {
            var parent = node.parentElement;
            if (!parent || parent.closest('script, style, textarea, select, [contenteditable], .form-control:not(input):not(textarea):not(select)')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        var node;
        while ((node = walker.nextNode())) {
          var original = node.nodeValue;
          var key = original.replace(/\s+/g, ' ').trim();
          var english = translations.get(key);
          if (english) {
            node.nodeValue = original.match(/^\s*/)[0] + english + original.match(/\s*$/)[0];
          }
        }
      });
    }
    var pending = false;
    translate();
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        translate();
      });
    }).observe(section, { childList: true, subtree: true, characterData: true });
    return true;
  }

  function start() {
    if (init()) return;
    var observer = new MutationObserver(function () {
      if (init()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
