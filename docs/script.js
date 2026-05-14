/* =====================================================
    PORTFOLIO — script.js
    ===================================================== */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mouseX = 0,
    mouseY = 0,
    trailX = 0,
    trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
}
animateTrail();

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- HAMBURGER / MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delays for siblings
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ---- ANIMATED COUNTERS ----
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 20);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ---- SKILL BARS ----
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const width = el.getAttribute('data-w');
            setTimeout(() => {
                el.style.width = width + '%';
            }, 200);
            barObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });

bars.forEach(bar => barObserver.observe(bar));

// ---- PROJECT FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btnSpan = submitBtn.querySelector('span');
    btnSpan.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate sending (replace with real fetch/API call)
    setTimeout(() => {
        contactForm.reset();
        btnSpan.textContent = 'Send Message';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent)';
        }
    });
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- TYPING EFFECT on hero tag ----
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
    const text = '// Full Stack Developer';
    heroTag.textContent = '';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            heroTag.textContent += text[i++];
            setTimeout(type, 60);
        }
    };
    setTimeout(type, 600);
}

// ---- PAGE LOAD ANIMATION ----
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
fetch('https://portfolio-iz6u.onrender.com/api/projects')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));
