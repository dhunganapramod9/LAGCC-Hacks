/**
 * Career Compass - Utility Functions
 * Common utilities used across the application
 */

export const utils = {
  /**
   * Safely get element by ID with error handling
   * @param {string} id - The element ID
   * @returns {HTMLElement|null} The element or null if not found
   */
  getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID '${id}' not found`);
    }
    return element;
  },

  /**
   * Get elements by class name with error handling
   * @param {string} className - The class name
   * @returns {NodeList} List of elements
   */
  getElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    if (elements.length === 0) {
      console.warn(`No elements found with class '${className}'`);
    }
    return elements;
  },

  /**
   * Navigate to URL with error handling
   * @param {string} url - The URL to navigate to
   */
  navigateTo(url) {
    try {
      window.location.href = url;
    } catch (error) {
      console.error('Navigation failed:', error);
      this.showAlert('Navigation error. Please try again.');
    }
  },

  /**
   * Show alert with better UX
   * @param {string} message - The message to display
   * @param {string} type - The type of alert (success, error, warning, info)
   */
  showAlert(message, type = 'info') {
    // Create a better alert system instead of browser alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: var(--secondary-color);
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
      alertDiv.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 300);
    }, 5000);
  },

  /**
   * Debounce function to limit function calls
   * @param {Function} func - The function to debounce
   * @param {number} delay - The delay in milliseconds
   * @returns {Function} The debounced function
   */
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  /**
   * Throttle function to limit function calls
   * @param {Function} func - The function to throttle
   * @param {number} delay - The delay in milliseconds
   * @returns {Function} The throttled function
   */
  throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  },

  /**
   * Check if element is in viewport
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} True if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Smooth scroll to element
   * @param {HTMLElement|string} target - Element or selector to scroll to
   */
  scrollTo(target) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  },

  /**
   * Add CSS animation keyframes if they don't exist
   */
  addAnimationStyles() {
    if (!document.getElementById('career-compass-animations')) {
      const style = document.createElement('style');
      style.id = 'career-compass-animations';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  },

  /**
   * Local storage helper with error handling
   */
  storage: {
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        console.error('Error getting from localStorage:', error);
        return null;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error setting localStorage:', error);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
      }
    }
  }
};
