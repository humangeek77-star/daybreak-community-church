/**
 * Daybreak Community Church - Interaction Engine
 * Clean, modern church experience with zero preloader swipe delays
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY NAVBAR & MOBILE MENU
  initNavigation();

  // 2. LUXURIOUS SMOOTH GLIDE FOR PAGE SECTIONS (Calm, relaxed ease-in-out pacing)
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
function initNavigation() {
  const navbar = document.querySelector('.hero-navbar');
  const toggleBtn = document.querySelector('.menu-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.hero-nav-link');

  // Sticky nav state on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

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

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
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
  });
}

/* ==========================================================================
   2. SILKY SMOOTH GLIDE ENGINE
   Calm, luxurious ease-in-out scroll for section navigation — never rushed
   ========================================================================== */
let activeGlideId = null;

function smoothGlideTo(targetElement, newHash = null) {
  if (!targetElement) return;

  // Cancel any running animation
  if (activeGlideId) {
    cancelAnimationFrame(activeGlideId);
    activeGlideId = null;
  }

  const navbar = document.querySelector('.hero-navbar');
  const navHeight = navbar ? navbar.offsetHeight : 75;
  const startY = window.pageYOffset;
  const targetY = Math.max(0, targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16);
  const distance = targetY - startY;

  // Already at target
  if (Math.abs(distance) < 4) {
    if (newHash && window.location.hash !== newHash) {
      history.pushState(null, '', newHash);
    }
    return;
  }

  // Calm pacing: 750ms for close sections, up to 1250ms for long trips down the page
  const duration = Math.min(1300, Math.max(750, Math.abs(distance) * 0.42));
  let startTime = null;

  // Silky cubic ease-in-out curve
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function cancelGlide() {
    if (activeGlideId) {
      cancelAnimationFrame(activeGlideId);
      activeGlideId = null;
    }
    removeCancelListeners();
  }

  function addCancelListeners() {
    window.addEventListener('wheel', cancelGlide, { passive: true, once: true });
    window.addEventListener('touchstart', cancelGlide, { passive: true, once: true });
    window.addEventListener('keydown', cancelGlide, { passive: true, once: true });
  }

  function removeCancelListeners() {
    window.removeEventListener('wheel', cancelGlide);
    window.removeEventListener('touchstart', cancelGlide);
    window.removeEventListener('keydown', cancelGlide);
  }

  addCancelListeners();

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + (distance * ease));

    if (progress < 1) {
      activeGlideId = requestAnimationFrame(step);
    } else {
      activeGlideId = null;
      removeCancelListeners();
      if (newHash && window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    }
  }

  activeGlideId = requestAnimationFrame(step);
}

function initSmoothGlide() {
  // Listen for clicks on links with hash targets
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;

    // Check if the link points to an anchor on this current page
    const url = new URL(link.href, window.location.href);
    const isSamePath = (url.pathname === window.location.pathname) ||
      (window.location.pathname.endsWith('/') && url.pathname.endsWith('/index.html')) ||
      (url.pathname.endsWith('/') && window.location.pathname.endsWith('/index.html'));

    if (isSamePath && url.hash) {
      const targetElement = document.querySelector(url.hash);
      if (targetElement) {
        e.preventDefault();
        smoothGlideTo(targetElement, url.hash);
      }
    }
  });

  // Handle direct navigation with a hash in URL (e.g., coming from another page)
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      // Pause slightly for DOM and image layouts to settle, then glide smoothly
      setTimeout(() => {
        smoothGlideTo(targetElement, window.location.hash);
      }, 300);
    }
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
