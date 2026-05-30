import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
    createIcons, 
    Layout, 
    Database, 
    Zap, 
    ExternalLink, 
    Github, 
    Linkedin, 
    Twitter, 
    Mail,
    MapPin,
    Instagram
} from 'lucide';
import { initHero3D } from './js/hero3d.js';
import { initLiquidCursor } from './js/liquidCursor.js';

// Configuration
gsap.registerPlugin(ScrollTrigger);

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHero3D();
    initLiquidCursor();
    initIcons();
    initAnimations();
    initNavbar();
});

// 1. Smooth Scrolling (Lenis)
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// 2. Lucide Icons
function initIcons() {
    createIcons({
        icons: {
            Layout,
            Database,
            Zap,
            ExternalLink,
            Github,
            Linkedin,
            Twitter,
            MapPin,
            Instagram,
            Mail
        }
    });
}

// 3. GSAP Animations
function initAnimations() {
    // a. Hero Text Animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'back.out' })
          .from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.4')
          .from('.hero-role', { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6')
          .from('.hero-desc', { opacity: 0, duration: 0.8 }, '-=0.4')
          .from('.hero-btns', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');

    // b. Reveal Up Animation (Standard for sections)
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => {
        gsap.fromTo(el, 
            { y: 60, opacity: 0, visibility: 'hidden' }, 
            {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // c. Reveal Left/Right (Contact Info/Form)
    gsap.from('.reveal-left', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
        }
    });

    gsap.from('.reveal-right', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
        }
    });

    // d. Split Text Effect (Simulated)
    const splitTexts = document.querySelectorAll('.reveal-text');
    splitTexts.forEach(text => {
        gsap.from(text, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
            }
        });
    });
}

// 4. Navbar Logic
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll to Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. Contact Form Animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Message Sent! ✨';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 3000);
    });
}
