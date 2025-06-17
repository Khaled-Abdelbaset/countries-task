# REST Countries Explorer

[![Vue.js](https://img.shields.io/badge/Vue.js-v3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-v3.0-yellow?logo=vue.js&logoColor=white)](https://pinia.vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A responsive web application that displays information about countries using the REST Countries API. Users can search for countries, filter by region, view detailed information about each country, and navigate between neighboring countries.

![App Screenshot](![image](https://github.com/user-attachments/assets/8c030171-4242-464f-ac02-acaa5fbb7a95)

## 🌟 Features

- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Country Search**: Filter countries by name
- **Region Filtering**: Filter countries by continental regions
- **Dark/Light Mode**: Toggle between color themes
- **Detailed Country Pages**: View in-depth information about each country
- **Lazy Loading**: Pagination with "load more" functionality for better performance
- **Accessibility**: Built with accessibility in mind
- **SEO Friendly**: Clean routes and semantic HTML

## 🛠️ Tech Stack

- **Vue 3** with Composition API and setup script
- **TypeScript** for type safety
- **Vue Router** for navigation
- **Pinia** for state management
- **Tailwind CSS** for styling
- **REST Countries API** for data
- **Vite** for development and building

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/countries-task.git
cd countries-task

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

After starting the development server, open your browser and navigate to `http://localhost:5173/` (or the port shown in your terminal).

### Key Features:

- Search for countries using the search input
- Filter countries by region using the dropdown
- Click on a country card to view more details
- Navigate between countries using the border country links
- Toggle between light and dark mode using the theme switcher

## 📋 Available Scripts

```bash
# Compile and hot-reload for development
npm run dev

# Type-check, compile and minify for production
npm run build

# Preview the production build
npm run preview

# Run ESLint to lint files
npm run lint

# Format code with Prettier
npm run format
```

## 🔍 API Reference

This project uses the [REST Countries API](https://restcountries.com/) to fetch country data.

## 🧩 Project Structure

```
countries-task/
├── public/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Vue components
│   │   ├── countries/   # Country-specific components
│   │   └── ui/          # UI components
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # App entry point
├── index.html
└── package.json
```

## 📱 Screenshots

### Desktop View

![Desktop View](./src/assets/screenshot-desktop.png)

### Mobile View

![Mobile View](./src/assets/screenshot-mobile.png)

### Dark Mode

![Dark Mode](./src/assets/screenshot-dark.png)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing the country data
