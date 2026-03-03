gsap.registerPlugin(ScrollTrigger);

// --- Magnetic Buttons Logic ---
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(this, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// --- Dynamic Copyright Year ---
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

// --- Services Accordion Logic ---
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        const content = card.querySelector('.accordion-content');
        const isActive = card.classList.contains('active');

        // Close all currently open cards
        document.querySelectorAll('.service-card').forEach(c => {
            c.classList.remove('active');
            c.querySelector('.accordion-content').style.maxHeight = null;
        });

        // If the clicked card wasn't active, open it
        if (!isActive) {
            card.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            
            // Refresh ScrollTrigger to recalculate page height after accordion opens
            setTimeout(() => ScrollTrigger.refresh(), 400);
        }
    });
});

// Open the first accordion by default on page load
window.addEventListener('DOMContentLoaded', () => {
    const firstServiceCard = document.querySelector('.service-card');
    if (firstServiceCard) {
        firstServiceCard.classList.add('active');
        const firstContent = firstServiceCard.querySelector('.accordion-content');
        firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }
});

// --- Mobile Timeline Toggle ---
const toggleHistoryBtn = document.getElementById('toggle-history');
if(toggleHistoryBtn) {
    toggleHistoryBtn.addEventListener('click', function() {
        const hiddenItems = document.querySelectorAll('.collapsible-mobile');
        const isExpanded = hiddenItems[0].classList.contains('expanded');
        
        hiddenItems.forEach(item => {
            if(isExpanded) {
                item.classList.remove('expanded');
            } else {
                item.classList.add('expanded');
            }
        });

        const btnText = this.querySelector('.btn-text');
        if(isExpanded) {
            btnText.innerText = "View Full History";
        } else {
            btnText.innerText = "Show Less";
        }
        setTimeout(() => ScrollTrigger.refresh(), 100);
    });
}

// --- Multi-Colored Cyberpunk Scramble ---
function decodeText(element, isFast = false) {
    const targetText = element.getAttribute('data-target');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01@#$%&*";
    const colors = ["#ff00ff", "#00f0ff", "#ff003c", "#fcee0a", "#00ff66"];
    let iterations = 0;
    
    const intervalTime = isFast ? 35 : 50;
    const iterationStep = isFast ? 1/3 : 1/4; 
    
    const originalHTML = element.innerHTML;
    
    const interval = setInterval(() => {
        element.innerHTML = targetText.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return letter; 
                }
                if(letter === " ") return " ";
                
                const randomChar = letters[Math.floor(Math.random() * letters.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                return `<span style="color: ${randomColor}; text-shadow: 0 0 8px ${randomColor};">${randomChar}</span>`;
            })
            .join("");
        
        if(iterations >= targetText.length) {
            clearInterval(interval);
            element.innerHTML = originalHTML; 
        }
        iterations += iterationStep; 
    }, intervalTime); 
}

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 30) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- Hamburger Menu Logic ---
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links .nav-item, .nav-links .nav-btn').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));

// --- Main Animations Timeline ---
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

document.querySelectorAll('.decode-text').forEach(el => decodeText(el, false));

tl.fromTo(".hero-title-wrapper",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    )
    .fromTo(".reveal-fade",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4"
    );

gsap.utils.toArray('.scroll-decode').forEach(elem => {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%", 
        onEnter: () => {
            if(!elem.classList.contains('decoded')) {
                elem.classList.add('decoded');
                decodeText(elem, true); 
            }
        }
    });
});

gsap.utils.toArray('.reveal-up').forEach((elem) => {
    let hasCounter = elem.querySelector('.counter') !== null;

    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
        onEnter: () => {
            elem.classList.add('is-visible'); 
            
            gsap.to(elem, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });

            if (hasCounter) {
                const counters = elem.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    gsap.fromTo(counter,
                        { innerHTML: 0 },
                        {
                            innerHTML: target,
                            duration: 2.5,
                            snap: { innerHTML: 1 },
                            ease: "power2.out"
                        }
                    );
                });
            }
        },
        once: true
    });
});

gsap.utils.toArray('.timeline').forEach(timeline => {
    const progressLine = timeline.querySelector('.timeline-progress');
    const dots = timeline.querySelectorAll('.timeline-dot');

    if (progressLine) {
        gsap.to(progressLine, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: timeline,
                start: "top center",
                end: "bottom center",
                scrub: 0.5,
                onUpdate: () => {
                    dots.forEach(dot => {
                        const dotPos = dot.getBoundingClientRect().top;
                        const triggerPoint = window.innerHeight / 2;
                        if (dotPos < triggerPoint + 20) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            }
        });
    }
});


// --- Toast Notification Logic ---
const toastContainer = document.getElementById('toast-container');

function showToast(type, text) {
    toastContainer.innerHTML = ''; 
    const toast = document.createElement('div');
    toast.className = `toast`;
    
    let icon = '';
    let progressHtml = '';
    let borderColor = '';
    
    if(type === 'loading') {
        icon = `<div class="toast-spinner-icon"></div>`;
        progressHtml = `<div class="toast-progress"></div>`;
        borderColor = 'var(--accent-gold)';
    } else if(type === 'success') {
        icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff66" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="toast-check-anim" d="M4 12l5 5L20 6"></path></svg>`;
        borderColor = '#00ff66';
    } else if(type === 'error') {
        icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff003c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="toast-cross-anim" d="M18 6L6 18M6 6l12 12"></path></svg>`;
        borderColor = '#ff003c';
    }
    
    toast.style.borderLeft = `4px solid ${borderColor}`;
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-text">${text}</div>
        ${progressHtml}
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger reflow to start animation
    void toast.offsetWidth;
    toast.classList.add('show');
}


// --- Real Google Sheets Form Submission ---
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const form = document.forms['contactForm'];
    const btn = document.querySelector('.contact-form-container .submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const originalText = btnText.innerText;

    // YOUR GOOGLE APP SCRIPT WEB APP URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwCL28rOpEjxQc_clhXkZYHD0QADEGnwbhxAlmazayokJWXUk5haou92epvJ59KSFN6JQ/exec';

    btnText.innerText = "Transmitting...";
    btn.style.borderColor = "var(--accent-gold)";
    
    // Trigger Loading Toast
    showToast('loading', 'Transmitting Message...');

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            btnText.innerText = "Message Sent";
            btn.style.borderColor = "var(--accent-cyan)";
            form.reset();
            
            // Trigger Success Toast
            showToast('success', 'Message Sent Successfully!');
            
            setTimeout(() => {
                btnText.innerText = originalText;
                btn.style.borderColor = "var(--border-color)";
                toastContainer.innerHTML = ''; // Hide toast
            }, 4000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            btnText.innerText = "Error Occurred";
            btn.style.borderColor = "#ff003c";
            
            // Trigger Error Toast
            showToast('error', 'Message Not Sent. Try again.');
            
            setTimeout(() => {
                btnText.innerText = originalText;
                btn.style.borderColor = "var(--border-color)";
                toastContainer.innerHTML = ''; // Hide toast
            }, 4000);
        });
});