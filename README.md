# Guitar Scale Trainer

[![PWA](https://img.shields.io/badge/PWA-enabled-blue)](PWA.md)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](TESTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](tsconfig.json)

## Overview

Guitar Scale Trainer is a **Progressive Web App (PWA)** designed to help guitarists practice scales and improve their skills. The application provides a user-friendly interface for selecting scales, root notes, CAGED positions, and modes, allowing users to generate random practice combinations.

## Features

### Core Features

- **Scale Selector**: Choose from various scale types, root notes, CAGED positions, and modes with form validation.
- **Practice View**: Displays the current scale combination and allows users to reveal fretboard patterns and generate new combinations.
- **Scale Diagram**: Visual representation of the guitar fretboard, highlighting scale patterns and finger positions.
- **Settings Panel**: Customize the display of note names or intervals, and toggle finger position numbers.
- **Progress Tracking**: Automatic tracking of practice sessions, scales practiced, and total practice time with the ability to clear statistics.

### Modern Features

- **📱 Progressive Web App**: Install on any device, works offline
- **🌙 Dark Mode**: Toggle between light and dark themes with persistent preferences
- **⌨️ Keyboard Shortcuts**: Space (next), Enter (show/hide pattern)
- **♿ Accessible**: ARIA labels, keyboard navigation, focus management
- **🔄 Error Boundary**: Graceful error handling to ensure a smooth user experience
- **💾 Local Storage**: All settings, practice history, and statistics are automatically saved locally

## Project Structure

```
guitar-scale-trainer
├── src
│   ├── components
│   │   ├── ErrorBoundary.tsx
│   │   ├── ScaleSelector.tsx
│   │   ├── PracticeView.tsx
│   │   ├── ScaleDiagram.tsx
│   │   └── SettingsPanel.tsx
│   ├── types
│   │   ├── scales.ts
│   │   └── index.ts
│   ├── data
│   │   ├── scaleDefinitions.ts
│   │   └── notes.ts
│   ├── utils
│   │   ├── scaleGenerator.ts
│   │   └── localStorageHelper.ts
│   ├── hooks
│   │   ├── useScalePractice.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public
│   └── vite.svg
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/guitar-scale-trainer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd guitar-scale-trainer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Open visual test UI
- `npm run test:coverage` - Generate coverage report

## Technologies

- **React 19** with React Compiler for automatic optimizations
- **TypeScript** for type-safe development
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS v4** for modern, responsive styling
- **Vitest** + **React Testing Library** for comprehensive testing
- **ESLint** + **Prettier** for code quality
- **Local Storage API** for persistent user data

## Testing

The project includes comprehensive unit tests for core functionality:

```bash
# Run tests
npm test

# View coverage
npm run test:coverage

# Visual test UI
npm run test:ui
```

See [TESTING.md](TESTING.md) for more details.

## Deployment

The app can be deployed to various platforms. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Self-hosting

Quick deploy to Vercel:

```bash
npm run build
# Upload dist folder to Vercel
```

## Features in Detail

### Keyboard Shortcuts

- **Space**: Next scale
- **Enter**: Show/Hide pattern

### Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- Dark mode with system preference detection

### Data Persistence

- Settings saved automatically
- Practice history tracked
- Statistics persisted across sessions

## Usage

- Open your browser and navigate to `http://localhost:5173` to access the application.
- Use the Scale Selector to choose your desired scale types, root notes, and CAGED positions.
- Click "Start Practice" to begin practicing with randomly generated combinations.
- Toggle between light and dark mode using the theme button in the header.
- Access Settings to customize display options (intervals vs. note names, finger numbers).
- Track your progress with automatic session statistics and all-time totals.
- Clear your statistics anytime from the practice view.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
