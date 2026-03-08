/**
 * Oasis of Change — Shared navigation
 * Mobile menu (hamburger) + Impact/Explore submenus
 */
(function () {
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

    // Close menu when any nav link is clicked (removes friction for anchor links like Map)
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
})();
