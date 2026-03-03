// ============================================
// モモル LP v3 - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // --- Scroll animations (Intersection Observer) ---
  const animateElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger animation for siblings
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll('[data-animate]')) : [];
        let delay = 0;

        const idx = siblings.indexOf(entry.target);
        if (idx > -1) {
          delay = idx * 100;
        }

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // --- FAQ accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      item.classList.toggle('open');
      question.setAttribute('aria-expanded', !isOpen);
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Parallax-like effect on hero shapes ---
  const shapes = document.querySelectorAll('.shape');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.03;
        shape.style.transform = `translate(${scrollY * speed}px, ${scrollY * speed * 0.5}px)`;
      });
    }
  });
});
