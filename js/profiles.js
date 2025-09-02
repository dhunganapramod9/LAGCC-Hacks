/**
 * Career Compass - Expert Profiles Module
 * Handles expert profile interactions and animations
 */

import { utils } from './utils.js';

export const ProfileManager = {
  /**
   * Initialize profile functionality
   */
  init() {
    this.setupProfileInteractions();
    this.setupKeyboardNavigation();
    this.setupAccessibility();
  },

  /**
   * Generic profile toggle function with animations
   * @param {string} profileId - The profile element ID
   */
  toggleProfile(profileId) {
    const profile = utils.getElement(profileId);
    
    if (!profile) return;

    // Toggle between expanded and collapsed states
    const isExpanded = profile.classList.contains('expanded');
    
    // Close other profiles first for better UX
    this.closeOtherProfiles(profileId);
    
    if (isExpanded) {
      this.collapseProfile(profile);
    } else {
      this.expandProfile(profile);
    }
    
    // Update analytics
    this.trackProfileInteraction(profileId, !isExpanded);
  },

  /**
   * Expand a profile with animation
   * @param {HTMLElement} profile - The profile element
   */
  expandProfile(profile) {
    profile.classList.remove('collapsed');
    profile.classList.add('expanded');
    profile.setAttribute('aria-expanded', 'true');
    
    // Focus management for accessibility
    const firstFocusable = profile.querySelector('a, button');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 300);
    }
    
    // Scroll into view if needed
    setTimeout(() => {
      if (!utils.isInViewport(profile)) {
        utils.scrollTo(profile);
      }
    }, 100);
  },

  /**
   * Collapse a profile with animation
   * @param {HTMLElement} profile - The profile element
   */
  collapseProfile(profile) {
    profile.classList.remove('expanded');
    profile.classList.add('collapsed');
    profile.setAttribute('aria-expanded', 'false');
  },

  /**
   * Close other profiles when one is opened
   * @param {string} currentProfileId - The currently opening profile ID
   */
  closeOtherProfiles(currentProfileId) {
    ['p1', 'p2', 'p3'].forEach(profileId => {
      if (profileId !== currentProfileId) {
        const profile = utils.getElement(profileId);
        if (profile && profile.classList.contains('expanded')) {
          this.collapseProfile(profile);
        }
      }
    });
  },

  /**
   * Setup profile button interactions
   */
  setupProfileInteractions() {
    // Setup click handlers for profile buttons
    document.querySelectorAll('.pfpLink').forEach((button, index) => {
      const profileId = `p${index + 1}`;
      
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleProfile(profileId);
      });
      
      // Add hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
      });
    });
    
    // Setup email link interactions
    document.querySelectorAll('.emails').forEach(emailLink => {
      emailLink.addEventListener('click', (e) => {
        // Track email interactions
        const email = emailLink.href.replace('mailto:', '');
        this.trackEmailClick(email);
        
        // Add visual feedback
        emailLink.style.transform = 'scale(0.95)';
        setTimeout(() => {
          emailLink.style.transform = 'scale(1)';
        }, 150);
      });
    });
  },

  /**
   * Setup keyboard navigation for profiles
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Escape':
          // Close all open profiles
          this.closeAllProfiles();
          break;
          
        case 'ArrowLeft':
        case 'ArrowRight':
          if (e.target.classList.contains('pfpLink')) {
            e.preventDefault();
            this.navigateProfiles(e.key === 'ArrowRight' ? 1 : -1);
          }
          break;
          
        case 'Enter':
        case ' ':
          if (e.target.classList.contains('pfpLink')) {
            e.preventDefault();
            const profileIndex = Array.from(document.querySelectorAll('.pfpLink')).indexOf(e.target);
            this.toggleProfile(`p${profileIndex + 1}`);
          }
          break;
      }
    });
  },

  /**
   * Navigate between profiles using keyboard
   * @param {number} direction - 1 for next, -1 for previous
   */
  navigateProfiles(direction) {
    const buttons = Array.from(document.querySelectorAll('.pfpLink'));
    const currentIndex = buttons.findIndex(button => button === document.activeElement);
    
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex + direction;
    
    // Wrap around
    if (nextIndex >= buttons.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = buttons.length - 1;
    
    buttons[nextIndex].focus();
  },

  /**
   * Close all open profiles
   */
  closeAllProfiles() {
    ['p1', 'p2', 'p3'].forEach(profileId => {
      const profile = utils.getElement(profileId);
      if (profile && profile.classList.contains('expanded')) {
        this.collapseProfile(profile);
      }
    });
  },

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Add ARIA labels and descriptions
    document.querySelectorAll('.pfpLink').forEach((button, index) => {
      const profileId = `p${index + 1}`;
      const expertName = button.closest('.experts')?.querySelector('h3')?.textContent || `Expert ${index + 1}`;
      
      button.setAttribute('aria-label', `View profile of ${expertName}`);
      button.setAttribute('aria-describedby', profileId);
      button.setAttribute('aria-expanded', 'false');
    });
    
    // Add role descriptions for screen readers
    document.querySelectorAll('.expand-container').forEach(container => {
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', 'Expert profile details');
    });
  },

  /**
   * Track profile interactions for analytics
   * @param {string} profileId - The profile ID
   * @param {boolean} expanded - Whether the profile was expanded
   */
  trackProfileInteraction(profileId, expanded) {
    const interaction = {
      profileId,
      action: expanded ? 'expand' : 'collapse',
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };
    
    // Store interaction data
    const interactions = utils.storage.get('profileInteractions') || [];
    interactions.push(interaction);
    
    // Keep only last 50 interactions
    if (interactions.length > 50) {
      interactions.splice(0, interactions.length - 50);
    }
    
    utils.storage.set('profileInteractions', interactions);
    
    console.log('Profile interaction tracked:', interaction);
  },

  /**
   * Track email clicks for analytics
   * @param {string} email - The email address
   */
  trackEmailClick(email) {
    const interaction = {
      type: 'email_click',
      email,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };
    
    // Store email interactions
    const emailInteractions = utils.storage.get('emailInteractions') || [];
    emailInteractions.push(interaction);
    
    // Keep only last 20 email interactions
    if (emailInteractions.length > 20) {
      emailInteractions.splice(0, emailInteractions.length - 20);
    }
    
    utils.storage.set('emailInteractions', emailInteractions);
    
    console.log('Email interaction tracked:', interaction);
  },

  /**
   * Get profile interaction statistics
   * @returns {Object} Statistics about profile interactions
   */
  getProfileStats() {
    const interactions = utils.storage.get('profileInteractions') || [];
    const emailInteractions = utils.storage.get('emailInteractions') || [];
    
    const stats = {
      totalProfileViews: interactions.filter(i => i.action === 'expand').length,
      totalEmailClicks: emailInteractions.length,
      mostViewedProfile: null,
      profileViewCounts: {}
    };
    
    // Calculate profile view counts
    interactions.forEach(interaction => {
      if (interaction.action === 'expand') {
        stats.profileViewCounts[interaction.profileId] = 
          (stats.profileViewCounts[interaction.profileId] || 0) + 1;
      }
    });
    
    // Find most viewed profile
    if (Object.keys(stats.profileViewCounts).length > 0) {
      stats.mostViewedProfile = Object.keys(stats.profileViewCounts).reduce((a, b) => 
        stats.profileViewCounts[a] > stats.profileViewCounts[b] ? a : b
      );
    }
    
    return stats;
  }
};

// Make individual profile functions globally available for HTML onclick handlers
window.p1 = () => ProfileManager.toggleProfile('p1');
window.p2 = () => ProfileManager.toggleProfile('p2');
window.p3 = () => ProfileManager.toggleProfile('p3');
