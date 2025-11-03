// reCAPTCHA Configuration is now handled inline in HTML for server-side injection

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

// Newsletter Form Submission - handled by comprehensive implementation below

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


(function () {
  'use strict';

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var successHideTimer = null;

  function findForms() {
    // First try to find the specific newsletter form
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      return [newsletterForm];
    }
    
    // Fallback: find forms that contain an email input
    var all = Array.prototype.slice.call(document.querySelectorAll('form'));
    return all.filter(function (f) {
      return !!f.querySelector('input[type="email"], input[name="email"]');
    });
  }

  function findNearby(rootEl, selector) {
    // Look within root, then climb up 3 ancestors to find the first match
    var cur = rootEl;
    for (var depth = 0; depth < 4 && cur; depth++) {
      var found = cur.querySelector(selector);
      if (found) return found;
      cur = cur.parentElement;
    }
    return document.querySelector(selector);
  }

  function pickMessageTarget(box) {
    if (!box) return null;
    return box.querySelector('.message') || box;
  }

  function clearMessages(successBox, errorBox, successMsgEl, errorMsgEl) {
    if (successHideTimer) {
      clearTimeout(successHideTimer);
      successHideTimer = null;
    }
    if (successMsgEl) successMsgEl.textContent = '';
    if (errorMsgEl) errorMsgEl.textContent = '';
    hide(successBox);
    hide(errorBox);
  }

  function show(el) {
    if (!el) return;
    el.removeAttribute('hidden');
    el.setAttribute('aria-hidden', 'false');
    el.style.display = 'block';
    el.style.opacity = '1';
  }

  function hide(el) {
    if (!el) return;
    el.setAttribute('aria-hidden', 'true');
    el.style.display = 'none';
    el.style.opacity = '0';
  }

  function setLoading(btn, emailInput, isLoading) {
    if (btn) {
      var hasSwapSpans =
        !!btn.querySelector('.newsletter-submit-text') &&
        !!btn.querySelector('.newsletter-loading');
      if (hasSwapSpans) {
        if (isLoading) btn.classList.add('is-loading');
        else btn.classList.remove('is-loading');
      } else {
        var original = btn.getAttribute('data-original-text');
        if (!original) {
          btn.setAttribute('data-original-text', btn.textContent || '');
          original = btn.getAttribute('data-original-text');
        }
        btn.textContent = isLoading ? 'Subscribing…' : (original || 'Subscribe');
      }
      btn.disabled = !!isLoading;
    }
    if (emailInput) emailInput.disabled = !!isLoading;
  }

  function isValidEmail(value) {
    var v = String(value || '').trim();
    if (!v) return false;
    // Use native validity if available, fallback to regex
    var probe = document.createElement('input');
    probe.type = 'email';
    probe.value = v;
    return (probe.validity && probe.validity.valid) || EMAIL_REGEX.test(v);
  }

  function attach(form) {
    var emailInput = form.querySelector('input[name="email"]') || form.querySelector('input[type="email"]');
    var submitBtn =
      form.querySelector('#newsletterSubmit') ||
      form.querySelector('button[type="submit"]') ||
      form.querySelector('input[type="submit"]');

    // Use your existing UI blocks
    var successBox =
      findNearby(form, '.success-message') || findNearby(form, '.newsletter-success');
    var errorBox =
      findNearby(form, '.error-message') || findNearby(form, '.newsletter-error');

    var successMsgEl = pickMessageTarget(successBox);
    var errorMsgEl = pickMessageTarget(errorBox);

    if (!emailInput || !submitBtn || !successBox || !errorBox) return;

    form.setAttribute('novalidate', 'novalidate');
    
    // Initialize message states as hidden
    hide(successBox);
    hide(errorBox);
    if (successMsgEl) successMsgEl.textContent = '';
    if (errorMsgEl) errorMsgEl.textContent = '';

    // Clear error messages when user starts typing (but not when programmatically cleared)
    emailInput.addEventListener('input', function() {
      // Only clear messages if the user is actually typing (input has content)
      // This prevents clearing success messages when form is reset programmatically
      if (emailInput.value.trim().length > 0) {
        clearMessages(successBox, errorBox, successMsgEl, errorMsgEl);
      }
    });

    // Clear error messages when user focuses on input (only if there's an error showing)
    emailInput.addEventListener('focus', function() {
      // Only hide error box if it's currently visible and there's no success message showing
      if (errorBox.getAttribute('aria-hidden') === 'false' && 
          successBox.getAttribute('aria-hidden') !== 'false') {
        hide(errorBox);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      clearMessages(successBox, errorBox, successMsgEl, errorMsgEl);

      var email = (emailInput.value || '').trim();
      if (!email) {
        if (errorMsgEl) errorMsgEl.textContent = 'Email is required';
        show(errorBox);
        return;
      }
      if (!isValidEmail(email)) {
        if (errorMsgEl) errorMsgEl.textContent = 'Please enter a valid email address';
        show(errorBox);
        return;
      }

      setLoading(submitBtn, emailInput, true);

      // Execute reCAPTCHA if available and properly configured (matching React component approach)
      if (window.grecaptcha && window.RECAPTCHA_SITE_KEY) {
        try {
          window.grecaptcha.ready(function() {
            // Use the same approach as React component - direct execute with site key and action
            window.grecaptcha.execute(window.RECAPTCHA_SITE_KEY, {action: 'newsletter'}).then(function(token) {
              if (token) {
                submitToAPI(email, token, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
              } else {
                // Fallback to submission without reCAPTCHA
                submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
              }
            }).catch(function(error) {
              console.warn('reCAPTCHA execution failed:', error);
              
              // Show user-friendly message about reCAPTCHA issue
              if (errorMsgEl) {
                errorMsgEl.textContent = 'Security verification unavailable. Proceeding without verification.';
                show(errorBox);
                setTimeout(function() {
                  hide(errorBox);
                }, 3000);
              }
              
              // Fallback to submission without reCAPTCHA
              setTimeout(function() {
                submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
              }, 1000);
            });
          });
        } catch (error) {
          console.warn('reCAPTCHA initialization error:', error);
          // Fallback to submission without reCAPTCHA
          submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
        }
      } else {
        // Fallback without reCAPTCHA (disabled or not available)
        submitToAPI(email, null, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl);
      }
    });
  }

  function submitToAPI(email, recaptchaToken, submitBtn, emailInput, successBox, errorBox, successMsgEl, errorMsgEl) {
    var payload = { email: email };
    if (recaptchaToken) {
      payload.recaptcha_token = recaptchaToken;
    }

    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
        .then(function (resp) {
          return Promise.all([resp.ok, resp.json().catch(function () { return {}; })]);
        })
      .then(function (res) {
        var ok = res[0];
        var data = res[1] || {};
        if (ok) {
          // Ensure error messages are hidden before showing success
          hide(errorBox);
          if (errorMsgEl) errorMsgEl.textContent = '';
          
          if (successMsgEl) {
            successMsgEl.textContent = data.message || 'Thank you for subscribing to our newsletter!';
          }
          show(successBox);
          emailInput.value = '';
          successHideTimer = setTimeout(function () {
            hide(successBox);
            if (successMsgEl) successMsgEl.textContent = '';
          }, 5000);
        } else {
          var msg;
          if (Array.isArray(data.errors) && data.errors[0]) {
            var error = data.errors[0];
            if (error.field === 'recaptcha') {
              msg = error.message || 'reCAPTCHA verification failed. Please try again.';
            } else {
              msg = error.message || 'Failed to subscribe. Please try again later.';
            }
          } else {
            msg = 'Failed to subscribe. Please try again later.';
          }
          if (errorMsgEl) errorMsgEl.textContent = msg;
          show(errorBox);
        }
      })
      .catch(function () {
        if (errorMsgEl) errorMsgEl.textContent = 'Network error. Please check your connection and try again.';
        show(errorBox);
      })
      .finally(function () {
        setLoading(submitBtn, emailInput, false);
      });
  }

  function init() {
    var forms = findForms();
    for (var i = 0; i < forms.length; i++) attach(forms[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();