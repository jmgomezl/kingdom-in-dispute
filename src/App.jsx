import { useState, useEffect } from 'react';

const WORLDS = [
  { id: 'amazon', name: 'Amazon', color: 'bg-green-700', icon: '🌳', power: { name: "Nature's Blessing", description: 'Heal 10 HP when below 30% health', icon: '💚' }},
  { id: 'darkland', name: 'Dark Lands', color: 'bg-stone-800', icon: '🌑', power: { name: 'Shadow Strike', description: '20% chance to deal double damage', icon: '🌒' }},
  { id: 'alaska', name: 'Alaska', color: 'bg-slate-100', icon: '❄️', power: { name: 'Frost Shield', description: '25% chance to reduce incoming damage by half', icon: '🛡️' }},
  { id: 'europe', name: 'Europe', color: 'bg-blue-600', icon: '🏰', power: { name: 'Royal Might', description: 'Gain 5 extra energy each turn', icon: '👑' }},
  { id: 'africa', name: 'Africa', color: 'bg-yellow-500', icon: '🦁', power: { name: 'Desert Fury', description: 'Critical hits deal 2x damage instead of 1.5x', icon: '🔥' }}
];

const getInitialPlayerState = (username = 'Player') => [
  { 
    name: username, 
    faction: "House Saksa", 
    avatar: "Black Fox", 
    health: 100, 
    energy: 50, 
    stats: { attacksMade: 0, damageDealt: 0, criticalHits: 0 }
  },
  { 
    name: "Computer", 
    faction: "House Khilnuk", 
    avatar: "Golden Vulture", 
    health: 100, 
    energy: 50, 
    stats: { attacksMade: 0, damageDealt: 0, criticalHits: 0 }
  }
];

export default function BattleGame({ telegramUsername }) {
  const [gameState, setGameState] = useState('worldSelection');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [players, setPlayers] = useState(() => getInitialPlayerState(telegramUsername));
  const [currentTurn, setCurrentTurn] = useState(0);
  const [combatLog, setCombatLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [battleRound, setBattleRound] = useState(1);
  const [powerActivations, setPowerActivations] = useState({ player1: 0, player2: 0 });

  const resetGame = () => {
    setPlayers(getInitialPlayerState(telegramUsername));
    setCurrentTurn(0);
    setCombatLog([]);
    setWinner(null);
    setBattleRound(1);
    setPowerActivations({ player1: 0, player2: 0 });
  };

  const startNewGame = (world) => {
    resetGame();
    setSelectedWorld(world);
    setGameState('playing');
  };

  const returnToWorldSelection = () => {
    setGameState('worldSelection');
    setSelectedWorld(null);
    resetGame();
  };

  const attack = () => {
    const newPlayers = [...players];
    const attacker = newPlayers[currentTurn];
    const defender = newPlayers[(currentTurn + 1) % 2];

    // Energy recovery phase
    if (attacker.energy < 10) {
      attacker.energy = Math.min(50, attacker.energy + 15);
      setCombatLog(prev => [`⚡ ${attacker.name} recovers energy (+15)!`, ...prev]);
      setCurrentTurn((currentTurn + 1) % 2);
      setBattleRound(prev => prev + 1);
      setPlayers(newPlayers);
      return;
    }

    // Attack phase
    const baseDamage = Math.floor(Math.random() * 20) + 5;
    const isCritical = Math.random() < 0.2;
    let finalDamage = isCritical ? Math.floor(baseDamage * 1.5) : baseDamage;

    // Update stats
    attacker.stats.attacksMade += 1;
    attacker.stats.damageDealt += finalDamage;
    if (isCritical) attacker.stats.criticalHits += 1;

    // Apply damage and energy cost
    defender.health = Math.max(0, defender.health - finalDamage);
    attacker.energy -= 10;

    setCombatLog(prev => [
      `⚔️ ${attacker.name} deals ${finalDamage} damage${isCritical ? ' (CRITICAL!)' : ''}`,
      ...prev
    ]);

    if (defender.health <= 0) {
      setWinner(attacker);
      setGameState('victory');
    } else {
      setCurrentTurn((currentTurn + 1) % 2);
      setBattleRound(prev => prev + 1);
    }

    setPlayers(newPlayers);
  };

  // Computer's turn
  useEffect(() => {
    if (currentTurn === 1 && gameState === 'playing') {
      const timer = setTimeout(attack, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentTurn, gameState]);

  if (gameState === 'worldSelection') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">Kingdom in Dispute</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {WORLDS.map(world => (
            <button 
              key={world.id} 
              onClick={() => startNewGame(world)} 
              className={`${world.color} p-6 rounded-lg hover:opacity-90 transition-all`}
            >
              <div className="text-4xl mb-2">{world.icon}</div>
              <div className="text-xl font-bold mb-2">{world.name}</div>
              <div className="text-sm bg-black/20 rounded p-2">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <span>{world.power.icon}</span>
                  <span className="font-bold">{world.power.name}</span>
                </div>
                <div>{world.power.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center text-white">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">{winner.name} Wins!</h2>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-2">Battle Statistics</h3>
            <div className="text-sm space-y-1">
              <p>Damage Dealt: {winner.stats.damageDealt}</p>
              <p>Critical Hits: {winner.stats.criticalHits}</p>
              <p>Total Rounds: {battleRound}</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => startNewGame(selectedWorld)}
              className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg font-bold hover:bg-yellow-400"
            >
              Rematch
            </button>
            <button
              onClick={returnToWorldSelection}
              className="w-full bg-gray-700 py-2 rounded-lg font-bold hover:bg-gray-600"
            >
              Choose New World
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={returnToWorldSelection}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            🏠 Home
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xl">Round {battleRound}</span>
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg">
              <span>{selectedWorld.power.icon}</span>
              <span className="font-bold">{selectedWorld.power.name}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative mb-6">
          {players.map((player, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${currentTurn === index ? 'ring-2 ring-yellow-400 bg-gray-700' : 'bg-gray-700'}`}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">
                {player.name}
                {index === 0 && <span className="text-sm text-gray-400">(@{telegramUsername})</span>}
                {index === currentTurn && <span className="text-yellow-400">●</span>}
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Health</span>
                    <span>{player.health}/100</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        player.health > 60 ? 'bg-green-500' :
                        player.health > 30 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${player.health}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Energy</span>
                    <span>{player.energy}/50</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(player.energy / 50) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Centered Attack Button */}
          <button
            onClick={attack}
            disabled={currentTurn === 1}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
              w-16 h-16 rounded-full flex items-center justify-center
              ${currentTurn === 0 
                ? 'bg-yellow-500 hover:bg-yellow-400 hover:scale-110' 
                : 'bg-gray-600 opacity-50 cursor-not-allowed'
              } transition-all duration-200`}
          >
            <span className="text-2xl">⚔️</span>
          </button>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 h-32 overflow-y-auto">
          {combatLog.map((log, index) => (
            <div key={index} className="text-sm text-gray-300 mb-1">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}