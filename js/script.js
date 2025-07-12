// Portfolio Website JavaScript
// Author: John Doe
// Description: Main JavaScript file for portfolio website functionality

(function() {
    'use strict';

    // DOM Elements
    const preloader = document.getElementById('preloader');
    const themeToggle = document.getElementById('themeToggle');
    const scrollTopBtn = document.getElementById('scrollTop');
    const navbar = document.getElementById('mainNav');
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link');
    const skillBars = document.querySelectorAll('.progress-bar');

    // Theme Management
    class ThemeManager {
        constructor() {
            this.theme = localStorage.getItem('theme') || 'light';
            this.init();
        }

        init() {
            this.setTheme(this.theme);
            this.updateToggleIcon();
            
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }

        setTheme(theme) {
            this.theme = theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }

        toggleTheme() {
            const newTheme = this.theme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            this.updateToggleIcon();
        }

        updateToggleIcon() {
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
                }
            }
        }
    }

    // Preloader Management
    class PreloaderManager {
        constructor() {
            this.preloader = preloader;
            this.init();
        }

        init() {
            if (this.preloader) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        this.hidePreloader();
                    }, 1000);
                });
            }
        }

        hidePreloader() {
            if (this.preloader) {
                this.preloader.classList.add('fade-out');
                setTimeout(() => {
                    this.preloader.style.display = 'none';
                }, 500);
            }
        }
    }

    // Navigation Management
    class NavigationManager {
        constructor() {
            this.navbar = navbar;
            this.navLinks = navLinks;
            this.init();
        }

        init() {
            this.handleScroll();
            this.handleNavLinks();
            this.handleMobileMenu();
            
            window.addEventListener('scroll', () => this.handleScroll());
        }

        handleScroll() {
            if (this.navbar) {
                const scrolled = window.scrollY > 50;
                this.navbar.classList.toggle('scrolled', scrolled);
            }
            
            this.updateActiveNavLink();
        }

        updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        handleNavLinks() {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                });
            });
        }

        handleMobileMenu() {
            // Mobile menu close on outside click
            document.addEventListener('click', (e) => {
                const navbarCollapse = document.getElementById('navbarNav');
                const navbarToggler = document.querySelector('.navbar-toggler');
                
                if (navbarCollapse && navbarToggler && 
                    !navbarCollapse.contains(e.target) && 
                    !navbarToggler.contains(e.target) &&
                    navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        }
    }

    // Scroll to Top Button
    class ScrollToTopManager {
        constructor() {
            this.scrollTopBtn = scrollTopBtn;
            this.init();
        }

        init() {
            if (this.scrollTopBtn) {
                window.addEventListener('scroll', () => this.handleScroll());
                this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());
            }
        }

        handleScroll() {
            const scrolled = window.scrollY > 300;
            this.scrollTopBtn.classList.toggle('show', scrolled);
        }

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Form Validation and Handling
    class FormManager {
        constructor() {
            this.contactForm = contactForm;
            this.init();
        }

        init() {
            if (this.contactForm) {
                this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
                this.setupRealTimeValidation();
            }
        }

        setupRealTimeValidation() {
            const inputs = this.contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }

        validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let errorMessage = '';

            // Clear previous validation
            field.classList.remove('is-invalid', 'is-valid');
            const feedback = field.nextElementSibling;

            switch (fieldName) {
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters long';
                    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Name can only contain letters and spaces';
                    }
                    break;

                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;

                case 'subject':
                    if (value.length < 5) {
                        isValid = false;
                        errorMessage = 'Subject must be at least 5 characters long';
                    }
                    break;

                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters long';
                    }
                    break;
            }

            if (!isValid) {
                field.classList.add('is-invalid');
                if (feedback) {
                    feedback.textContent = errorMessage;
                }
            } else {
                field.classList.add('is-valid');
                if (feedback) {
                    feedback.textContent = '';
                }
            }

            return isValid;
        }

        clearFieldError(field) {
            if (field.classList.contains('is-invalid')) {
                field.classList.remove('is-invalid');
                const feedback = field.nextElementSibling;
                if (feedback) {
                    feedback.textContent = '';
                }
            }
        }

        handleSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this.contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate all fields
            const inputs = this.contactForm.querySelectorAll('input, textarea');
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                this.showSuccessMessage();
                this.resetForm();
            } else {
                this.showErrorMessage();
            }
        }

        showSuccessMessage() {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show';
            alert.innerHTML = `
                <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            this.contactForm.insertBefore(alert, this.contactForm.firstChild);
            
            setTimeout(() => {
                alert.remove();
            }, 5000);
        }

        showErrorMessage() {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger alert-dismissible fade show';
            alert.innerHTML = `
                <strong>Error!</strong> Please fix the errors below and try again.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            this.contactForm.insertBefore(alert, this.contactForm.firstChild);
            
            setTimeout(() => {
                alert.remove();
            }, 5000);
        }

        resetForm() {
            this.contactForm.reset();
            const inputs = this.contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
                const feedback = input.nextElementSibling;
                if (feedback) {
                    feedback.textContent = '';
                }
            });
        }
    }

    // Typed.js Animation
    class TypedAnimation {
        constructor() {
            this.init();
        }

        init() {
            if (typeof Typed !== 'undefined') {
                const options = {
                    strings: [
                        'Frontend Developer',
                        'React Specialist',
                        'UI/UX Enthusiast',
                        'JavaScript Expert',
                        'Web Designer'
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|'
                };

                new Typed('#typed-text', options);
            }
        }
    }

    // Skill Bar Animation
    class SkillBarAnimation {
        constructor() {
            this.skillBars = skillBars;
            this.init();
        }

        init() {
            this.animateSkillBars();
            window.addEventListener('scroll', () => this.animateSkillBars());
        }

        animateSkillBars() {
            const aboutSection = document.getElementById('about');
            if (!aboutSection) return;

            const rect = aboutSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                this.skillBars.forEach(bar => {
                    if (!bar.classList.contains('animated')) {
                        bar.classList.add('animated');
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 500);
                    }
                });
            }
        }
    }

    // AOS (Animate On Scroll) Initialization
    class AOSManager {
        constructor() {
            this.init();
        }

        init() {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100,
                    easing: 'ease-in-out'
                });
            }
        }
    }

    // Smooth Scrolling for anchor links
    class SmoothScrolling {
        constructor() {
            this.init();
        }

        init() {
            // Handle all anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }

    // Portfolio Filter and Modal Management
    class PortfolioManager {
        constructor() {
            this.init();
        }

        init() {
            this.setupModalEvents();
        }

        setupModalEvents() {
            // Add event listeners for modal triggers
            const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
            modalTriggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Modal will be handled by Bootstrap automatically
                });
            });
        }
    }

    // Utility Functions
    class Utils {
        static debounce(func, wait) {
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

        static throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        static isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    }

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all managers
        const themeManager = new ThemeManager();
        const preloaderManager = new PreloaderManager();
        const navigationManager = new NavigationManager();
        const scrollToTopManager = new ScrollToTopManager();
        const formManager = new FormManager();
        const typedAnimation = new TypedAnimation();
        const skillBarAnimation = new SkillBarAnimation();
        const aosManager = new AOSManager();
        const smoothScrolling = new SmoothScrolling();
        const portfolioManager = new PortfolioManager();

        // Add loading class to body
        document.body.classList.add('loading');

        // Remove loading class when everything is loaded
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
        });

        // Console welcome message
        console.log('%c👋 Welcome to my portfolio!', 'color: #007bff; font-size: 16px; font-weight: bold;');
        console.log('%cIf you\'re interested in my work, feel free to reach out!', 'color: #6c757d; font-size: 14px;');
    });

    // Handle resize events
    window.addEventListener('resize', Utils.debounce(() => {
        // Refresh AOS on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250));

    // Animated Counter
    class AnimatedCounter {
        constructor() {
            this.counters = document.querySelectorAll('.stat-number');
            this.init();
        }

        init() {
            this.observeCounters();
        }

        observeCounters() {
            if (this.counters.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        if (!counter.classList.contains('counted')) {
                            this.animateCounter(counter);
                            counter.classList.add('counted');
                        }
                    }
                });
            }, { threshold: 0.5 });

            this.counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
        }
    }

    // Particle System
    class ParticleSystem {
        constructor() {
            this.container = document.getElementById('particles-container');
            this.particles = [];
            this.maxParticles = 50;
            this.init();
        }

        init() {
            if (!this.container) return;
            
            this.createParticles();
            this.animate();
        }

        createParticles() {
            for (let i = 0; i < this.maxParticles; i++) {
                this.createParticle();
            }
        }

        createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random color
            const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }

        animate() {
            // Particles are animated via CSS animations
            // This method can be extended for more complex animations
        }
    }

    // Enhanced Scroll Reveal
    class ScrollReveal {
        constructor() {
            this.elements = document.querySelectorAll('.reveal-animation');
            this.init();
        }

        init() {
            this.observeElements();
        }

        observeElements() {
            if (this.elements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });

            this.elements.forEach(element => observer.observe(element));
        }
    }

    // Technology Icons Animation
    class TechIconsAnimation {
        constructor() {
            this.techItems = document.querySelectorAll('.tech-item');
            this.init();
        }

        init() {
            this.addHoverEffects();
            this.addClickEffects();
        }

        addHoverEffects() {
            this.techItems.forEach(item => {
                const icon = item.querySelector('.tech-icon');
                if (!icon) return;

                item.addEventListener('mouseenter', () => {
                    icon.style.transform = 'rotateY(180deg) scale(1.1)';
                });

                item.addEventListener('mouseleave', () => {
                    icon.style.transform = 'rotateY(0deg) scale(1)';
                });
            });
        }

        addClickEffects() {
            this.techItems.forEach(item => {
                item.addEventListener('click', () => {
                    item.style.animation = 'bounceIn 0.6s ease-out';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 600);
                });
            });
        }
    }

    // Enhanced Portfolio Filter
    class PortfolioFilter {
        constructor() {
            this.portfolioItems = document.querySelectorAll('.portfolio-item');
            this.init();
        }

        init() {
            this.addInteractiveEffects();
        }

        addInteractiveEffects() {
            this.portfolioItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    this.highlightSimilarProjects(item);
                });

                item.addEventListener('mouseleave', () => {
                    this.resetHighlight();
                });
            });
        }

        highlightSimilarProjects(activeItem) {
            const activeTags = Array.from(activeItem.querySelectorAll('.badge')).map(badge => badge.textContent);
            
            this.portfolioItems.forEach(item => {
                if (item === activeItem) return;
                
                const itemTags = Array.from(item.querySelectorAll('.badge')).map(badge => badge.textContent);
                const hasCommonTag = activeTags.some(tag => itemTags.includes(tag));
                
                if (hasCommonTag) {
                    item.style.transform = 'scale(1.02)';
                    item.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.2)';
                } else {
                    item.style.opacity = '0.7';
                }
            });
        }

        resetHighlight() {
            this.portfolioItems.forEach(item => {
                item.style.transform = '';
                item.style.boxShadow = '';
                item.style.opacity = '';
            });
        }
    }

    // Add shake animation to CSS
    const shakeAnimation = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = shakeAnimation;
    document.head.appendChild(style);

    // Handle visibility change (for performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden, pause any animations if needed
        } else {
            // Page is visible, resume animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    });

    // Initialize all managers
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all components
        new ThemeManager();
        new PreloaderManager();
        new NavigationManager();
        new ScrollToTopManager();
        new FormManager();
        new TypedAnimation();
        new SkillBarAnimation();
        new AOSManager();
        new SmoothScrolling();
        new PortfolioManager();
        new AnimatedCounter();
        new ParticleSystem();
        new ScrollReveal();
        new TechIconsAnimation();
        new PortfolioFilter();
        
        // Console welcome message
        console.log('%c👋 Welcome to my portfolio!', 'color: #007bff; font-size: 16px; font-weight: bold;');
        console.log('%cIf you\'re interested in my work, feel free to reach out!', 'color: #6c757d; font-size: 14px;');
    });

    // Export for global access if needed
    window.PortfolioApp = {
        ThemeManager,
        PreloaderManager,
        NavigationManager,
        ScrollToTopManager,
        FormManager,
        TypedAnimation,
        SkillBarAnimation,
        AOSManager,
        SmoothScrolling,
        PortfolioManager,
        AnimatedCounter,
        ParticleSystem,
        ScrollReveal,
        TechIconsAnimation,
        PortfolioFilter,
        Utils
    };

})();
