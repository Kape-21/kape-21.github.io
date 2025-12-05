// Year in footer across pages
document.getElementById('yr') && (document.getElementById('yr').textContent = new Date().getFullYear());

// Mobile nav toggle
const nav = document.getElementById('nav');
const openBtn = document.getElementById('navToggle');
const closeBtn = document.getElementById('navClose');
openBtn && openBtn.addEventListener('click', () => nav.classList.add('open'));
closeBtn && closeBtn.addEventListener('click', () => nav.classList.remove('open'));
nav && nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Swiper sliders
if (typeof Swiper !== 'undefined') {
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.hero .swiper-pagination', clickable: true },
    navigation: { nextEl: '.hero .swiper-button-next', prevEl: '.hero .swiper-button-prev' },
    effect: 'slide',
  });

  new Swiper('.testi-swiper', {
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: '.testi-swiper .swiper-pagination', clickable: true },
    slidesPerView: 1
  });
}

// Simple contact form handler (footer)
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly.');
    form.reset();
  });
});

// ------------------------------------------------------------------
// 1. EXPANDABLE CARE CARDS (PATIENTCARE SECTION) - FINAL ROBUST FIX
// ------------------------------------------------------------------
function toggleCard(card) {
    const content = card.querySelector('.expandable-content');
    const isCurrentlyActive = card.classList.contains('active');

    // 1. FULL RESET: Loop through ALL cards and close them (remove active class and max-height).
    const allCards = document.querySelectorAll('.expandable-card');
    allCards.forEach(c => {
        c.classList.remove('active');
        c.querySelector('.expandable-content').style.maxHeight = null; 
    });

    // 2. OPEN TARGET: If the card was not active before the reset, open it now.
    if (!isCurrentlyActive) {
        card.classList.add('active');
        // Calculate and set the required max-height (content.scrollHeight + 40px padding)
        content.style.maxHeight = content.scrollHeight + 40 + "px"; 
    }
}

// ------------------------------------------------------------------
// 2. ADVANCED PROCEDURES ACCORDION
// This function is triggered by the event listeners added below.
// ------------------------------------------------------------------
function toggleAdvancedAccordion(header) {
    const targetId = header.getAttribute('data-target');
    const content = document.querySelector(targetId);
    const isExpanded = header.getAttribute('aria-expanded') === 'true'; // Current state

    // CHECK 1: If the header is already expanded (open), close it
    if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        return; // Exit the function after closing the current panel
    }
    
    // 2. Close all other advanced accordions in the whole document
    const allHeaders = document.querySelectorAll('.advanced-accordion-header');
    allHeaders.forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        document.querySelector(h.getAttribute('data-target')).style.maxHeight = null;
    });

    // 3. Open the clicked panel
    header.setAttribute('aria-expanded', 'true');
    // Added 30px buffer for vertical padding inside the content panel
    content.style.maxHeight = content.scrollHeight + 30 + "px"; 
}

// ------------------------------------------------------------------
// EVENT LISTENERS (Run after the page loads)
// ------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 🔑 Attaches the event listener for the Advanced Procedures Accordion
    const advancedHeaders = document.querySelectorAll('.advanced-accordion-header');
    advancedHeaders.forEach(header => {
        header.addEventListener('click', () => {
            toggleAdvancedAccordion(header);
        });
    });
    
    // Update copyright year
    // Note: This assumes you have the line <small>© <span id="yr"></span> Dr. Jay Deep Ghosh...</small>
    const yearElement = document.getElementById('yr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


/* ============================================
   AUTO-FADE BEFORE/AFTER LOGIC
   ============================================ */
document.addEventListener("DOMContentLoaded", function() {
    
    const frames = document.querySelectorAll('.fading-frame');
    
    if(frames.length > 0) {
        frames.forEach(frame => {
            let intervalId;
            const duration = parseInt(frame.getAttribute('data-toggle-duration')) || 3500;
            
            const startToggle = () => {
                if (intervalId) return; 
                intervalId = setInterval(() => {
                    frame.classList.toggle('show-result');
                }, duration);
            };

            const stopToggle = () => {
                clearInterval(intervalId);
                intervalId = null;
            };

            // 1. Mobile Tap/Click Override (Uses JS class 'show-result')
            frame.addEventListener('click', (e) => {
                // Ignore if clicking the button inside the footer
                if (e.target.closest('.clinical-card__footer')) return;
                
                frame.classList.toggle('show-result');
                stopToggle();
                // Restart automation after a short delay (5s)
                setTimeout(startToggle, 5000); 
            });

            // 2. Desktop Hover (Automation Pause/Start)
            // Visual switch is handled by CSS :hover; JS only manages the timer here.
            frame.addEventListener('mouseenter', stopToggle);
            frame.addEventListener('mouseleave', startToggle);
            
            // Initial start of the automation
            startToggle();
        });
    }
    
    // NOTE: Ensure all previous Swiper/Slider JS code has been removed.
});

