(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('menu-overlay');

    if (!menuToggle || !mobileMenu) return;

    const navClone = document.querySelector('.sticky-nav .filter-categories')?.cloneNode(true);
    const togglesClone = document.querySelector('.view-toggles')?.cloneNode(true);
    const controlsClone = document.querySelector('.project-controls-wrapper')?.cloneNode(true);

    if (navClone) mobileMenu.appendChild(navClone);
    if (togglesClone) mobileMenu.appendChild(togglesClone);
    if (controlsClone) mobileMenu.appendChild(controlsClone);

    menuToggle.addEventListener('click', () => document.body.classList.add('menu-open'));
    if (mobileClose) mobileClose.addEventListener('click', () => document.body.classList.remove('menu-open'));
    if (overlay) overlay.addEventListener('click', () => document.body.classList.remove('menu-open'));
  });
})();
