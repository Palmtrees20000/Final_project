// Hero Video - Ensure video plays and loops
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    // Ensure video plays on load
    heroVideo.play().catch(error => {
      console.log('Video autoplay prevented:', error);
    });
    
    // Ensure looping is working
    heroVideo.addEventListener('ended', () => {
      heroVideo.currentTime = 0;
      heroVideo.play();
    });
  }
});

// Professional Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on non-dropdown nav links only
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only close menu if it's NOT a dropdown parent link
      if (!link.closest('.nav-item').classList.contains('dropdown')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
}

// Dropdown Menu Toggle for Mobile/Tablet
const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

dropdownItems.forEach(item => {
  const link = item.querySelector('.nav-link');
  
  link.addEventListener('click', (e) => {
    // Only toggle dropdown on mobile and tablet (not desktop)
    if (window.innerWidth < 770) {
      e.preventDefault();
      
      // Close other dropdowns
      dropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current dropdown with smooth animation
      item.classList.toggle('active');
    }
  });
});

// Close dropdowns when clicking dropdown links
document.querySelectorAll('.dropdown-link').forEach(link => {
  link.addEventListener('click', () => {
    dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-item.dropdown') && !e.target.closest('.hamburger')) {
    dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
  }
});

// Remove active class from dropdowns on window resize (tablet/desktop transition)
let previousWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  
  // Clear dropdowns when crossing the 770px breakpoint
  if ((previousWidth < 770 && currentWidth >= 770) || 
      (previousWidth >= 770 && currentWidth < 770)) {
    dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
    if (hamburger && navMenu && currentWidth >= 770) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
  
  previousWidth = currentWidth;
});

// Smooth scrolling for anchor links with active state
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Update active state
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      this.closest('.nav-item')?.classList.add('active');
      
      // Close mobile/tablet menu on small and medium screens
      if (window.innerWidth < 960) {
        if (hamburger && navMenu) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
        // Close any open dropdowns
        dropdownItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    }
  });
});

// Scroll spy - Update active nav item based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.closest('.nav-item')?.classList.add('active');
      }
    }
  });
});