// Immediately hide menu toggle on project pages
(function() {
  // Execute before DOMContentLoaded for immediate effect
  if (window.location.pathname.includes('/projects/')) {
    // Create a style element
    const style = document.createElement('style');
    style.textContent = `
      .menu-toggle, 
      #menu-toggle-btn, 
      button[id="menu-toggle-btn"],
      .sticky-nav-logo .menu-toggle {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    
    // Add it to the head
    document.head.appendChild(style);
    
    // Find and hide directly as soon as script loads
    window.addEventListener('DOMContentLoaded', () => {
      const menuToggle = document.getElementById('menu-toggle-btn');
      if (menuToggle) {
        menuToggle.style.display = 'none';
        menuToggle.style.visibility = 'hidden';
        menuToggle.style.opacity = '0';
        menuToggle.style.pointerEvents = 'none';
      }
    });
  }
})();