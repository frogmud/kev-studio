// Mobile project navigation - Adds next project navigation to project pages
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mobile project navigation loaded');
  
  // FORCEFULLY hide the hamburger menu button on project pages
  const menuToggle = document.getElementById('menu-toggle-btn');
  if (menuToggle) {
    menuToggle.style.display = 'none !important';
    menuToggle.style.visibility = 'hidden';
    menuToggle.style.opacity = '0';
    menuToggle.style.pointerEvents = 'none';
    
    // Also add a specific class that we can target
    menuToggle.classList.add('hidden-on-mobile');
  }
  
  // Check if we're on a project page
  // Fix the path check to handle both local and server paths
  const isProjectPage = window.location.pathname.includes('/projects/') || 
                        window.location.pathname.endsWith('.html') && 
                        !window.location.pathname.includes('index.html') && 
                        !window.location.pathname.includes('about.html') && 
                        !window.location.pathname.includes('contact.html') &&
                        !window.location.pathname.includes('resume.html');
  
  if (!isProjectPage) {
    console.log('Not a project page, skipping mobile project navigation');
    return;
  }

  console.log('This is a project page, adding mobile navigation');

  // Find the next project link from the standard navigation
  const nextProjectLink = document.querySelector('.project-navigation .nav-link.next');
  
  if (!nextProjectLink) {
    console.warn('Next project link not found');
    return;
  }
  
  // Get the href from the next project link
  const nextProjectHref = nextProjectLink.getAttribute('href');
  
  // Create mobile next project button
  const mobileNextProject = document.createElement('a');
  mobileNextProject.className = 'mobile-next-project';
  mobileNextProject.href = nextProjectHref;
  mobileNextProject.setAttribute('aria-label', 'Next project');
  mobileNextProject.setAttribute('title', 'Next project');
  
  // Add the right arrow SVG
  mobileNextProject.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  `;
  
  // Add to the document
  document.body.appendChild(mobileNextProject);
  
  console.log('Mobile project navigation added', { nextProjectHref });
});