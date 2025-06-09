// Mobile menu handler for toggling sidebar visibility on small screens
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mobile menu JS loaded');
  
  // Get all required elements
  const menuToggle = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('menu-overlay');
  
  // Find all mobile menu links (for auto-closing)
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a, .filter-category') : [];
  
  if (!menuToggle || !mobileMenu) {
    console.warn('Mobile menu elements not found:', {
      menuToggle: !!menuToggle,
      mobileMenu: !!mobileMenu,
      mobileClose: !!mobileClose,
      overlay: !!overlay
    });
    return;
  }
  
  // Function to close the menu
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
  };
  
  // Set up event listeners only - no DOM manipulation in this file
  menuToggle.addEventListener('click', () => {
    console.log('Menu toggle clicked');
    document.body.classList.add('menu-open');
  });
  
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
  
  // Close menu when clicking on links
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Small delay to allow the click action to complete
      setTimeout(closeMenu, 150);
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });
  
  // Sync the theme toggle between main and mobile navigation
  const mainThemeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  if (mainThemeToggle && mobileThemeToggle) {
    // Function to synchronize toggle state visually
    const syncToggleState = () => {
      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
      
      if (isDarkTheme) {
        mainThemeToggle.classList.add('dark');
        mobileThemeToggle.classList.add('dark');
      } else {
        mainThemeToggle.classList.remove('dark');
        mobileThemeToggle.classList.remove('dark');
      }
    };
    
    // Unified toggle function to ensure both toggles stay in sync
    const toggleTheme = () => {
      let theme;
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        document.body.removeAttribute('data-theme');
        theme = 'light';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
      syncToggleState();
    };
    
    // Apply event listeners to both toggles
    mainThemeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    // Initialize toggle state on page load
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    }
    syncToggleState();
  }
  
  // Initialize menu state
  console.log('Mobile menu initialized');
});