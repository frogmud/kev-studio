document.addEventListener('DOMContentLoaded', function() {
  // Logo animation interaction
  const logoContainer = document.querySelector('.logo-container');
  const outerLogo = document.querySelector('.outer-logo');
  
  if (logoContainer && outerLogo) {
    logoContainer.addEventListener('mouseenter', function() {
      outerLogo.style.animationDuration = '8s';
    });
    
    logoContainer.addEventListener('mouseleave', function() {
      outerLogo.style.animationDuration = '20s';
    });
  }
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    // Initialize map styles for dark theme on page load
    setTimeout(updateMapStyles, 500); // Slight delay to ensure maps are loaded
  }
  
  // Theme toggle event listener
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Update map iframe styles for dark mode
    updateMapStyles();
  });
  
  // Function to update map styles based on theme
  function updateMapStyles() {
    const isDarkMode = document.body.classList.contains('dark-theme');
    const mapIframes = document.querySelectorAll('.map-container iframe');
    
    mapIframes.forEach(iframe => {
      let src = iframe.src;
      
      // Remove any existing style parameter
      src = src.replace(/&style=.*?(&|$)/, '$1');
      
      // Add dark mode style if in dark mode
      if (isDarkMode) {
        if (src.includes('?')) {
          iframe.src = src + '&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c';
        } else {
          iframe.src = src + '?style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c';
        }
      }
    });
  }
  
  // Mobile navigation toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbar = document.querySelector('.navbar');
  
  navbarToggle.addEventListener('click', function() {
    navbar.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const navbarItems = document.querySelectorAll('.navbar-item');
  navbarItems.forEach(item => {
    item.addEventListener('click', function() {
      navbar.classList.remove('active');
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to navigation items on scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset + 120; // Add offset for navbar
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`.navbar-item[href="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.navbar-item[href="#${sectionId}"]`)?.classList.remove('active');
      }
    });
  });
  
  // RSVP form submission
  const rsvpForms = document.querySelectorAll('#rsvp-form, #rsvp-page-form');
  
  if (rsvpForms.length > 0) {
    rsvpForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
          formDataObj[key] = value;
        });
        
        // Display form submission loader
        form.innerHTML = `
          <div class="form-submitting">
            <div class="loader"></div>
            <p>Submitting your RSVP...</p>
          </div>
        `;
  
        // There are multiple ways to handle form submissions:
        
        // OPTION 1: Email Service Integration
        // You can use a service like EmailJS, FormSubmit, or Formspree
        // This example uses Formspree which is free and doesn't require backend code
        
        const formSubmitEndpoint = 'https://formspree.io/f/your-form-id'; // Replace with your Formspree form ID
        
        fetch(formSubmitEndpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          // Show success message
          showSuccessMessage(form);
        })
        .catch(error => {
          console.error('Error:', error);
          // Show error message with fallback option
          form.innerHTML = `
            <div class="error-message">
              <div class="error-icon">!</div>
              <h3>Something went wrong</h3>
              <p>There was a problem submitting your RSVP. Please try again or contact us directly at:</p>
              <p><a href="mailto:hello@leekev.com">hello@leekev.com</a></p>
              <button type="button" class="btn btn-secondary" onclick="window.location.reload()">Try Again</button>
            </div>
          `;
        });
        
        /* 
        // OPTION 2: Google Forms Integration
        // Another approach is to submit to a Google Form
        // Replace with your Google Form URL
        const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR-FORM-ID/formResponse';
        
        // Map your form field names to Google Form field names
        // e.g., if your Google Form has a field named "entry.12345" for the name field
        const googleFormData = new FormData();
        googleFormData.append('entry.12345', formDataObj.name);
        googleFormData.append('entry.67890', formDataObj.email);
        // Add more fields as needed
        
        // Send data to Google Form
        fetch(googleFormUrl, {
          method: 'POST',
          body: googleFormData,
          mode: 'no-cors' // Google Forms requires this
        })
        .then(() => {
          // Note: with no-cors, we can't actually check the response
          showSuccessMessage(form);
        })
        .catch(error => {
          console.error('Error:', error);
          // Show error message (same as above)
        });
        */
        
        // For demo purposes, let's just show the success message directly
        // In production, you would uncomment one of the above options
        // and comment this out
        setTimeout(() => {
          showSuccessMessage(form);
          
          // You can also send an email directly to the couple
          console.log('RSVP would be sent to: hello@leekev.com');
          console.log('RSVP Submission:', formDataObj);
        }, 1500);
      });
    });
    
    // Function to show success message
    function showSuccessMessage(form) {
      form.innerHTML = `
        <div class="success-message">
          <div class="success-icon">✓</div>
          <h3>Thank You!</h3>
          <p>Your RSVP has been submitted successfully.</p>
          <p>We've sent a confirmation to your email.</p>
          <p class="success-note">We look forward to celebrating with you!</p>
          <button type="button" class="btn btn-secondary" onclick="window.location.reload()">Submit Another Response</button>
        </div>
      `;
      
      // Scroll to the success message
      const successMessage = form.querySelector('.success-message');
      successMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Add hover effect to cards and images
  const hoverElements = document.querySelectorAll('.accommodation-card, .qa-item, .gallery-item');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Gallery filters functionality
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  
  if (galleryFilters.length > 0) {
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Update active class
        galleryFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Get all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item, .photo-placeholder-item');
        
        // Filter items
        galleryItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
          } else {
            if (item.classList.contains(filterValue)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Lightbox for gallery images
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const lightbox = document.createElement('div');
      lightbox.classList.add('lightbox');
      
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img src="${imgSrc}" alt="Gallery image">
        </div>
      `;
      
      document.body.appendChild(lightbox);
      
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
      
      // Close lightbox when clicking outside the image
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }
      });
      
      // Close lightbox with escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (document.querySelector('.lightbox')) {
            document.body.removeChild(document.querySelector('.lightbox'));
            document.body.style.overflow = '';
          }
        }
      });
    });
  });
});