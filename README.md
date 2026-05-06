# Anju's Birthday Surprise Website

A romantic, mobile-first birthday surprise website created with React, TypeScript, and Tailwind CSS.

## Features

- **Mobile-First Design**: Optimized for smartphones with responsive layout
- **Romantic Aesthetic**: Pastel pink and lavender color palette with elegant fonts
- **Interactive Elements**: Smooth animations, floating hearts, and engaging interactions
- **Personal Touch**: Customizable content for a heartfelt birthday message
- **Background Music**: Optional autoplay music with mute/unmute controls
- **Heart Cursor**: Custom heart-shaped cursor for added charm

## Sections

1. **Landing Page**: Welcome message with "Start the Surprise" button
2. **Memory Timeline**: Scroll-based story of shared memories
3. **Video Message**: Embedded video player for personal messages
4. **Love Letter**: Animated typing effect for a romantic letter
5. **Gift Reveal**: Interactive gift opening animation
6. **Interactive Quiz**: Fun questions to test knowledge of each other
7. **Future Wishes**: List of hopes for the future

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

### Build for Production

```bash
npm run build
```

## Customization

- **Content**: Update the text, images, and videos in `src/App.tsx`
- **Colors**: Modify the Tailwind classes for different color schemes
- **Music**: Replace the placeholder audio source with your chosen song
- **Images**: Add personal photos to the `public` folder and update image paths

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Google Fonts** (Dancing Script) for elegant typography

## Deployment

The built files in the `dist` folder can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## License

This project is created for personal use. Feel free to adapt it for your own romantic surprises!
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
