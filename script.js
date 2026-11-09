/**
 * ==============================================================================
 * MODERN PERSONAL DEVELOPER PORTFOLIO - JAVASCRIPT
 * Author: Abhishek Mishra (Fresher Computer Science Graduate)
 * 
 * Features:
 *  - Project configuration & dynamic button generator
 *  - Sticky navbar with scroll-aware styling
 *  - Mobile hamburger navigation drawer
 *  - Active section spy with IntersectionObserver
 *  - Smooth scrolling for anchor links
 *  - Skills category filtering
 *  - Projects category filtering
 *  - Hero code snippet copy-to-clipboard
 *  - Resume viewer modal & download triggers
 *  - Contact form validation with honest mailto dispatcher
 *  - Back to top button
 *  - Dynamic copyright year
 *  - Lightweight scroll reveal animations
 * ==============================================================================
 */

// Strict Mode for cleaner code & error prevention
'use strict';

/**
 * ==============================================================================
 * 1. PROJECT CONFIGURATION SECTION
 * ==============================================================================
 * Abhishek: You can easily update your GitHub repository URLs and live deployment
 * links right here.
 * 
 * Rules:
 *  - If a link exists, provide the full URL (e.g., 'https://github.com/...').
 *  - If a link is not yet deployed or unavailable, leave it as null or '' (empty string).
 *    The script will automatically hide or replace it with a descriptive badge,
 *    preventing any 404s or broken links!
 */
const PROJECT_CONFIG = {
  1: {
    id: 1,
    title: "Weather Application",
    githubUrl: "https://github.com/abhishek-aim-dev/weather-app",
    liveDemoUrl: "https://abhishek-aim-dev.github.io/weather-app/",
    type: "web",
    badgeNote: null // Has live demo
  },
  2: {
    id: 2,
    title: "Personal Portfolio Website",
    githubUrl: "https://github.com/abhishek-aim-dev/portfolio-website",
    liveDemoUrl: "https://abhishek-aim-dev.github.io/portfolio-website/",
    type: "web",
    badgeNote: null // Has live demo
  },
  3: {
    id: 3,
    title: "File Organizer",
    githubUrl: "https://github.com/abhishek-aim-dev/file-organizer",
    liveDemoUrl: null, // Python CLI script - No fake web demo!
    type: "python",
    badgeNote: "CLI / Automation Script"
  },
  4: {
    id: 4,
    title: "Rock Paper Scissors Game",
    githubUrl: "https://github.com/abhishek-aim-dev/rock-paper-scissors",
    liveDemoUrl: null, // Python CLI game - No fake web demo!
    type: "python",
    badgeNote: "Interactive CLI Game"
  }
};

/**
 * Initialize Project Action Buttons based on PROJECT_CONFIG
 */
function initProjectActions() {
  Object.keys(PROJECT_CONFIG).forEach(projectId => {
    const config = PROJECT_CONFIG[projectId];
    const actionsContainer = document.getElementById(`project-actions-${projectId}`);
    if (!actionsContainer) return;

    actionsContainer.innerHTML = '';

    // 1. Live Demo Button (Only if valid URL is present)
    if (config.liveDemoUrl && config.liveDemoUrl.trim() !== '') {
      const demoBtn = document.createElement('a');
      demoBtn.href = config.liveDemoUrl;
      demoBtn.target = '_blank';
      demoBtn.rel = 'noopener noreferrer';
      demoBtn.className = 'btn btn-primary btn-sm';
      demoBtn.innerHTML = `Live Demo <span class="arrow-icon">↗</span>`;
      actionsContainer.appendChild(demoBtn);
    } else if (config.badgeNote) {
      // Show honest CLI badge instead of fake demo
      const badge = document.createElement('span');
      badge.className = 'project-badge-cli';
      badge.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        ${config.badgeNote}
      `;
      actionsContainer.appendChild(badge);
    }

    // 2. GitHub Code Repository Button (If URL is present)
    if (config.githubUrl && config.githubUrl.trim() !== '') {
      const gitBtn = document.createElement('a');
      gitBtn.href = config.githubUrl;
      gitBtn.target = '_blank';
      gitBtn.rel = 'noopener noreferrer';
      gitBtn.className = 'btn btn-secondary btn-sm';
      gitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.523C9.34 21.615 9.52 21.306 9.52 21.039C9.52 20.803 9.51 20.176 9.51 19.344C6.73 19.948 6.14 18.005 6.14 18.005C5.68 17.062 5.03 16.81 5.03 16.81C4.12 16.19 5.1 16.202 5.1 16.202C6.1 16.273 6.63 17.234 6.63 17.234C7.52 18.761 8.96 18.32 9.53 18.064C9.62 17.419 9.88 16.979 10.16 16.729C7.94 16.477 5.61 15.619 5.61 11.789C5.61 10.697 6 9.805 6.64 9.106C6.54 8.854 6.19 7.836 6.74 6.467C6.74 6.467 7.58 6.198 9.49 7.491C10.29 7.269 11.14 7.158 11.99 7.154C12.84 7.158 13.69 7.269 14.49 7.491C16.4 6.198 17.24 6.467 17.24 6.467C17.79 7.836 17.44 8.854 17.34 9.106C17.98 9.805 18.37 10.697 18.37 11.789C18.37 15.629 16.03 16.474 13.81 16.721C14.17 17.03 14.49 17.643 14.49 18.58C14.49 19.923 14.48 20.732 14.48 21.039C14.48 21.309 14.66 21.621 15.17 21.521C19.14 20.194 22 16.444 22 12.017C22 6.484 17.522 2 12 2Z"/>
        </svg>
        GitHub Code <span class="arrow-icon">↗</span>
      `;
      actionsContainer.appendChild(gitBtn);
    }
  });
}

/**
 * ==============================================================================
 * 2. STICKY NAVBAR & ACTIVE LINK HIGHLIGHTING
 * ==============================================================================
 */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], main > section[id]');

  // Navbar background blur & shadow on scroll
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when a nav link is clicked
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section spy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));
}

/**
 * ==============================================================================
 * 3. SKILLS CATEGORY FILTERING
 * ==============================================================================
 */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterTabs.length || !skillCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab styling & aria-selected
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      // Filter skill cards
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * ==============================================================================
 * 4. FEATURED PROJECTS FILTERING
 * ==============================================================================
 */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * ==============================================================================
 * 5. HERO CODE SNIPPET COPY TO CLIPBOARD
 * ==============================================================================
 */
function initCodeCopy() {
  const copyBtn = document.getElementById('copyCodeBtn');
  if (!copyBtn) return;

  const codeSnippet = `const developer = {
  name: "Abhishek Mishra",
  degree: "B.Tech CSE (2026)",
  skills: ["HTML", "CSS", "JS", "Python"],
  passion: "Building things for the web",
  learning: "SAP ABAP"
};`;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      copyBtn.title = 'Copied to clipboard!';
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.title = 'Copy code snippet';
      }, 2000);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  });
}

/**
 * ==============================================================================
 * 6. RESUME PREVIEW MODAL
 * ==============================================================================
 */
function initResumeModal() {
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!viewResumeBtn || !resumeModal) return;

  function openModal() {
    resumeModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeModal() {
    resumeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  viewResumeBtn.addEventListener('click', openModal);

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Click outside modal container to close
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * ==============================================================================
 * 7. CONTACT FORM VALIDATION & HONEST DISPATCHER
 * ==============================================================================
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('emailSubject');
  const messageInput = document.getElementById('emailMessage');
  const feedbackBox = document.getElementById('formFeedback');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Email regex format validator
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
      inp.classList.remove('is-invalid');
    });
    [nameError, emailError, subjectError, messageError].forEach(err => {
      err.textContent = '';
    });
    feedbackBox.className = 'form-feedback';
    feedbackBox.textContent = '';
    feedbackBox.style.display = 'none';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    // Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      nameInput.classList.add('is-invalid');
      nameError.textContent = 'Please enter your name.';
      hasError = true;
    } else if (nameVal.length < 2) {
      nameInput.classList.add('is-invalid');
      nameError.textContent = 'Name must be at least 2 characters long.';
      hasError = true;
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      emailInput.classList.add('is-invalid');
      emailError.textContent = 'Please enter your email address.';
      hasError = true;
    } else if (!isValidEmail(emailVal)) {
      emailInput.classList.add('is-invalid');
      emailError.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
      hasError = true;
    }

    // Validate Subject
    const subjectVal = subjectInput.value.trim();
    if (!subjectVal) {
      subjectInput.classList.add('is-invalid');
      subjectError.textContent = 'Please enter a subject.';
      hasError = true;
    } else if (subjectVal.length < 3) {
      subjectInput.classList.add('is-invalid');
      subjectError.textContent = 'Subject must be at least 3 characters long.';
      hasError = true;
    }

    // Validate Message
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      messageInput.classList.add('is-invalid');
      messageError.textContent = 'Please write your message.';
      hasError = true;
    } else if (messageVal.length < 10) {
      messageInput.classList.add('is-invalid');
      messageError.textContent = 'Message should be at least 10 characters long.';
      hasError = true;
    }

    if (hasError) {
      feedbackBox.className = 'form-feedback error';
      feedbackBox.textContent = 'Please correct the highlighted fields above.';
      feedbackBox.style.display = 'block';
      return;
    }

    // Prepare Honest Mailto Dispatch
    // (No deceptive fake success messages - honest direct client communication)
    const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subjectVal} - from ${nameVal}`);
    const encodedBody = encodeURIComponent(
      `Hi Abhishek,\n\n${messageVal}\n\n---\nSender Details:\nName: ${nameVal}\nEmail: ${emailVal}`
    );

    const mailtoUri = `mailto:abhishek3mishra0912@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    feedbackBox.className = 'form-feedback success';
    feedbackBox.innerHTML = `
      ✓ <strong>Thank you, ${nameVal}!</strong> Your message has been validated.<br>
      Opening your default email application to deliver it directly to <strong>abhishek3mishra0912@gmail.com</strong>.
      If your email client didn't open automatically, you can email me directly at <a href="mailto:abhishek3mishra0912@gmail.com" style="text-decoration: underline; color: inherit;">abhishek3mishra0912@gmail.com</a>.
    `;
    feedbackBox.style.display = 'block';

    // Trigger mailto after brief confirmation
    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 800);
  });
}

/**
 * ==============================================================================
 * 8. BACK TO TOP BUTTON
 * ==============================================================================
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * ==============================================================================
 * 9. DYNAMIC COPYRIGHT YEAR
 * ==============================================================================
 */
function initCopyrightYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * ==============================================================================
 * 10. LIGHTWEIGHT SCROLL REVEAL ANIMATIONS
 * ==============================================================================
 */
function initScrollReveal() {
  // Elements to reveal smoothly as they enter viewport
  const revealElements = document.querySelectorAll(
    '.stat-card, .skill-card, .project-card, .timeline-item, .cert-card'
  );

  if (!revealElements.length || !('IntersectionObserver' in window)) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });
}

/**
 * ==============================================================================
 * INITIALIZE APPLICATION ON DOMContentLoaded
 * ==============================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  initProjectActions();
  initNavigation();
  initSkillsFilter();
  initProjectsFilter();
  initCodeCopy();
  initResumeModal();
  initContactForm();
  initBackToTop();
  initCopyrightYear();
  initScrollReveal();
});
