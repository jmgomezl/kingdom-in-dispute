import { useState } from 'react';

// Configuration Constants
const WORLDS = [
  { id: 'amazon', name: 'Amazon', color: 'bg-green-700', icon: '🌳', power: { name: "Nature's Blessing", description: 'Heal 10 HP when below 30% health', icon: '💚' }},
  { id: 'darkland', name: 'Dark Lands', color: 'bg-stone-800', icon: '🌑', power: { name: 'Shadow Strike', description: '20% chance to deal double damage', icon: '🌒' }},
  { id: 'alaska', name: 'Alaska', color: 'bg-slate-100', icon: '❄️', power: { name: 'Frost Shield', description: '25% chance to reduce incoming damage by half', icon: '🛡️' }},
  { id: 'europe', name: 'Europe', color: 'bg-blue-600', icon: '🏰', power: { name: 'Royal Might', description: 'Gain 5 extra energy each turn', icon: '👑' }},
  { id: 'africa', name: 'Africa', color: 'bg-yellow-500', icon: '🦁', power: { name: 'Desert Fury', description: 'Critical hits deal 2x damage instead of 1.5x', icon: '🔥' }},
];

const INITIAL_PLAYER_STATE = [
  {
    name: "Player 1",
    faction: "House Saksa",
    avatar: "Black Fox",
    health: 100,
    energy: 50,
    stats: { attacksMade: 0, damageDealt: 0, criticalHits: 0 },
  },
  {
    name: "Player 2",
    faction: "House Khilnuk",
    avatar: "Golden Vulture",
    health: 100,
    energy: 50,
    stats: { attacksMade: 0, damageDealt: 0, criticalHits: 0 },
  },
];

export default function App() {
  const [gameState, setGameState] = useState('worldSelection');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [players, setPlayers] = useState([...INITIAL_PLAYER_STATE]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [combatLog, setCombatLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [battleRound, setBattleRound] = useState(1);
  const [powerActivations, setPowerActivations] = useState({ player1: 0, player2: 0 });

  const getInitialState = () =>
    INITIAL_PLAYER_STATE.map((player) => ({
      ...player,
      stats: { ...player.stats },
    }));

  const resetGame = () => {
    setPlayers(getInitialState());
    setCurrentTurn(0);
    setCombatLog([]);
    setWinner(null);
    setBattleRound(1);
    setPowerActivations({ player1: 0, player2: 0 });
  };

  const returnToWorldSelection = () => {
    resetGame();
    setSelectedWorld(null);
    setGameState('worldSelection');
  };

  const applyWorldPower = (attacker, defender, damage, isCritical) => {
    if (!selectedWorld) return damage;

    switch (selectedWorld.id) {
      case 'amazon':
        if (attacker.health < 30) {
          attacker.health = Math.min(100, attacker.health + 10);
          setCombatLog((prev) => [`💚 Nature's Blessing heals ${attacker.name}!`, ...prev]);
        }
        break;
      case 'darkland':
        if (Math.random() < 0.2) {
          damage *= 2;
          setCombatLog((prev) => [`🌒 Shadow Strike doubles damage!`, ...prev]);
        }
        break;
      case 'alaska':
        if (Math.random() < 0.25) {
          damage = Math.floor(damage / 2);
          setCombatLog((prev) => [`🛡️ Frost Shield reduces damage!`, ...prev]);
        }
        break;
      case 'europe':
        attacker.energy = Math.min(50, attacker.energy + 5);
        setCombatLog((prev) => [`👑 Royal Might grants extra energy!`, ...prev]);
        break;
      case 'africa':
        if (isCritical) {
          damage *= 2;
          setCombatLog((prev) => [`🔥 Desert Fury enhances critical hit!`, ...prev]);
        }
        break;
    }

    return damage;
  };

  const attack = () => {
    const newPlayers = [...players];
    const attacker = newPlayers[currentTurn];
    const defender = newPlayers[(currentTurn + 1) % 2];

    if (attacker.energy < 10) {
      setCombatLog((prev) => [`${attacker.name} has insufficient energy to attack!`, ...prev]);
      attacker.energy = Math.min(50, attacker.energy + 15);
      setCurrentTurn((currentTurn + 1) % 2);
      setBattleRound((prev) => prev + 1);
      setPlayers(newPlayers);
      return;
    }

    const baseDamage = Math.floor(Math.random() * 20) + 5;
    const isCritical = Math.random() < 0.2;
    let finalDamage = isCritical ? Math.floor(baseDamage * 1.5) : baseDamage;

    finalDamage = applyWorldPower(attacker, defender, finalDamage, isCritical);

    attacker.stats.attacksMade += 1;
    attacker.stats.damageDealt += finalDamage;
    if (isCritical) attacker.stats.criticalHits += 1;

    defender.health = Math.max(0, defender.health - finalDamage);
    attacker.energy -= 10;

    setCombatLog((prev) => [
      `${attacker.name} deals ${finalDamage} damage to ${defender.name}${isCritical ? ' (CRITICAL!)' : ''}`,
      ...prev,
    ]);

    if (defender.health <= 0) {
      setWinner(attacker);
      setGameState('victory');
    } else {
      setCurrentTurn((currentTurn + 1) % 2);
      setBattleRound((prev) => prev + 1);
    }

    setPlayers(newPlayers);
  };

  const startNewGame = (world) => {
    resetGame();
    setSelectedWorld(world);
    setGameState('playing');
  };

  if (gameState === 'worldSelection') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Kingdom in Dispute</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORLDS.map((world) => (
            <button key={world.id} onClick={() => startNewGame(world)} className={`${world.color} p-4 rounded-lg`}>
              <div className="text-4xl">{world.icon}</div>
              <div className="text-xl font-bold">{world.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2 className="text-4xl font-bold">🏆 {winner.name} Wins!</h2>
        <button onClick={returnToWorldSelection} className="bg-blue-500 p-2 rounded-lg">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl">Battle Round: {battleRound}</h2>
      <button onClick={attack} className="bg-yellow-500 p-2 rounded-lg mt-4">⚔️ Attack</button>
      <div className="mt-4">{combatLog.map((log, index) => <p key={index}>{log}</p>)}</div>
    </div>
  );
}
