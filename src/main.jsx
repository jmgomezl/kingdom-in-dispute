// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Wait for Telegram WebApp to be available
const initializeApp = () => {
  // Check if running inside Telegram WebApp
  const isTelegramWebView = window.Telegram?.WebApp;

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App isWebView={isTelegramWebView} />
    </StrictMode>,
  )
}

// If the script is already loaded, initialize immediately
if (window.Telegram?.WebApp) {
  initializeApp();
} else {
  // If not, wait for the script to load
  const script = document.createElement('script');
  script.src = 'https://telegram.org/js/telegram-web-app.js';
  script.async = true;
  script.onload = initializeApp;
  document.head.appendChild(script);
}