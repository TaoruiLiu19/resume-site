(function () {
  'use strict';

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const STORAGE_KEY = 'resume-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', '切换到深色主题');
      }
    } else {
      html.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', '切换到浅色主题');
      }
    }
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
  }

  function initTheme() {
    const saved = getSavedTheme();
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
      return;
    }
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isLight = html.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  // Mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Update footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Scroll reveal (respects prefers-reduced-motion via CSS)
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Ensure visibility even if observer never fires
  sections.forEach(function (section) {
    section.classList.add('is-visible');
  });

  // Hero clock
  const hourDotGroup = document.getElementById('hour-dot-group');
  const minuteDotGroup = document.getElementById('minute-dot-group');
  const secondDotGroup = document.getElementById('second-dot-group');
  const digitalClock = document.getElementById('clock-digital');

  if (hourDotGroup && minuteDotGroup && secondDotGroup && digitalClock) {
    function updateClock() {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds() + now.getMilliseconds() / 1000;

      // SVG rotate: 0deg = 3 o'clock, so subtract 90 to align 12 o'clock
      const hourAngle = h * 30 + m * 0.5 + s * (0.5 / 60) - 90;
      const minAngle = m * 6 + s * 0.1 - 90;
      const secAngle = s * 6 - 90;

      hourDotGroup.setAttribute('transform', 'rotate(' + hourAngle + ' 140 140)');
      minuteDotGroup.setAttribute('transform', 'rotate(' + minAngle + ' 140 140)');
      secondDotGroup.setAttribute('transform', 'rotate(' + secAngle + ' 140 140)');

      digitalClock.textContent = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      requestAnimationFrame(updateClock);
    }

    updateClock();
  }
})();
