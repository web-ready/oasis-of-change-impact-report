/**
 * Footnote highlight behaviour: clear URL hash after a short time or on scroll/click
 * so the :target highlight does not persist when the user moves on.
 */
(function () {
    if (!document.querySelector('[id^="footnote-"]')) return;

    var clearTimeoutId;
    var FOOTNOTE_HASH_PATTERN = /^#footnote-\d+$/;

    function clearHash() {
        if (FOOTNOTE_HASH_PATTERN.test(window.location.hash)) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }

    function scheduleClear() {
        clearTimeout(clearTimeoutId);
        clearTimeoutId = setTimeout(clearHash, 2500);
    }

    window.addEventListener('hashchange', function () {
        if (FOOTNOTE_HASH_PATTERN.test(window.location.hash)) scheduleClear();
    });

    window.addEventListener('scroll', function () {
        if (window.location.hash) scheduleClear();
    }, { passive: true });

    document.addEventListener('click', function () {
        if (window.location.hash) scheduleClear();
    });

    if (FOOTNOTE_HASH_PATTERN.test(window.location.hash)) scheduleClear();
})();
