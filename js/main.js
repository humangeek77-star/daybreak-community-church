/**
 * Daybreak Community Church - Interaction Engine
 * Clean, modern church experience with flawless smooth navigation
 */

// Prevent abrupt native hash jumping on external page arrival
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR & MOBILE MENU
  initNavigation();

  // 2. FLAWLESS SMOOTH GLIDE ENGINE (Organic sinusoidal curve, zero stagnation)
  initSmoothGlide();

  // 3. SCRIPTURE & MISSION SHOWCASE (Tranquil, manual navigation — no auto-swipe timer)
  initScriptureShowcase();

  // 4. SCROLL REVEAL (Subtle fade-in)
  initScrollAnimations();

  // 5. CONTACT FORM HANDLER
  initContactForm();

  // 6. EVENT MODAL / DETAILS
  initEventInteractions();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
let isProgrammaticGliding = false;

function initNavigation() {
  const navbar = document.querySelector('.hero-navbar');
  const toggleBtn = document.querySelector('.menu-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.hero-nav-link');

  // Sticky nav state on scroll (throttled with rAF)
  let isNavTicking = false;
  window.addEventListener('scroll', () => {
    if (!isNavTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          navbar && navbar.classList.add('scrolled');
        } else {
          navbar && navbar.classList.remove('scrolled');
        }
        isNavTicking = false;
      });
      isNavTicking = true;
    }
  }, { passive: true });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (toggleBtn) toggleBtn.innerHTML = '&#9776;';
      });
    });
  }

  // Active section indicator on scroll (throttled & paused during programmatic glide)
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    let isScrollSpyTicking = false;
    window.addEventListener('scroll', () => {
      if (isProgrammaticGliding) return; // Prevent layout thrashing during smooth glide!
      if (!isScrollSpyTicking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.hero-nav-link[href*="${sectionId}"]`);

            if (navLink) {
              if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
              } else {
                navLink.classList.remove('active');
              }
            }
          });
          isScrollSpyTicking = false;
        });
        isScrollSpyTicking = true;
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   2. FLAWLESS SMOOTH GLIDE ENGINE
   Calm, organic sinusoidal easing (easeInOutSine) — zero stagnation, zero rush
   ========================================================================== */
let activeGlideId = null;

function smoothGlideTo(targetY, newHash = null) {
  if (activeGlideId) {
    cancelAnimationFrame(activeGlideId);
    activeGlideId = null;
  }

  const startY = window.pageYOffset;
  const distance = targetY - startY;

  // If already at target within a few pixels, update hash and exit
  if (Math.abs(distance) < 5) {
    if (newHash && window.location.hash !== newHash) {
      history.pushState(null, '', newHash);
    }
    return;
  }

  // Gentle, fluid pacing: 650ms for short scrolls, up to 950ms for full-page voyages
  const duration = Math.min(1000, Math.max(650, Math.round(Math.abs(distance) * 0.28)));
  let startTime = null;
  isProgrammaticGliding = true;

  // Organic sinusoidal easing: Starts moving immediately on frame 1 (no dead zone/stagnation),
  // cruises at a composed speed (never rushes), and cushions gently to a stop.
  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutSine(progress);

    window.scrollTo(0, Math.round(startY + (distance * ease)));

    if (progress < 1) {
      activeGlideId = requestAnimationFrame(step);
    } else {
      activeGlideId = null;
      isProgrammaticGliding = false;
      if (newHash && window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    }
  }

  activeGlideId = requestAnimationFrame(step);
}

function smoothGlideToElement(targetElement, newHash = null) {
  if (!targetElement) return;
  const navbar = document.querySelector('.hero-navbar');
  const navHeight = navbar ? navbar.offsetHeight : 75;
  const targetY = Math.max(0, targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16);
  smoothGlideTo(targetY, newHash);
}

function initSmoothGlide() {
  const isHomePage = window.location.pathname.endsWith('/index.html') || 
                     window.location.pathname.endsWith('/') || 
                     window.location.pathname === '';

  // Intercept all anchor link clicks across all pages
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // 1. On-page hash link (e.g. href="#about", href="#contact", href="#giving-funds")
    if (href.startsWith('#')) {
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        smoothGlideToElement(target, href);
        return;
      }
    }

    // 2. Brand logo click on homepage: glide softly to top
    if (isHomePage && (href === 'index.html' || href === './index.html' || href === '/') && link.classList.contains('brand')) {
      e.preventDefault();
      smoothGlideTo(0, '#');
      return;
    }

    // 3. Link targeting index.html with a hash (e.g. "index.html#about")
    if (href.includes('index.html#') || (href.startsWith('#') && isHomePage)) {
      const hashIndex = href.indexOf('#');
      const hash = href.substring(hashIndex);

      if (isHomePage) {
        // Already on the homepage: glide smoothly right now!
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          smoothGlideToElement(target, hash);
          return;
        }
      } else {
        // On another page (e.g. meet-the-team.html):
        // Save target in sessionStorage and navigate cleanly to index.html without hash
        // to prevent the browser from doing an ugly sudden native snap on arrival!
        e.preventDefault();
        try {
          sessionStorage.setItem('pendingGlideTarget', hash);
        } catch (err) {}
        window.location.href = 'index.html';
        return;
      }
    }
  });

  // Handle incoming navigation with a pending glide target from another page
  let pendingHash = null;
  try {
    pendingHash = sessionStorage.getItem('pendingGlideTarget');
    if (pendingHash) {
      sessionStorage.removeItem('pendingGlideTarget');
    }
  } catch (err) {}

  if (!pendingHash && window.location.hash) {
    pendingHash = window.location.hash;
  }

  if (pendingHash && pendingHash.startsWith('#') && pendingHash !== '#') {
    // Ensure starting at top, then wait a brief moment for layout/images before gliding
    window.scrollTo(0, 0);
    setTimeout(() => {
      const target = document.querySelector(pendingHash);
      if (target) {
        smoothGlideToElement(target, pendingHash);
      }
    }, 180);
  }
}

/* ==========================================================================
   3. SCRIPTURE & MISSION SHOWCASE
   ========================================================================== */
function initScriptureShowcase() {
  const quoteText = document.getElementById('slider-quote-text');
  const quoteRef = document.getElementById('slider-quote-ref');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (!quoteText || !quoteRef) return;

  const slides = [
    {
      text: "“Know God, Grow and find freedom, Discover your purpose and gifts, and Go make a difference for God!”",
      ref: "Daybreak Community Church Mission"
    },
    {
      text: "“I can do all things through Christ who strengthens me.”",
      ref: "Philippians 4:13"
    },
    {
      text: "“Taste and see that the Lord is good; blessed is the one who takes refuge in Him.”",
      ref: "Psalm 34:8"
    },
    {
      text: "“At Daybreak Community Church we are making a difference. We love God! We love people! We love YOU!”",
      ref: "Pastor Andrew Cole & Leadership"
    },
    {
      text: "“Greater love has no one than this: to lay down one's life for one's friends.”",
      ref: "John 15:13"
    }
  ];

  let currentIndex = 0;

  function renderSlide(index) {
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(8px)';
    quoteRef.style.opacity = '0';

    setTimeout(() => {
      quoteText.textContent = slides[index].text;
      quoteRef.textContent = slides[index].ref;
      quoteText.style.opacity = '1';
      quoteText.style.transform = 'translateY(0)';
      quoteRef.style.opacity = '1';
    }, 200);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    renderSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderSlide(currentIndex);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Initial load
  renderSlide(0);
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('daybreak-contact-form');
  const alertBox = document.getElementById('form-feedback-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      if (alertBox) {
        alertBox.textContent = 'Thank you! Pastor Andrew and the Daybreak team have received your message and will connect with you soon.';
        alertBox.className = 'form-alert success';
        alertBox.style.display = 'block';

        setTimeout(() => {
          alertBox.style.display = 'none';
        }, 8000);
      }
    }, 800);
  });
}

/* ==========================================================================
   6. EVENT INTERACTIONS
   ========================================================================== */
function initEventInteractions() {
  const eventRows = document.querySelectorAll('.events-collection-item');
  const modal = document.getElementById('event-modal');
  const modalClose = document.getElementById('modal-close-btn');

  if (!eventRows.length || !modal) return;

  eventRows.forEach(row => {
    row.addEventListener('click', () => {
      const title = row.getAttribute('data-event-title');
      const date = row.getAttribute('data-event-date');
      const time = row.getAttribute('data-event-time');
      const location = row.getAttribute('data-event-location');
      const desc = row.getAttribute('data-event-desc');

      document.getElementById('modal-event-title').textContent = title || '';
      document.getElementById('modal-event-date').textContent = `${date || ''} • ${time || ''}`;
      document.getElementById('modal-event-location').textContent = location || 'Daybreak Community Church - Lapel, IN';
      document.getElementById('modal-event-desc').textContent = desc || '';

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}
