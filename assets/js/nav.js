/* Nav: mobile menu + Impact/Explore submenus */
(function () {
  if (typeof console !== 'undefined' && console.log) {
    console.log('\n\n%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  Hey, curious coder!\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n  Peeked under the hood? Nice.\n  TreeData · TreeNationAPI · Leaflet\n  Filter console by "[Oasis of Change]" for module logs.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'font-size: 14px; font-weight: 600; color: #004734; line-height: 1.6;');
  }

  var toggleBtn = document.getElementById('mobile-menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var closeBtn = document.getElementById('mobile-menu-close');
  var backdrop = document.getElementById('mobile-menu-backdrop');

  if (toggleBtn && mobileMenu) {
    var open = function () {
      mobileMenu.classList.add('menu-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    };
    var close = function () {
      mobileMenu.classList.remove('menu-open');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    };
    toggleBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    // Close menu when nav link clicked (anchor links like #map)
    mobileMenu.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (link) close();
    });
  }

  function setupSubmenu(toggleId, submenuId) {
    var t = document.getElementById(toggleId);
    var s = document.getElementById(submenuId);
    if (!t || !s) return;
    t.addEventListener('click', function () {
      var open = s.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
  }
  setupSubmenu('mobile-impact-toggle', 'mobile-impact-submenu');
  setupSubmenu('mobile-explore-toggle', 'mobile-explore-submenu');
  if (typeof console !== 'undefined' && console.log) console.log('[Oasis of Change Nav] Ready');
})();
