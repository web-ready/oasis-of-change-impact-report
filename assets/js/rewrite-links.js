/**
 * Rewrite internal links to use .html for local (file:// or localhost).
 * GitHub Pages serves clean URLs; local servers need the .html extension.
 */
(function () {
  function isLocal() {
    return (
      window.location.protocol === 'file:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  }

  function rewriteLink(a) {
    var href = a.getAttribute('href');
    if (!href || href.indexOf('/') !== 0) return;
    var parts = href.split('#');
    var path = parts[0];
    var hash = parts.length > 1 ? '#' + parts.slice(1).join('#') : '';
    if (path === '/' || path === '') {
      path = window.location.protocol === 'file:' ? 'index.html' : '/index.html';
    } else {
      path = path.slice(1);
      if (path.indexOf('.') === -1) path = path + '.html';
      if (window.location.protocol !== 'file:') path = '/' + path;
    }
    a.setAttribute('href', path + hash);
  }

  function rewriteAll() {
    if (!isLocal()) return;
    var links = document.querySelectorAll('a[href^="/"]');
    for (var i = 0; i < links.length; i++) rewriteLink(links[i]);
  }

  function run() {
    if (!isLocal()) return;
    rewriteAll();
    var observer = new MutationObserver(function (mutations) {
      for (var m = 0; m < mutations.length; m++) {
        var added = mutations[m].addedNodes;
        for (var i = 0; i < added.length; i++) {
          var node = added[i];
          if (node.nodeType !== 1) continue;
          if (node.tagName === 'A' && node.getAttribute('href') && node.getAttribute('href').indexOf('/') === 0) {
            rewriteLink(node);
          }
          var inner = node.querySelectorAll && node.querySelectorAll('a[href^="/"]');
          if (inner) for (var j = 0; j < inner.length; j++) rewriteLink(inner[j]);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
