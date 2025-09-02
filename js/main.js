/**
 * Career Compass - Main Application Entry Point
 * Modern modular JavaScript architecture for the Career Compass application
 */

import { utils } from './utils.js';
import { Navigation } from './navigation.js';
import { QuizCalculator } from './quiz.js';
import { ProfileManager } from './profiles.js';
import { InternshipNavigator } from './internships.js';

class CareerCompassApp {
  constructor() {
    this.modules = {
      utils,
      navigation: Navigation,
      quiz: QuizCalculator,
      profiles: ProfileManager,
      internships: InternshipNavigator
    };
    
    this.initialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 Initializing Career Compass Application...');
      
      // Add utility styles and animations
      utils.addAnimationStyles();
      
      // Initialize core modules
      await this.initializeModules();
      
      // Setup global event listeners
      this.setupGlobalEventListeners();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Setup accessibility features
      this.setupAccessibilityFeatures();
      
      // Setup error handling
      this.setupErrorHandling();
      
      this.initialized = true;
      
      console.log('✅ Career Compass Application initialized successfully');
      
      // Show welcome message for new users
      this.showWelcomeMessage();
      
    } catch (error) {
      console.error('❌ Failed to initialize Career Compass Application:', error);
      utils.showAlert('Application initialization failed. Please refresh the page.', 'error');
    }
  }

  /**
   * Initialize all application modules
   */
  async initializeModules() {
    const currentPage = window.location.pathname;
    
    // Always initialize navigation and utils
    Navigation.init();
    
    // Initialize page-specific modules
    if (currentPage.includes('quiz.html')) {
      QuizCalculator.init();
    }
    
    if (currentPage.includes('science.html') || 
        currentPage.includes('math.html') || 
        currentPage.includes('tech_eng.html')) {
      ProfileManager.init();
    }
    
    // Always initialize internships (for home page)
    InternshipNavigator.init();
    
    console.log('📦 All modules initialized for page:', currentPage);
  }

  /**
   * Setup global event listeners
   */
  setupGlobalEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });

    // Handle online/offline status
    window.addEventListener('online', () => {
      utils.showAlert('Connection restored!', 'success');
    });

    window.addEventListener('offline', () => {
      utils.showAlert('You are offline. Some features may not work.', 'warning');
    });

    // Handle window resize for responsive adjustments
    window.addEventListener('resize', utils.debounce(() => {
      this.handleWindowResize();
    }, 250));

    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleGlobalKeydown(e);
    });

    // Handle unload for cleanup
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor page load performance
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          
          const metrics = {
            loadTime: perfData.loadEventEnd - perfData.fetchStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
            firstContentfulPaint: this.getFirstContentfulPaint(),
            timestamp: new Date().toISOString()
          };
          
          console.log('📊 Performance Metrics:', metrics);
          utils.storage.set('lastPerformanceMetrics', metrics);
        }, 0);
      });
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('⚠️ High memory usage detected');
        }
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Get First Contentful Paint metric
   */
  getFirstContentfulPaint() {
    const fcpEntry = performance.getEntriesByType('paint')
      .find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : null;
  }

  /**
   * Setup accessibility features
   */
  setupAccessibilityFeatures() {
    // Enhance focus management
    document.addEventListener('focusin', (e) => {
      e.target.classList.add('focused');
    });

    document.addEventListener('focusout', (e) => {
      e.target.classList.remove('focused');
    });

    // Add skip links for keyboard navigation
    this.addSkipLinks();

    // Setup reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }

    // Setup high contrast preferences
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.documentElement.classList.add('high-contrast');
    }
  }

  /**
   * Add skip links for accessibility
   */
  addSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 10000;
      }
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--text-dark);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
      }
      .skip-link:focus {
        top: 6px;
      }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      
      // Store error for debugging
      const errorData = {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      const errors = utils.storage.get('errorLog') || [];
      errors.push(errorData);
      
      // Keep only last 10 errors
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }
      
      utils.storage.set('errorLog', errors);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      
      // Store promise rejection for debugging
      const rejectionData = {
        reason: e.reason?.toString(),
        timestamp: new Date().toISOString(),
        url: window.location.href
      };
      
      const rejections = utils.storage.get('rejectionLog') || [];
      rejections.push(rejectionData);
      
      // Keep only last 10 rejections
      if (rejections.length > 10) {
        rejections.splice(0, rejections.length - 10);
      }
      
      utils.storage.set('rejectionLog', rejections);
    });
  }

  /**
   * Handle global keyboard shortcuts
   */
  handleGlobalKeydown(e) {
    // Help modal (F1 or Ctrl+?)
    if (e.key === 'F1' || (e.ctrlKey && e.key === '/')) {
      e.preventDefault();
      this.showHelpModal();
    }

    // Search (Ctrl+K)
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      this.focusSearch();
    }

    // Home page (Alt+H)
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      utils.navigateTo('index.html');
    }
  }

  /**
   * Show help modal
   */
  showHelpModal() {
    const helpContent = `
      Career Compass Help
      
      Keyboard Shortcuts:
      • F1 or Ctrl+/ - Show this help
      • Escape - Close modals/profiles
      • Alt+H - Go to home page
      • Arrow keys - Navigate between profiles
      • Enter/Space - Activate buttons
      
      Features:
      • Take our career assessment quiz
      • Connect with expert mentors
      • Find internship opportunities
      • Get personalized career guidance
      
      Need more help? Contact us through the expert profiles!
    `;
    
    alert(helpContent); // Could be enhanced with a proper modal
  }

  /**
   * Focus search functionality
   */
  focusSearch() {
    const searchInput = document.querySelector('input[type="search"], #career');
    if (searchInput) {
      searchInput.focus();
    }
  }

  /**
   * Handle page becoming hidden
   */
  handlePageHidden() {
    // Pause any animations or timers
    console.log('📱 Page hidden - pausing non-essential activities');
  }

  /**
   * Handle page becoming visible
   */
  handlePageVisible() {
    // Resume animations or timers
    console.log('📱 Page visible - resuming activities');
  }

  /**
   * Handle window resize
   */
  handleWindowResize() {
    // Update any size-dependent calculations
    console.log('📐 Window resized to:', window.innerWidth, 'x', window.innerHeight);
  }

  /**
   * Show welcome message for new users
   */
  showWelcomeMessage() {
    const hasVisited = utils.storage.get('hasVisited');
    
    if (!hasVisited) {
      setTimeout(() => {
        utils.showAlert(
          'Welcome to Career Compass! Discover your STEM career path today. 🌟',
          'info'
        );
        utils.storage.set('hasVisited', true);
      }, 1000);
    }
  }

  /**
   * Cleanup function
   */
  cleanup() {
    console.log('🧹 Cleaning up Career Compass Application...');
    
    // Store session data
    const sessionData = {
      endTime: new Date().toISOString(),
      duration: Date.now() - this.startTime,
      page: window.location.pathname
    };
    
    utils.storage.set('lastSession', sessionData);
  }

  /**
   * Get application statistics
   */
  getStats() {
    return {
      performance: utils.storage.get('lastPerformanceMetrics'),
      profileStats: ProfileManager.getProfileStats?.() || {},
      internshipStats: InternshipNavigator.getInternshipStats?.() || {},
      quizResults: utils.storage.get('lastQuizResult'),
      errors: utils.storage.get('errorLog') || [],
      sessions: utils.storage.get('lastSession')
    };
  }
}

// Initialize the application when DOM is loaded
const app = new CareerCompassApp();

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// Make app available globally for debugging
window.CareerCompass = app;

// Export for module usage
export default CareerCompassApp;
