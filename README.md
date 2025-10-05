# Guitar Scale Trainer

## Overview

Guitar Scale Trainer is a web application designed to help guitarists practice scales and improve their skills. The application provides a user-friendly interface for selecting scales, root notes, CAGED positions, and modes, allowing users to generate random practice combinations.

## Features

- **Scale Selector**: Choose from various scale types, root notes, CAGED positions, and modes with form validation.
- **Practice View**: Displays the current scale combination and allows users to reveal fretboard patterns and generate new combinations.
- **Scale Diagram**: Visual representation of the guitar fretboard, highlighting scale patterns and finger positions.
- **Settings Panel**: Customize the display of note names or intervals, and toggle finger position numbers.
- **Progress Tracking**: Automatic tracking of practice sessions, scales practiced, and total practice time with the ability to clear statistics.
- **Dark Mode**: Toggle between light and dark themes with persistent preferences.
- **Error Boundary**: Graceful error handling to ensure a smooth user experience.
- **Local Storage**: All settings, practice history, and statistics are automatically saved locally.

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
   ```
   git clone https://github.com/yourusername/guitar-scale-trainer.git
   ```
2. Navigate to the project directory:
   ```
   cd guitar-scale-trainer
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Technologies

- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive styling with dark mode support
- **Local Storage API** for persistent user data

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
