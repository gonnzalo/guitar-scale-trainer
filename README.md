# Guitar Scale Trainer

## Overview
Guitar Scale Trainer is a web application designed to help guitarists practice scales and improve their skills. The application provides a user-friendly interface for selecting scales, root notes, CAGED positions, and modes, allowing users to generate random practice combinations.

## Features
- **Scale Selector**: Choose from various scale types, root notes, CAGED positions, and modes with form validation.
- **Practice View**: Displays the current scale combination and allows users to reveal fretboard patterns and generate new combinations.
- **Scale Diagram**: Visual representation of the guitar fretboard, highlighting scale patterns and finger positions.
- **Settings Panel**: Customize the display of note names or intervals, adjust fretboard size, and enable audio playback.

## Project Structure
```
guitar-scale-trainer
├── src
│   ├── components
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
│   │   └── useLocalStorage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
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

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- Use the Scale Selector to choose your desired scale and settings.
- Click "Start Practice" to begin practicing with the generated combinations.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.