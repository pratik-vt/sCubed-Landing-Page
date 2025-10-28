
// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const headerRight = document.getElementById('headerRight');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMobileMenu() {
    headerRight.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (headerRight.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    headerRight.classList.remove('active');
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', toggleMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);

// Smooth Scroll Navigation
document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-scroll');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Close mobile menu if open
            if (headerRight.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value;

        if (email) {
            emailInput.value = '';
        }
    });
}

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        closeMobileMenu();
    }
});

// Scroll To Top
const scrollTopBtn = document.querySelector('.scroll-to-top');
const scrollTopElements = document.querySelectorAll('.scrollTop');

function updateScrollTopVisibility() {
    const showAfter = 300; // px
    if (window.scrollY > showAfter) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
document.addEventListener('DOMContentLoaded', updateScrollTopVisibility);

if (scrollTopBtn && scrollTopElements) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    scrollTopElements.forEach(element => {
        element.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Testimonials Marquee (responsive apply/teardown on breakpoint change)

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;

    let originalHTML = grid.innerHTML;
    let isApplied = false;

    function enableMobileTestimonialsMarquee() {
        if (isApplied) return;
        grid.innerHTML = originalHTML;

        const columns = Array.from(grid.querySelectorAll('.testimonials-column'));
        if (columns.length === 0) return;

        const primaryColumn = columns[0];
        const primaryScroll = primaryColumn.querySelector('.testimonials-scroll');

        for (let i = 1; i < columns.length; i++) {
            columns[i].style.display = 'none';
        }

        for (let i = 1; i < columns.length; i++) {
            const cards = columns[i].querySelectorAll('.testimonial-card');
            cards.forEach(card => primaryScroll.appendChild(card.cloneNode(true)));
        }

        primaryScroll.innerHTML += primaryScroll.innerHTML;
        isApplied = true;
    }

    function disableMobileTestimonialsMarquee() {
        if (!isApplied) return;
        grid.innerHTML = originalHTML;
        isApplied = false;
    }

    const mql = window.matchMedia('(max-width: 768px)');

    function evaluate() {
        if (mql.matches) {
            enableMobileTestimonialsMarquee();
        } else {
            disableMobileTestimonialsMarquee();
        }
    }

    evaluate();

    if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', evaluate);
    } else if (typeof mql.addListener === 'function') {
        mql.addListener(evaluate);
    }

    let resizeRaf;
    window.addEventListener('resize', () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(evaluate);
    });
});