/**
 * Career Compass - Quiz Module
 * Handles career assessment quiz logic
 */

import { utils } from './utils.js';

// Career paths mapping
const CAREER_PATHS = {
  'S': 'pages/science.html',
  'T': 'pages/tech_eng.html', 
  'M': 'pages/math.html'
};

export const QuizCalculator = {
  // Question mapping to career fields
  answerMapping: {
    1: 'M', // Mathematics
    2: 'S', // Science
    3: 'T'  // Technology/Engineering
  },

  /**
   * Initialize quiz functionality
   */
  init() {
    this.setupQuizValidation();
    this.setupProgressTracking();
  },

  /**
   * Calculate quiz results based on user answers
   */
  calculate() {
    const scores = { S: 0, T: 0, M: 0 };
    const totalQuestions = 9;
    let answeredQuestions = 0;
    const answers = {};

    // Process each question
    for (let i = 1; i <= totalQuestions; i++) {
      const questionElement = utils.getElement(`Q${i}`);
      
      if (!questionElement) {
        console.warn(`Question Q${i} not found`);
        continue;
      }

      const selectedIndex = questionElement.selectedIndex;
      
      if (selectedIndex > 0) { // 0 is the default option
        answeredQuestions++;
        const careerField = this.answerMapping[selectedIndex];
        answers[`Q${i}`] = selectedIndex;
        
        if (careerField && scores.hasOwnProperty(careerField)) {
          scores[careerField]++;
        }
      }
    }

    // Validate that user answered questions
    if (answeredQuestions === 0) {
      utils.showAlert("Please answer the questions!", 'warning');
      this.highlightUnansweredQuestions();
      return;
    }

    // Show completion progress
    const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
    
    if (completionPercentage < 70) {
      const shouldContinue = confirm(
        `You've only answered ${completionPercentage}% of the questions. ` +
        "Would you like to continue anyway for a more accurate result?"
      );
      
      if (!shouldContinue) {
        this.highlightUnansweredQuestions();
        return;
      }
    }

    // Store quiz results for analytics
    const quizResult = {
      scores,
      answers,
      completionPercentage,
      timestamp: new Date().toISOString()
    };
    
    utils.storage.set('lastQuizResult', quizResult);

    // Determine the career path with highest score
    const result = this.determineResult(scores);
    
    // Show results with animation
    this.showResultsAnimation(result, scores);
    
    // Navigate to result page after animation
    setTimeout(() => {
      const targetPage = CAREER_PATHS[result];
      if (targetPage) {
        utils.navigateTo(targetPage);
      } else {
        console.error('Invalid quiz result:', result);
        utils.showAlert('Quiz calculation error. Please try again.', 'error');
      }
    }, 2000);
  },

  /**
   * Determine the winning career path from scores
   * @param {Object} scores - The career field scores
   * @returns {string} The winning career field code
   */
  determineResult(scores) {
    const { S, T, M } = scores;
    
    // Find the field with the highest score
    if (S > T && S > M) return 'S';
    if (M > S && M > T) return 'M';
    if (T > S && T > M) return 'T';
    
    // Handle ties by looking at secondary factors
    if (S === T && S > M) {
      // Science vs Technology tie - default to Technology for modern job market
      return 'T';
    }
    if (S === M && S > T) {
      // Science vs Math tie - default to Science for broader applications
      return 'S';
    }
    if (T === M && T > S) {
      // Technology vs Math tie - default to Technology
      return 'T';
    }
    
    // All tied or all zero - default to Technology/Engineering
    return 'T';
  },

  /**
   * Show animated results before navigation
   * @param {string} result - The career field result
   * @param {Object} scores - The detailed scores
   */
  showResultsAnimation(result, scores) {
    const resultNames = {
      'S': 'Biology & Life Sciences',
      'T': 'Computer Science & Technology',
      'M': 'Mathematics & Analytics'
    };

    // Create results overlay
    const overlay = document.createElement('div');
    overlay.className = 'quiz-results-overlay';
    overlay.innerHTML = `
      <div class="quiz-results-content">
        <div class="quiz-results-header">
          <h2>🎉 Your Results Are In!</h2>
          <p>Based on your answers, we recommend:</p>
        </div>
        <div class="quiz-results-main">
          <h1 class="result-field">${resultNames[result]}</h1>
          <div class="score-breakdown">
            <div class="score-item ${result === 'S' ? 'winner' : ''}">
              <span class="field-name">Biology</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${(scores.S / Math.max(...Object.values(scores)) * 100) || 0}%"></div>
              </div>
              <span class="score-value">${scores.S}</span>
            </div>
            <div class="score-item ${result === 'T' ? 'winner' : ''}">
              <span class="field-name">Technology</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${(scores.T / Math.max(...Object.values(scores)) * 100) || 0}%"></div>
              </div>
              <span class="score-value">${scores.T}</span>
            </div>
            <div class="score-item ${result === 'M' ? 'winner' : ''}">
              <span class="field-name">Mathematics</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${(scores.M / Math.max(...Object.values(scores)) * 100) || 0}%"></div>
              </div>
              <span class="score-value">${scores.M}</span>
            </div>
          </div>
        </div>
        <div class="quiz-results-footer">
          <p>Redirecting you to learn more about your career path...</p>
        </div>
      </div>
    `;

    // Add styles for the overlay
    const style = document.createElement('style');
    style.textContent = `
      .quiz-results-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 105, 148, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
      }
      .quiz-results-content {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        animation: slideUp 0.6s ease 0.2s both;
      }
      .result-field {
        color: var(--secondary-color, #ab78ba);
        margin: 1rem 0;
        animation: slideUp 0.6s ease 0.8s both;
      }
      .score-breakdown {
        margin: 2rem 0;
        animation: slideUp 0.6s ease 1s both;
      }
      .score-item {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        gap: 1rem;
      }
      .score-item.winner {
        font-weight: bold;
        color: var(--secondary-color, #ab78ba);
      }
      .field-name {
        min-width: 80px;
        text-align: left;
      }
      .score-bar {
        flex: 1;
        height: 20px;
        background: #eee;
        border-radius: 10px;
        overflow: hidden;
      }
      .score-fill {
        height: 100%;
        background: linear-gradient(135deg, var(--secondary-color, #ab78ba), var(--purple, #800080));
        transition: width 1s ease;
        border-radius: 10px;
      }
      .score-value {
        min-width: 30px;
        text-align: right;
        font-weight: bold;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // Remove overlay after animation
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
        style.remove();
      }
    }, 2000);
  },

  /**
   * Highlight unanswered questions for better UX
   */
  highlightUnansweredQuestions() {
    const totalQuestions = 9;
    
    for (let i = 1; i <= totalQuestions; i++) {
      const questionElement = utils.getElement(`Q${i}`);
      const questionGroup = questionElement?.closest('.question-group');
      
      if (questionElement && questionElement.selectedIndex === 0) {
        questionGroup?.classList.add('unanswered');
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          questionGroup?.classList.remove('unanswered');
        }, 3000);
      }
    }

    // Scroll to first unanswered question
    const firstUnanswered = document.querySelector('.question-group.unanswered');
    if (firstUnanswered) {
      utils.scrollTo(firstUnanswered);
    }
  },

  /**
   * Setup real-time quiz validation
   */
  setupQuizValidation() {
    const selects = document.querySelectorAll('select[id^="Q"]');
    
    selects.forEach(select => {
      select.addEventListener('change', () => {
        const questionGroup = select.closest('.question-group');
        questionGroup?.classList.remove('unanswered');
        this.updateProgress();
      });
    });
  },

  /**
   * Setup progress tracking for the quiz
   */
  setupProgressTracking() {
    // Add progress indicator if it doesn't exist
    if (!document.querySelector('.quiz-progress')) {
      const progressBar = document.createElement('div');
      progressBar.className = 'quiz-progress';
      progressBar.innerHTML = `
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <span class="progress-text">0% Complete</span>
      `;
      
      const quizForm = document.querySelector('.quiz-form');
      if (quizForm) {
        quizForm.insertBefore(progressBar, quizForm.firstChild);
      }
    }
  },

  /**
   * Update quiz progress
   */
  updateProgress() {
    const totalQuestions = 9;
    let answeredQuestions = 0;
    
    for (let i = 1; i <= totalQuestions; i++) {
      const questionElement = utils.getElement(`Q${i}`);
      if (questionElement && questionElement.selectedIndex > 0) {
        answeredQuestions++;
      }
    }
    
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
    
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
      progressText.textContent = `${percentage}% Complete`;
    }
  }
};

// Make calculate function globally available for HTML onclick handlers
window.calculate = () => QuizCalculator.calculate();
