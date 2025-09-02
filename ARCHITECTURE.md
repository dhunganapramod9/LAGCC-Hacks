# Career Compass - Architecture Documentation

## 📁 Project Structure

```
career-compass/
├── 📄 index.html              # Main landing page
├── 📁 pages/                  # Individual page components
│   ├── quiz.html             # Career assessment quiz
│   ├── science.html          # Biology career path
│   ├── math.html             # Mathematics career path
│   └── tech_eng.html         # Technology/Engineering career path
├── 📁 css/                   # Modular stylesheets
│   ├── main.css              # Main stylesheet (imports all modules)
│   ├── variables.css         # CSS custom properties
│   ├── reset.css             # CSS reset and base styles
│   ├── typography.css        # Typography system
│   ├── layout.css            # Layout utilities and components
│   ├── components.css        # Reusable UI components
│   ├── header.css            # Header and navigation styles
│   ├── pages.css             # Page-specific styles
│   └── responsive.css        # Responsive design and media queries
├── 📁 js/                    # Modular JavaScript
│   ├── main.js               # Application entry point
│   ├── utils.js              # Utility functions
│   ├── navigation.js         # Navigation and routing
│   ├── quiz.js               # Quiz logic and calculations
│   ├── profiles.js           # Expert profile interactions
│   └── internships.js        # Internship navigation
├── 📁 images/                # Optimized images
│   ├── major.png             # Career choice illustration
│   ├── assylee.jpg           # Quiz header image
│   ├── Pramod.jpg            # Expert profile photos
│   ├── Ryan.jpg
│   └── ayush.jpg
├── 📁 fonts/                 # Custom font files
│   ├── coolvetica.otf        # Display font
│   └── Poppins-Bold.ttf      # Bold weight
├── 📁 components/            # Reusable HTML components (future)
├── 📁 assets/                # Additional assets (future)
├── 📄 package.json           # Node.js dependencies and scripts
├── 📄 .gitignore             # Git ignore patterns
├── 📄 README.md              # Project documentation
└── 📄 ARCHITECTURE.md        # This file
```

## 🏗️ Architecture Principles

### 1. **Modular Design**
- **CSS Modules**: Separated by functionality (layout, components, typography)
- **JavaScript Modules**: ES6 modules with clear separation of concerns
- **HTML Components**: Semantic structure with reusable patterns

### 2. **Performance Optimization**
- **CSS**: Custom properties for consistent theming
- **JavaScript**: ES6 modules for tree-shaking
- **Images**: Optimized and properly sized
- **Fonts**: Preloaded with font-display: swap

### 3. **Accessibility First**
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Comprehensive alt texts and descriptions
- **Focus Management**: Visible focus indicators

### 4. **Responsive Design**
- **Mobile-First**: Progressive enhancement approach
- **Flexible Layouts**: CSS Grid and Flexbox
- **Scalable Typography**: Fluid type scales with clamp()
- **Touch-Friendly**: Appropriate touch targets

## 🔧 Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with ARIA accessibility
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+**: Modules, async/await, modern syntax
- **Progressive Enhancement**: Works without JavaScript

### Development Tools
- **Live Server**: Development server with hot reload
- **ESLint**: JavaScript linting and code quality
- **Prettier**: Code formatting and consistency
- **HTML Validate**: HTML validation and best practices

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet

## 📦 CSS Architecture

### Design System
```css
:root {
  /* Color Palette */
  --primary-color: #006994;      /* Ocean Blue */
  --secondary-color: #ab78ba;    /* Lavender */
  --accent-color: #264348;       /* Dark Teal */
  
  /* Typography Scale */
  --font-primary: 'Poppins', sans-serif;
  --font-display: 'Coolvetica', sans-serif;
  
  /* Spacing System */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-xxl: 3rem;    /* 48px */
}
```

### Component Structure
- **Utility Classes**: Spacing, typography, layout helpers
- **Component Classes**: Buttons, cards, forms, modals
- **Layout Classes**: Grid systems, containers, sections
- **State Classes**: Active, focused, disabled, loading

## 🧩 JavaScript Architecture

### Module Organization
```javascript
// main.js - Application orchestrator
class CareerCompassApp {
  constructor() {
    this.modules = {
      utils,           // Utility functions
      navigation,      // Routing and navigation
      quiz,           // Career assessment logic
      profiles,       // Expert profile interactions
      internships     // Internship management
    };
  }
}
```

### Design Patterns
- **Module Pattern**: Encapsulated functionality
- **Observer Pattern**: Event-driven interactions
- **Factory Pattern**: Component creation
- **Singleton Pattern**: Application state management

### Error Handling
- **Global Error Handling**: Centralized error logging
- **Graceful Degradation**: Fallbacks for failed operations
- **User Feedback**: Clear error messages and recovery options
- **Analytics**: Error tracking for debugging

## 🎯 Features Architecture

### 1. **Career Assessment Quiz**
```javascript
// Quiz flow and scoring system
QuizCalculator {
  answerMapping: { 1: 'M', 2: 'S', 3: 'T' },
  calculate() → determineResult() → navigateToResult()
}
```

### 2. **Expert Profiles**
```javascript
// Interactive profile system
ProfileManager {
  toggleProfile() → expandProfile() → trackInteraction()
}
```

### 3. **Internship Navigator**
```javascript
// Enhanced internship discovery
InternshipNavigator {
  navigateToInternship() → showModal() → trackClick()
}
```

## 🔄 Data Flow

### User Interactions
1. **User Action** (click, form submission)
2. **Event Handler** (JavaScript module)
3. **Data Processing** (validation, calculation)
4. **State Update** (localStorage, DOM update)
5. **User Feedback** (navigation, alerts, animations)

### Analytics Tracking
- **User Interactions**: Quiz completion, profile views, internship clicks
- **Performance Metrics**: Load times, error rates
- **Local Storage**: Client-side analytics without server dependencies

## 🚀 Deployment Architecture

### Static Hosting Ready
- **No Server Dependencies**: Pure client-side application
- **CDN Optimized**: Minimal external dependencies
- **Fast Loading**: Optimized assets and lazy loading
- **SEO Friendly**: Semantic HTML and meta tags

### Hosting Options
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Automatic deployments with form handling
- **Vercel**: Performance-optimized hosting
- **Traditional Web Hosting**: Any static file server

## 🔮 Future Enhancements

### Planned Features
- **Backend Integration**: User accounts and progress tracking
- **AI-Powered Recommendations**: Enhanced career matching
- **Multilingual Support**: Internationalization system
- **Advanced Analytics**: User journey tracking
- **Progressive Web App**: Offline functionality

### Technical Improvements
- **Build System**: Webpack/Vite for optimization
- **Testing Framework**: Jest for unit testing
- **Component Library**: Reusable UI components
- **API Integration**: External career data sources

## 📊 Performance Targets

### Core Web Vitals
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Accessibility Goals
- **WCAG 2.1 AA Compliance**: Full accessibility support
- **Keyboard Navigation**: 100% keyboard accessible
- **Screen Reader Support**: Comprehensive ARIA implementation
- **Mobile Accessibility**: Touch-friendly interactions

---

*This architecture supports the mission of Career Compass: empowering asylum seekers through accessible, modern web technology and thoughtful user experience design.*
