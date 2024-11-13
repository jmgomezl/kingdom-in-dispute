// App.jsx
import { useState, useEffect } from 'react';
import BattleGame from './components/BattleGame';

const tg = window.Telegram?.WebApp;

function App() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're running inside Telegram
    if (tg) {
      // Initialize Telegram WebApp
      tg.ready();
      tg.enableClosingConfirmation();
      
      // Get user data
      const user = tg.initDataUnsafe?.user;
      if (user?.username) {
        setUsername(user.username);
      } else {
        // Fallback if username is not available
        setUsername('Player');
      }

      // Expand to full height
      tg.expand();

      // Apply Telegram theme
      document.documentElement.className = tg.colorScheme;
    } else {
      // Fallback for development
      setUsername('DevPlayer');
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">Loading game...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900">
      <BattleGame telegramUsername={username} />
    </div>
  );
}

export default App;