/* =========================================
   SCRIPT.JS — Personal Portfolio
   Author: Your Name
   Description: Navbar, animations, form, 
                mobile menu, scroll-to-top
   ========================================= */


/* ——— 1. STICKY NAVBAR — Add shadow on scroll ——— */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ——— 2. MOBILE HAMBURGER MENU ——— */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ——— 3. ACTIVE NAV LINK on scroll ——— */
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = navLinks.querySelectorAll('a');

function updateActiveLink() {
  const scrollY = window.scrollY + 80; // offset for fixed navbar

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      allNavLinks.forEach(a => a.classList.remove('active'));
      const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // run on page load


/* ——— 4. FADE-IN ANIMATION on scroll (IntersectionObserver) ——— */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // animate only once
    }
  });
}, {
  threshold: 0.12 // trigger when 12% of element is visible
});

fadeElements.forEach(el => fadeObserver.observe(el));


/* ——— 5. SKILL BAR ANIMATION ——— */
// Animates skill progress bars when they scroll into view
const skillFills  = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.getAttribute('data-width');
      entry.target.style.width = targetWidth + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ——— 6. SCROLL-TO-TOP BUTTON ——— */
const scrollTopBtn = document.getElementById('scrollTop');

// Show button when user scrolls down > 400px
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// Scroll to top smoothly on click
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ——— 7. CONTACT FORM SUBMISSION ——— */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent actual page reload

  // Collect field values
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    formStatus.textContent = '⚠️ Please fill in all required fields.';
    formStatus.className   = 'form-status error';
    return;
  }

  // Simulate sending (no backend needed for demo)
  formStatus.textContent = 'Sending...';
  formStatus.className   = 'form-status';

  setTimeout(() => {
    formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formStatus.className   = 'form-status success';
    contactForm.reset();

    // Clear status message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className   = 'form-status';
    }, 5000);
  }, 1200);
});


/* ——— 8. SMOOTH SCROLL for all internal anchor links ——— */
// (HTML already uses scroll-behavior: smooth via CSS,
//  but this ensures compatibility on older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 64; // account for navbar height
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});


/* ——— 9. HERO SECTION — Initial entrance animation ——— */
// Trigger the hero fade-in on page load with a small delay
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 150);
  }
});
