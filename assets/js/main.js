/* Main Application Logic - Vallepu Nagarjuna Portfolio */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTypingEffect();
  initThemeToggle();
  initScrollEffects();
  initRevealOnScroll();
  initSkillBarAnimations();
  initCounterAnimations();
  initContactForm();
  initMouseGlow();
  initMobileMenu();

  if (window.lucide) {
    lucide.createIcons();
  }
});

// 1. Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    });
    // Fallback timer
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1200);
  }
}

// 2. Typing Effect
function initTypingEffect() {
  const target = document.getElementById('typed-headline');
  if (!target) return;

  const words = [
    "Aspiring Data Analyst",
    "Python Developer",
    "CSE (Data Science) Student",
    "Data-Driven Problem Solver"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.innerText = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.innerText = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

// 3. Theme Toggle (Dark / Light)
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('vn_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('vn_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!icon) return;
    if (theme === 'light') {
      icon.setAttribute('data-lucide', 'sun');
    } else {
      icon.setAttribute('data-lucide', 'moon');
    }
    if (window.lucide) lucide.createIcons();
  }
}

// 4. Scroll Effects (Progress bar & Back-to-top)
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 5. Intersection Observer for Scroll Reveals
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// 6. Skill Progress Bars Animation
function initSkillBarAnimations() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-target-width');
        entry.target.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

// 7. Counter Animation
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-val');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        let count = 0;
        const duration = 1500;
        const increment = target / (duration / 16);

        const updateCount = () => {
          count += increment;
          if (count < target) {
            entry.target.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            entry.target.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// 8. Mouse Glow Effect
function initMouseGlow() {
  const glow = document.querySelector('.mouse-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// 9. Mobile Navigation Menu Drawer
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}

// 10. Contact Form Submission & Validation
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all contact form fields!', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showToast('Please enter a valid email address!', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Sending...`;
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origText;
      if (window.lucide) lucide.createIcons();
      form.reset();
      showToast('🎉 Thank you! Your message has been sent successfully.');
    }, 1200);
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 11. Toast System
window.showToast = function(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'border-red-500' : 'border-cyan-400'}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" class="${type === 'error' ? 'text-red-400' : 'text-cyan-400'} w-5 h-5"></i>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.remove();
  }, 4000);
};

// 12. Resume Viewer & Downloader
window.openResumeModal = function() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.add('active');
};

window.downloadResume = function() {
  const resumeText = `
================================================================================
                       VALLEPU NAGARJUNA
================================================================================
Aspiring Data Analyst | Python Developer | CSE (Data Science) Student
Phone: +91-8106944373 | Email: nagarjunav785@gmail.com
Location: Andhra Pradesh, India

--------------------------------------------------------------------------------
CAREER OBJECTIVE
--------------------------------------------------------------------------------
Aspiring Data Analyst with a strong foundation in Python and data analysis, 
passionate about solving real-world problems using data. Seeking opportunities 
to apply analytical thinking, develop impactful software, and contribute to 
data-driven decision-making.

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
• B.Tech in Computer Science Engineering (Data Science)
  Swarnandhra College of Engineering and Technology (JNTUK)
  Duration: 2023 - 2027 | CGPA: 6.8

• Intermediate (10+2)
  M.S.R Junior College
  Percentage: 73.4%

• SSC (10th)
  ZPHS
  Percentage: 91%

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Programming Languages : Python, Java
• Databases             : MySQL, PostgreSQL
• Web Technologies      : HTML, CSS, JavaScript
• Frameworks & Libraries: Frontend UI Frameworks, Tailwind CSS, Bootstrap
• Tools & Platforms     : Git, GitHub, VS Code
• Soft Skills           : Communication, Teamwork, Time Management

--------------------------------------------------------------------------------
INTERNSHIP EXPERIENCE
--------------------------------------------------------------------------------
• Python Programming Intern | CodSoft (1 Month)
  - Developed command-line and GUI applications using Python.
  - Implemented modular programming, exception handling, and file processing.

• Software Development Intern | DataValley (2 Months)
  - Participated in database architecture and backend software workflows.
  - Wrote optimized SQL queries and developed algorithm scripts.

--------------------------------------------------------------------------------
PROJECTS
--------------------------------------------------------------------------------
1. To-Do List Application (Python, File Handling)
   - Command-line task manager supporting task creation, status toggling, and file persistence.

2. Password Generator (Python, Tkinter)
   - Custom length password generator with symbol, number, and uppercase character options.

3. Calculator Application (Python, Exception Handling)
   - Built a robust calculator evaluating complex expressions safely.

4. Rock Paper Scissors Game (Python, Game Logic)
   - Interactive gameplay against AI with score tracking and streak management.

--------------------------------------------------------------------------------
CERTIFICATIONS
--------------------------------------------------------------------------------
• Python for Data Science – NPTEL (2024)
• Privacy and Security in Online Social Media – NPTEL (2025)

================================================================================
Designed & Developed by Vallepu Nagarjuna © 2026
================================================================================
  `;

  const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Vallepu_Nagarjuna_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('📄 Vallepu Nagarjuna Resume downloaded successfully!');
};
