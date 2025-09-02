/**
 * Career Compass - Internship Module
 * Handles internship navigation and tracking
 */

import { utils } from './utils.js';

export const InternshipNavigator = {
  /**
   * Navigation URLs for different internship opportunities
   */
  urls: {
    cuny: "https://www.cuny.edu/about/administration/offices/ocip/students/careerlaunch/",
    metro: "https://www.linkedin.com/jobs/view/3894464535/",
    microsoft: "https://www.linkedin.com/jobs/view/3910635594/",
    refugee: "https://www.google.com/search?q=asylum+seeker+internship"
  },

  /**
   * Internship details for better user experience
   */
  details: {
    cuny: {
      title: "CUNY Career Launch Program Summer 2024",
      organization: "City University of New York",
      type: "Career Development Program",
      duration: "Summer 2024",
      eligibility: "CUNY Students",
      description: "Comprehensive career development program for CUNY students"
    },
    metro: {
      title: "MetroPlusHealth Summer Internship: Telecommunications",
      organization: "MetroPlusHealth",
      type: "Technical Internship",
      location: "New York",
      duration: "Summer 2024",
      description: "Hands-on telecommunications experience in healthcare technology"
    },
    microsoft: {
      title: "Research Intern",
      organization: "Microsoft",
      type: "Research Internship",
      duration: "Variable",
      description: "Research opportunities in cutting-edge technology at Microsoft"
    },
    refugee: {
      title: "Refugee Resettlement Intern - Summer 2024",
      organization: "Various NGOs",
      type: "Social Impact Internship",
      duration: "Summer 2024",
      description: "Support refugees and asylum seekers in their resettlement journey"
    }
  },

  /**
   * Initialize internship functionality
   */
  init() {
    this.setupInternshipCards();
    this.setupAnalytics();
  },

  /**
   * Navigate to internship opportunity with enhanced UX
   * @param {string} type - The internship type
   */
  navigateToInternship(type) {
    const url = this.urls[type];
    const details = this.details[type];
    
    if (!url) {
      console.error(`Unknown internship type: ${type}`);
      utils.showAlert('Internship link not found. Please try again.', 'error');
      return;
    }

    // Show confirmation dialog with internship details
    if (details) {
      const shouldNavigate = this.showInternshipModal(details, url);
      if (!shouldNavigate) return;
    }

    // Track click for analytics
    this.trackInternshipClick(type);
    
    // Open in new tab for better UX
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        // Popup blocked, show user-friendly message
        utils.showAlert(
          'Popup blocked! Please allow popups for this site or click the link again.',
          'warning'
        );
        // Fallback to same tab navigation
        setTimeout(() => utils.navigateTo(url), 1000);
      } else {
        // Success feedback
        utils.showAlert(`Opening ${details?.title || 'internship page'}...`, 'success');
      }
    } catch (error) {
      console.error('Failed to open internship link:', error);
      // Fallback to same tab navigation
      utils.navigateTo(url);
    }
  },

  /**
   * Show internship details modal before navigation
   * @param {Object} details - Internship details
   * @param {string} url - Internship URL
   * @returns {boolean} Whether user wants to proceed
   */
  showInternshipModal(details, url) {
    return confirm(
      `${details.title}\n\n` +
      `Organization: ${details.organization}\n` +
      `Type: ${details.type}\n` +
      `${details.location ? `Location: ${details.location}\n` : ''}` +
      `${details.duration ? `Duration: ${details.duration}\n` : ''}` +
      `\n${details.description}\n\n` +
      `Would you like to visit this opportunity?`
    );
  },

  /**
   * Setup enhanced internship cards with better interactions
   */
  setupInternshipCards() {
    document.querySelectorAll('.interntext').forEach((button, index) => {
      const types = ['cuny', 'metro', 'microsoft', 'refugee'];
      const type = types[index];
      
      if (!type) return;
      
      // Add enhanced hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.02)';
        this.showInternshipPreview(button, this.details[type]);
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        this.hideInternshipPreview(button);
      });
      
      // Add keyboard navigation
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.navigateToInternship(type);
        }
      });
      
      // Add focus styles
      button.addEventListener('focus', () => {
        button.style.outline = '3px solid var(--secondary-color)';
        button.style.outlineOffset = '2px';
      });
      
      button.addEventListener('blur', () => {
        button.style.outline = 'none';
      });
    });
  },

  /**
   * Show internship preview on hover
   * @param {HTMLElement} button - The button element
   * @param {Object} details - Internship details
   */
  showInternshipPreview(button, details) {
    // Create tooltip if it doesn't exist
    let tooltip = button.querySelector('.internship-tooltip');
    
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'internship-tooltip';
      tooltip.innerHTML = `
        <div class="tooltip-content">
          <strong>${details.organization}</strong>
          <p>${details.type}</p>
          <small>${details.duration || 'Duration varies'}</small>
        </div>
      `;
      
      // Add tooltip styles
      tooltip.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--text-dark);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        margin-bottom: 5px;
      `;
      
      button.style.position = 'relative';
      button.appendChild(tooltip);
    }
    
    // Show tooltip
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 200);
  },

  /**
   * Hide internship preview
   * @param {HTMLElement} button - The button element
   */
  hideInternshipPreview(button) {
    const tooltip = button.querySelector('.internship-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  },

  /**
   * Track internship clicks for analytics
   * @param {string} type - The internship type
   */
  trackInternshipClick(type) {
    const interaction = {
      type: 'internship_click',
      internshipType: type,
      internshipTitle: this.details[type]?.title || type,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    // Store interaction data
    const interactions = utils.storage.get('internshipInteractions') || [];
    interactions.push(interaction);
    
    // Keep only last 100 interactions
    if (interactions.length > 100) {
      interactions.splice(0, interactions.length - 100);
    }
    
    utils.storage.set('internshipInteractions', interactions);
    
    console.log(`Internship clicked: ${type}`, interaction);
    
    // Send to analytics service if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'internship_click', {
        'internship_type': type,
        'internship_title': this.details[type]?.title
      });
    }
  },

  /**
   * Setup analytics and tracking
   */
  setupAnalytics() {
    // Track page views for internship pages
    const pageView = {
      type: 'page_view',
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    const pageViews = utils.storage.get('pageViews') || [];
    pageViews.push(pageView);
    
    // Keep only last 50 page views
    if (pageViews.length > 50) {
      pageViews.splice(0, pageViews.length - 50);
    }
    
    utils.storage.set('pageViews', pageViews);
  },

  /**
   * Get internship interaction statistics
   * @returns {Object} Statistics about internship interactions
   */
  getInternshipStats() {
    const interactions = utils.storage.get('internshipInteractions') || [];
    
    const stats = {
      totalClicks: interactions.length,
      clicksByType: {},
      popularTimes: {},
      clicksByDay: {}
    };
    
    interactions.forEach(interaction => {
      // Count by type
      stats.clicksByType[interaction.internshipType] = 
        (stats.clicksByType[interaction.internshipType] || 0) + 1;
      
      // Count by hour
      const hour = new Date(interaction.timestamp).getHours();
      stats.popularTimes[hour] = (stats.popularTimes[hour] || 0) + 1;
      
      // Count by day
      const day = new Date(interaction.timestamp).toDateString();
      stats.clicksByDay[day] = (stats.clicksByDay[day] || 0) + 1;
    });
    
    return stats;
  }
};

// Make individual internship functions globally available for HTML onclick handlers
window.CCintern = () => InternshipNavigator.navigateToInternship('cuny');
window.MMintern = () => InternshipNavigator.navigateToInternship('metro');
window.MSIntern = () => InternshipNavigator.navigateToInternship('microsoft');
window.RefugeeIntern = () => InternshipNavigator.navigateToInternship('refugee');
