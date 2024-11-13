// components/PlayerDashboard.jsx
import { useState, useEffect } from 'react';
import { generatePixelAvatar } from '../utils/pixelAvatar';

// Import WORLDS or define it here
const WORLDS = [
  { id: 'amazon', name: 'Amazon', color: 'bg-green-700', icon: '🌳' },
  { id: 'darkland', name: 'Dark Lands', color: 'bg-stone-800', icon: '🌑' },
  { id: 'alaska', name: 'Alaska', color: 'bg-slate-100', icon: '❄️' },
  { id: 'europe', name: 'Europe', color: 'bg-blue-600', icon: '🏰' },
  { id: 'africa', name: 'Africa', color: 'bg-yellow-500', icon: '🦁' }
];

const MOCK_STATS = {
  totalGames: 158,
  wins: 92,
  losses: 66,
  winStreak: 4,
  bestWinStreak: 8,
  criticalHits: 246,
  damageDealt: 12480,
  energySpent: 1580,
  favoriteWorld: 'darkland',
  rankingPosition: 42,
  totalRewards: 8.5,
  worldStats: {
    amazon: 32,
    darkland: 45,
    alaska: 28,
    europe: 30,
    africa: 23
  }
};

export default function PlayerDashboard({ username, isOpen, onClose }) {
  const [stats, setStats] = useState(MOCK_STATS);
  const [avatarSvg, setAvatarSvg] = useState('');

  useEffect(() => {
    if (username) {
      setAvatarSvg(generatePixelAvatar(username));
    }
  }, [username]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 text-white flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Player Dashboard</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Section */}
          <div className="p-4 border-b border-gray-700 flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-lg overflow-hidden bg-gray-700"
              dangerouslySetInnerHTML={{ __html: avatarSvg }}
            />
            <div>
              <h3 className="text-lg font-bold">{username}</h3>
              <div className="text-sm text-gray-400">Rank #{stats.rankingPosition}</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-yellow-400">
                  {stats.totalRewards.toFixed(2)} TON
                </span>
                <span className="text-xs text-gray-500">earned</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {/* Win/Loss Record */}
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Win/Loss Record</div>
              <div className="text-xl font-bold">
                {stats.wins}/{stats.losses}
              </div>
              <div className="text-xs text-gray-500">
                {((stats.wins / stats.totalGames) * 100).toFixed(1)}% win rate
              </div>
            </div>

            {/* Current Streak */}
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Win Streak</div>
              <div className="text-xl font-bold">{stats.winStreak}</div>
              <div className="text-xs text-gray-500">
                Best: {stats.bestWinStreak}
              </div>
            </div>

            {/* Total Games */}
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="text-sm text-gray-400">Total Games</div>
              <div className="text-xl font-bold">{stats.totalGames}</div>
              <div className="text-xs text-gray-500">
                {(stats.totalGames * 5).toFixed(1)} TON wagered
              </div>
            </div>

            {/* Combat Stats Section */}
            <div className="bg-gray-700/50 rounded-lg p-3 col-span-2 md:col-span-3">
              <h3 className="font-bold mb-2">Combat Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Critical Hits</div>
                  <div className="font-bold">{stats.criticalHits}</div>
                </div>
                <div>
                  <div className="text-gray-400">Damage Dealt</div>
                  <div className="font-bold">{stats.damageDealt}</div>
                </div>
                <div>
                  <div className="text-gray-400">Energy Used</div>
                  <div className="font-bold">{stats.energySpent}</div>
                </div>
              </div>
            </div>

            {/* World Stats */}
            <div className="bg-gray-700/50 rounded-lg p-3 col-span-2 md:col-span-3">
              <h3 className="font-bold mb-2">World Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                {WORLDS.map((world) => (
                  <div 
                    key={world.id} 
                    className={`p-2 rounded ${
                      world.id === stats.favoriteWorld ? 'ring-1 ring-yellow-500' : ''
                    }`}
                  >
                    <div className="text-2xl mb-1">{world.icon}</div>
                    <div className="text-sm font-medium">{world.name}</div>
                    <div className="text-xs text-gray-400">
                      Games: {stats.worldStats[world.id] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}