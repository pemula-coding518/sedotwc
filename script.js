// Initialize Lucide icons
    lucide.createIcons();

    // ---- Mobile Navigation Toggle ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileNav() {
      mobileNav.classList.remove('opacity-0', 'invisible');
      mobileNav.classList.add('opacity-100', 'visible');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      mobileNav.classList.remove('opacity-100', 'visible');
      mobileNav.classList.add('opacity-0', 'invisible');
      document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', openMobileNav);
    mobileCloseBtn.addEventListener('click', closeMobileNav);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));


    // ---- Navbar scroll shadow & shrink ----
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Add shadow on scroll
      if (scrollY > 20) {
        navbar.classList.add('shadow-md');
      } else {
        navbar.classList.remove('shadow-md');
      }

      lastScrollY = scrollY;
    });


    // ---- Floating CTA on mobile: show after scrolling past hero ----
    const floatingCTA = document.getElementById('floating-cta');
    const heroSection = document.getElementById('beranda');

    function toggleFloatingCTA() {
      if (!heroSection || !floatingCTA) return;
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        floatingCTA.classList.remove('translate-y-full');
        floatingCTA.classList.add('translate-y-0');
      } else {
        floatingCTA.classList.remove('translate-y-0');
        floatingCTA.classList.add('translate-y-full');
      }
    }
    window.addEventListener('scroll', toggleFloatingCTA, { passive: true });
    toggleFloatingCTA();


    // ---- Intersection Observer for fade-in animations ----
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeInSections.forEach(section => fadeInObserver.observe(section));


    // ---- Active nav link highlight on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function updateActiveNav() {
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('text-corporate-800', 'font-bold');
            link.classList.add('text-gray-600');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.remove('text-gray-600');
              link.classList.add('text-corporate-800', 'font-bold');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();