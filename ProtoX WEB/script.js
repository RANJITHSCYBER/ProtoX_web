// Smooth scroll behavior for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.project-card, .founder-card, .section-header').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Add scroll-based background changes
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    // Enhance navbar shadow on scroll
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrollY < hero.offsetHeight) {
        const circles = hero.querySelectorAll('::before, ::after');
        hero.style.backgroundPosition = `0% ${scrollY * 0.5}px`;
    }
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.borderBottom = '2px solid #000';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// Stagger animation for project cards on load
window.addEventListener('load', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const founderCards = document.querySelectorAll('.founder-card');
    founderCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = ['home', 'projects', 'founders', 'contact'];
    
    if (e.key === 'ArrowDown') {
        const currentSection = document.querySelector('section:in-viewport')?.id || 'home';
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowUp') {
        const currentSection = document.querySelector('section:in-viewport')?.id || 'home';
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        document.getElementById(sections[prevIndex])?.scrollIntoView({ behavior: 'smooth' });
    }
});

// Mobile touch support for flip cards
const cards = document.querySelectorAll('.project-card, .founder-card');
cards.forEach(card => {
    card.addEventListener('touchend', function(e) {
        if (window.innerWidth <= 768) {
            this.classList.toggle('active');
        }
    });
});

// Intersection Observer for :in-viewport pseudo-class fallback
function getInViewportElement() {
    const sections = document.querySelectorAll('section');
    let inViewport = null;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            inViewport = section;
        }
    });
    
    return inViewport;
}

// Enhanced parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.hero::before, .hero::after');
    const x = (window.innerWidth - e.clientX * 2) / 100;
    const y = (window.innerHeight - e.clientY * 2) / 100;
    
    if (document.querySelector('.hero')) {
        const hero = document.querySelector('.hero');
        hero.style.backgroundPosition = `${x}px ${y}px`;
    }
});

// Add ripple effect on click for contact items
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', debounce(() => {
    // Performance optimization for scroll events
}, 100));

// Log page performance metrics
window.addEventListener('load', () => {
    if (performance && performance.timing) {
        const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time: ' + pageLoadTime + ' ms');
    }
});

// Add copy to clipboard functionality for contact info
document.querySelectorAll('.info-item').forEach(item => {
    const text = item.querySelector('p')?.textContent;
    if (text) {
        item.title = 'Click to copy';
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            navigator.clipboard.writeText(text).then(() => {
                const originalBg = this.style.background;
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                
                setTimeout(() => {
                    this.style.background = originalBg;
                }, 200);
            });
        });
    }
});

// Preload images and resources
function preloadResources() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
}

window.addEventListener('load', preloadResources);

// Support for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.scrollBehavior = 'auto';
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}
