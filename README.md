# DropBy Website

A modern React website for DropBy - a VR-native discovery network that replaces boring ads with interactive, branded content.

## Features

- **Interactive Particle Background**: Mouse-responsive particle animation in the hero section
- **Smooth Animations**: Scroll-triggered animations using Intersection Observer
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Dark theme with teal/cyan accent colors
- **Interactive Components**: FAQ accordion, mobile menu, smooth scrolling
- **Multi-page Routing**: Separate pages for Players, Partners, and Collaborators

## Tech Stack

- React 18
- Tailwind CSS
- Lucide React Icons
- React Router DOM
- Intersection Observer API
- Canvas API for particle effects
- Material-UI components

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.js                    # Main application component with routing
├── index.js                  # React entry point
├── index.css                 # Global styles and Tailwind imports
├── dblogo.png               # Logo image
├── components/               # Reusable UI components
│   └── ui/                  # UI component library
├── pages/                   # Page components
│   ├── PlayerPage.js        # Players page
│   ├── PartnerPage.js       # Partners page
│   └── CollaboratorPage.js  # Collaborators page
└── hooks/                   # Custom React hooks
```

## Key Components

- **Header**: Fixed navigation with mobile menu
- **Hero**: Full-screen hero with particle background
- **About**: Feature cards for different user types
- **Features**: Detailed feature explanations with images
- **AudienceSections**: Collaborator and Partner specific sections
- **PlayerSection**: Player-focused content with reward UI
- **FAQ**: Expandable FAQ section
- **Footer**: Site footer with links

## Pages

- **Home** (`/`): Main landing page
- **Players** (`/players`): Player-focused content
- **Partners** (`/partners`): Partner information
- **Collaborators** (`/collaborators`): Collaborator resources

The website is now ready to run! 🚀
