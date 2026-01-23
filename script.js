// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards (excluding timeline for immediate visibility)
document.querySelectorAll('.skill-card, .cert-card, .project-card, .extras-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${(index % 4) * 0.08}s`;
    observer.observe(el);
});

// Hide top bar text on scroll and show name
const topBar = document.querySelector('.top-bar');
let lastScrollY = 0;
let ticking = false;

function updateTopBar() {
    if (window.scrollY > 50) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
    ticking = false;
}

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateTopBar);
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
    if (theme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Initial Check
function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }
}

// Event Listener
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Run init
initTheme();
