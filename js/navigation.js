/**
 * Career Compass - Navigation Module
 * Handles career selection and routing logic
 */

import { utils } from './utils.js';

// Career paths mapping
const CAREER_PATHS = {
  'S': 'pages/science.html',
  'T': 'pages/tech_eng.html', 
  'M': 'pages/math.html'
};

export const Navigation = {
  /**
   * Initialize navigation system
   */
  init() {
    this.setupScrollHeader();
    this.setupMobileMenu();
    this.setupActiveNavigation();
  },

  /**
   * Handle career selection submission
   */
  submitCareerSelection() {
    const careerSelect = utils.getElement("career");
    
    if (!careerSelect) {
      utils.showAlert('Career selection not found. Please refresh the page.', 'error');
      return;
    }

    const selectedValue = careerSelect.value;
    
    if (!selectedValue) {
      utils.showAlert('Please select a career field before submitting.', 'warning');
      careerSelect.focus();
      return;
    }

    const targetPage = CAREER_PATHS[selectedValue];
    
    if (targetPage) {
      // Store selection for analytics
      utils.storage.set('lastCareerSelection', {
        field: selectedValue,
        timestamp: new Date().toISOString()
      });
      
      utils.navigateTo(targetPage);
    } else {
      console.error('Invalid career selection:', selectedValue);
      utils.showAlert('Invalid selection. Please try again.', 'error');
    }
  },

  /**
   * Setup scroll-based header behavior
   */
  setupScrollHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = utils.throttle(() => {
      if (window.scrollY > 100) {
        header.classList.add('scroll');
      } else {
        header.classList.remove('scroll');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
  },

  /**
   * Setup mobile menu functionality
   */
  setupMobileMenu() {
    const menuToggle = document.querySelector('.menu');
    const navList = document.querySelector('.navlist');
    
    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', 
        navList.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  },

  /**
   * Setup active navigation highlighting
   */
  setupActiveNavigation() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navlist a');

    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage ||
          (currentPage === '/' && link.getAttribute('href') === '#home')) {
        link.classList.add('active');
      }
    });
  },

  /**
   * Smooth scroll to section
   * @param {string} sectionId - The section ID to scroll to
   */
  scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      utils.scrollTo(section);
      
      // Update URL hash without triggering scroll
      history.pushState(null, null, sectionId);
    }
  },

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId !== '#') {
          this.scrollToSection(targetId);
        }
      });
    });
  },

  /**
   * Handle browser back/forward navigation
   */
  setupHistoryNavigation() {
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.section) {
        this.scrollToSection(e.state.section);
      }
    });
  }
};

// Make submit function globally available for HTML onclick handlers
window.submit = () => Navigation.submitCareerSelection();
