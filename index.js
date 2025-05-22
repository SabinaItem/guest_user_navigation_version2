document.addEventListener('DOMContentLoaded', () => {
  const navToggle    = document.querySelector('.nav-toggle');
  const navLinks     = document.querySelector('.nav-links');
  const loginButton  = document.querySelector('.nav-right');
  let   isOpen       = false;

  // Cache all dropdown containers and toggles
  const dropdownItems   = Array.from(document.querySelectorAll('.has-dropdown'));
  const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');

  // Helper to get only the currently open dropdowns
  const getOpenDropdowns = () =>
    dropdownItems.filter(drop => drop.classList.contains('open'));


  navToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    loginButton.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      isOpen = false;
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      loginButton.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle screen resize. If the screen is resized, prevent open menu staying open
  // window.addEventListener('resize', () => {
  //   // Close mobile nav menu if open
  //   if (isOpen) {
  //     isOpen = false;
  //     navToggle.classList.remove('active');
  //     navLinks.classList.remove('active');
  //     loginButton.classList.remove('active');
  //     navToggle.setAttribute('aria-expanded', 'false');
  //   }
  //   // Close all open dropdowns
  //   getOpenDropdowns().forEach(drop => drop.classList.remove('open'));
 
  // });

  // Dropdown click logic
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.has-dropdown');
      // Close all other open dropdowns
      getOpenDropdowns().forEach(drop => {
        if (drop !== parent) drop.classList.remove('open');
      });
      // Toggle current dropdown
      parent.classList.toggle('open');
    });
  });

  // Close all open dropdowns on hover on larger screens
  function setupDropdownHoverListeners() {
    dropdownItems.forEach(dropdown => {
      dropdown.onmouseenter = null;
      if (window.innerWidth > 1020) {
        dropdown.onmouseenter = () => {
          getOpenDropdowns().forEach(drop => {
            if (drop !== dropdown) drop.classList.remove('open');
          });
        };
      }
    });
  }
  // Initial setup for hover listeners
  setupDropdownHoverListeners();
  // Re-setup on resize to prevent open dropdowns staying open
  window.addEventListener('resize', setupDropdownHoverListeners);

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    getOpenDropdowns().forEach(drop => {
      if (!drop.contains(e.target)) drop.classList.remove('open');
    });
    
  });
});


