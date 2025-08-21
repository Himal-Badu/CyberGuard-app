# CyberGuard - Cybersecurity Education Tool

## Overview
CyberGuard is a modern, interactive cybersecurity education tool created by Himal Badu, a 16-year-old cybersecurity enthusiast. The application helps users understand password security, demonstrates brute force attacks, and provides comprehensive cybersecurity education through interactive features.

## Features

### 🔐 Password Strength Tester
- Real-time password analysis with detailed feedback
- Security metrics including length, entropy, and crack time estimates
- Visual strength indicator with color-coded ratings
- Secure password generator with customizable options
- Recommendations for improving password security

### ⚡ Brute Force Attack Simulator
- Educational demonstration of how brute force attacks work
- **User-defined target passwords** - Set your own password to crack
- **Crack time estimation** - Shows estimated time to crack before starting
- Real-time attack progress visualization
- Statistics showing attempts per second and estimated completion time
- Different behavior for strong vs weak passwords

### 📚 Cybersecurity Education Hub
- **Interactive Lessons**: Comprehensive modules covering:
  - Password Security Fundamentals (5 min, Beginner level)
  - Understanding Brute Force Attacks (7 min, Intermediate level)
- **Knowledge Quiz**: Interactive quiz to test understanding
- Progress tracking with completion markers
- Best practices and security recommendations

### 🎨 Modern Design Features
- Animated gradient background with cybersecurity-themed imagery
- Floating shield icon with glow effects
- Smooth transitions and hover animations
- Responsive design for all devices
- Professional color scheme with blue/purple gradients
- Glass-morphism effects with backdrop blur

## Technology Stack

### Frontend
- **React 18** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Shadcn/UI** components for consistent design
- **Lucide React** icons for modern iconography

### Key Files Structure
```
src/
├── components/
│   ├── PasswordTester.jsx      # Password analysis component
│   ├── BruteForceSimulator.jsx # Brute force simulation with crack time estimation
│   ├── EducationHub.jsx        # Learning modules and quiz
│   └── ui/                     # Shadcn/UI components
├── lib/
│   ├── passwordAnalyzer.js     # Core password strength calculation logic
│   └── utils.js               # Utility functions
├── assets/
│   └── hero-bg.png            # Generated cybersecurity background image
├── App.jsx                    # Main application component
├── App.css                    # Custom styles and animations
└── main.jsx                   # Application entry point
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Local Development
1. Extract the source code files
2. Navigate to the project directory:
   ```bash
   cd cybersecurity-tool
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

### Production Build
```bash
npm run build
# or
pnpm run build
```

The built files will be available in the `dist/` directory.

## Key Components Explained

### Password Analyzer (`src/lib/passwordAnalyzer.js`)
- Calculates password strength based on multiple factors
- Estimates crack time using character set complexity
- Provides detailed security metrics and recommendations

### Brute Force Simulator (`src/components/BruteForceSimulator.jsx`)
- **Enhanced Features**:
  - User can set custom target passwords
  - "Estimate Crack Time" button analyzes password before attack
  - Shows whether password is "Strong" or "Weak"
  - Displays estimated crack time (from seconds to decades)
  - Different simulation speeds for strong vs weak passwords
- Educational simulation of brute force attacks
- Real-time progress tracking and statistics

### Password Tester (`src/components/PasswordTester.jsx`)
- Real-time password strength analysis
- Visual feedback with color-coded strength indicators
- Detailed security metrics and recommendations
- Secure password generator

### Education Hub (`src/components/EducationHub.jsx`)
- Interactive learning modules
- Knowledge quiz with immediate feedback
- Progress tracking system

## Styling & Design

### Custom CSS (`src/App.css`)
- Hero background with animated gradients
- Floating animations for icons
- Pulse-glow effects for cybersecurity aesthetic
- Responsive design utilities
- Glass-morphism effects

### Color Scheme
- Primary: Blue gradient (#3b82f6 to #1e40af)
- Secondary: Purple accents (#8b5cf6)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)

## Educational Value

The application serves as an excellent educational tool for:
- Understanding password security fundamentals
- Learning about cybersecurity threats and attack methods
- Practicing secure password creation
- Testing knowledge through interactive quizzes
- Visualizing attack methods in a safe environment
- Understanding the time complexity of brute force attacks

## Creator Information

**Himal Badu** - 16-year-old cybersecurity enthusiast
- X (Twitter): https://x.com/himal_badu666
- Passionate about making cybersecurity education accessible
- Committed to helping people understand security best practices

## Deployment

The application is deployed using modern web hosting platforms and can be easily deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Security Considerations

- This tool is designed for **educational purposes only**
- The brute force simulator is a simplified demonstration
- Always follow your organization's security policies
- Use official security tools for production environments
- The application does not store or transmit any passwords

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## Performance

- Optimized build with Vite
- Lazy loading for components
- Efficient animations using CSS transforms
- Responsive images and assets

## Contributing

This project was created as an educational tool. If you'd like to contribute or suggest improvements, please reach out to Himal Badu via his X account.

## License

This project is created for educational purposes. Please respect the creator's work and give appropriate credit when using or referencing this code.

---

**Made with ❤️ by Himal Badu - A young cybersecurity enthusiast making security education accessible to everyone.**

