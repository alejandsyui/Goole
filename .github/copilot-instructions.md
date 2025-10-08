# GitHub Copilot Instructions for Goole (Pixshop)

## Project Overview

This is **Pixshop**, an AI-powered photo editing web application built with React, TypeScript, and Vite. The app uses Google's Gemini AI (gemini-2.5-flash-image model) to perform intelligent image editing tasks including:
- **Retouch**: Localized edits at specific points on an image
- **Filters**: Apply creative stylistic filters to entire images
- **Adjustments**: Professional photo adjustments (lighting, blur, enhancement)
- **Crop**: Standard image cropping functionality

## Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Service**: Google Gemini AI (@google/genai)
- **Image Processing**: react-image-crop for cropping functionality
- **Styling**: Tailwind CSS (loaded via CDN)
- **Module System**: ES Modules with import maps in index.html

## Development Setup

### Prerequisites
- Node.js (latest LTS recommended)
- npm package manager

### Installation
```bash
npm install
```

### Environment Configuration
1. Create a `.env.local` file in the root directory
2. Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. The Vite config automatically exposes this as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

### Running the Application
```bash
npm run dev     # Start development server on http://localhost:3000
npm run build   # Build for production
npm run preview # Preview production build
```

## Code Style and Conventions

### TypeScript
- Use TypeScript for all `.tsx` and `.ts` files
- Target: ES2022
- Module: ESNext with bundler resolution
- JSX: react-jsx (automatic runtime)
- Use explicit types for function parameters and return values
- Avoid `any` types when possible

### React
- **Functional components only** with hooks
- Use `React.FC` type for components
- Props interfaces should be explicitly defined
- Use TypeScript interfaces for all component props (suffix with `Props`)

### File Organization
```
/
├── App.tsx                    # Main application component
├── index.tsx                  # Entry point
├── components/                # React components
│   ├── AdjustmentPanel.tsx   # Adjustment presets and UI
│   ├── FilterPanel.tsx       # Filter presets and UI
│   ├── CropPanel.tsx         # Crop controls
│   ├── StartScreen.tsx       # Landing/upload screen
│   ├── Header.tsx            # App header
│   ├── Spinner.tsx           # Loading indicator
│   └── icons.tsx             # SVG icon components
├── services/                  # Service layer
│   └── geminiService.ts      # Gemini AI integration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── index.html                # HTML entry with import maps
```

### Naming Conventions
- **Components**: PascalCase (e.g., `FilterPanel`, `StartScreen`)
- **Files**: Match component name (e.g., `FilterPanel.tsx`)
- **Functions**: camelCase (e.g., `handleApplyFilter`, `generateEditedImage`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase with descriptive names

### Code Headers
All source files should include the Apache 2.0 license header:
```typescript
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
```

### Styling
- Use **Tailwind CSS** utility classes
- Follow existing patterns for consistent visual design
- Common patterns:
  - Buttons: gradient backgrounds, shadow effects, hover/active states
  - Panels: dark backgrounds with backdrop blur and borders
  - Animations: fade-in, scale transforms on interactions
  - Disabled states: opacity reduction, cursor changes

## Architecture Guidelines

### State Management
- Use React `useState` for component-level state
- Use `useCallback` for memoized callbacks
- Use `useRef` for DOM references and mutable values
- State in `App.tsx`:
  - `history`: Array of File objects for undo/redo
  - `historyIndex`: Current position in history
  - `activeTab`: Current editing mode
  - `isLoading`: API request state
  - `editHotspot`: Selected point for localized edits

### Image Processing Flow
1. User uploads image → stored as `File` object
2. User selects editing mode (retouch/filter/adjust/crop)
3. User provides input (prompt, coordinates, crop area)
4. Service layer converts File to base64 and calls Gemini API
5. API returns edited image as base64 data URL
6. Result added to history for undo/redo

### Service Layer (`services/geminiService.ts`)
- **Three main functions**:
  - `generateEditedImage()`: Localized edits with hotspot coordinates
  - `generateFilteredImage()`: Stylistic filters
  - `generateAdjustedImage()`: Global adjustments
- All functions:
  - Take a `File` object as input
  - Return Promise<string> (data URL)
  - Use `fileToPart()` helper to convert File to Gemini format
  - Use `handleApiResponse()` for error handling and response parsing
- Model: `gemini-2.5-flash-image`

### Error Handling
- All API calls wrapped in try/catch
- User-friendly error messages displayed in UI
- Console logging for debugging (keep existing patterns)
- Handle prompt blocking, safety filters, and content generation failures

### Safety and Ethics
The application includes ethical guidelines in AI prompts:
- **Allowed**: Skin tone adjustments (tan, lighter, darker)
- **Forbidden**: Changing race or ethnicity
- Follow existing patterns in `geminiService.ts` when modifying prompts

## Testing and Validation

### Build Validation
Before committing changes:
```bash
npm run build  # Must complete without errors
```

### Manual Testing Checklist
- [ ] Image upload works (drag-drop and file picker)
- [ ] All tabs are functional (retouch, adjust, filters, crop)
- [ ] Undo/redo buttons work correctly
- [ ] Loading states display properly
- [ ] Error messages are user-friendly
- [ ] Responsive design works on different screen sizes

### Common Issues
- **API errors**: Check GEMINI_API_KEY is set in `.env.local`
- **Module errors**: Ensure import maps in `index.html` are correct
- **Type errors**: Run build to catch TypeScript issues

## Dependencies

### Production Dependencies
- `react` & `react-dom`: UI framework
- `@google/genai`: Gemini AI SDK
- `react-image-crop`: Cropping functionality

### Development Dependencies
- `@vitejs/plugin-react`: Vite React plugin
- `typescript`: Type checking and compilation
- `@types/node`: Node.js type definitions
- `vite`: Build tool and dev server

### When to Add Dependencies
- Minimize new dependencies
- Use existing libraries when possible
- For image processing, prefer browser APIs or existing deps
- For UI components, prefer custom Tailwind implementations

## Path Aliases

Use `@/` prefix for imports from root:
```typescript
import Header from '@/components/Header';
import { generateEditedImage } from '@/services/geminiService';
```

## Environment Variables

- `GEMINI_API_KEY`: Set in `.env.local`
- Accessed in code as `process.env.API_KEY` or `process.env.GEMINI_API_KEY`
- Defined in `vite.config.ts` using Vite's `define` option

## Build Output

- Output directory: `dist/`
- Ignored in `.gitignore`
- Contains optimized production bundle
- Deployed to GitHub Pages via workflow

## Additional Notes

- This project uses **import maps** in `index.html` for CDN-based dependencies
- Tailwind CSS is loaded from CDN (not via PostCSS)
- The app is a client-side only application (no backend/server)
- Images are processed client-side and sent to Gemini API
- All image data stays in browser memory (no server storage)

## When Making Changes

1. **Component changes**: Update only the necessary component, maintain existing props interfaces
2. **Service changes**: Maintain function signatures, update prompts carefully to preserve safety guidelines
3. **Styling changes**: Follow existing Tailwind patterns and design system
4. **Type changes**: Update interfaces, avoid breaking changes to component APIs
5. **Dependencies**: Only add if absolutely necessary, prefer built-in or existing solutions

## Deployment

The project deploys to GitHub Pages via GitHub Actions workflow (`.github/workflows/deploy-pages.yml`).
