# Kingdom in Dispute - React Game

This is a React-based game called **Kingdom in Dispute**, built with **Vite**, **Tailwind CSS**, and deployed using **GitHub Pages**.

## 🚀 Live Demo
[Check out the live game here!](https://your-username.github.io/your-repository-name)

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Pages](https://pages.github.com/)

## 📝 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Git](https://git-scm.com/)

## 🛠️ Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   This will start the development server. Open your browser and go to:

   ```
   http://localhost:5173
   ```

## 🖌️ Making Changes

1. Make any changes to your React components or styles.
2. Save your changes.
3. Preview your changes in the browser by running:

   ```bash
   npm run dev
   ```

## 💾 Saving Changes

After making changes, save them to your GitHub repository:

```bash
git add .
git commit -m "Update game features and styles"
git push origin main
```

> Replace `main` with `master` if your default branch is `master`.

## 🌐 Deploying to GitHub Pages

1. **Build the Project:**

   ```bash
   npm run build
   ```

   This will generate a `dist` folder with the production-ready build.

2. **Deploy to GitHub Pages:**

   ```bash
   npm run deploy
   ```

   This command uses `gh-pages` to deploy the `dist` folder to the `gh-pages` branch.

3. **Access Your Deployed Site:**

   The website will be live at:

   ```
   https://your-username.github.io/your-repository-name/
   ```

## ⚙️ Configuration

Ensure your `vite.config.js` file is configured correctly for GitHub Pages:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/', // Set this to your GitHub repository name
});
```

## 📝 Tailwind CSS Configuration

Ensure your `tailwind.config.js` has the correct `content` setting:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 🛠️ Useful Commands

- **Start the development server:**

  ```bash
  npm run dev
  ```

- **Build the project:**

  ```bash
  npm run build
  ```

- **Deploy to GitHub Pages:**

  ```bash
  npm run deploy
  ```

## ❓ Troubleshooting

- **Blank Page After Deployment:**
  - Ensure your `base` setting in `vite.config.js` is correct.
  - Clear your browser cache or do a hard refresh (`Ctrl + Shift + R`).

- **Styles Not Applying:**
  - Make sure your `tailwind.config.js` has the correct `content` paths.
  - Ensure you have included Tailwind CSS directives in your CSS file:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Pages](https://pages.github.com/)

