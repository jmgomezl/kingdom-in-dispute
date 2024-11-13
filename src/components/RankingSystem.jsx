import { useState, useEffect } from 'react';

const REWARD_TIERS = {
  top1: { share: 0.15, description: '15% of staking rewards' }, // 15% for #1
  top3: { share: 0.15, description: '5% each for #2-#3' }, // 5% each for next 2
  top10: { share: 0.20, description: '2.86% each for #4-#10' }, // ~2.86% each for next 7
  top50: { share: 0.25, description: '0.625% each for #11-#50' }, // 0.625% each for next 40
  top100: { share: 0.25, description: '0.5% each for #51-#100' }, // 0.5% each for next 50
};

const MOCK_STATS = {
  totalPlayers: 2481,
  totalStaked: 12405, // TON tokens
  estimatedApy: 4.2, // %
  stakingRewards: 520.71, // TON tokens per year
};

export default function RankingSystem({ currentUsername, isOpen, onClose }) {
  const [rankings, setRankings] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [statsData, setStatsData] = useState(MOCK_STATS);

  useEffect(() => {
    // This would be replaced with actual API calls to your backend/blockchain
    const mockRankings = [
      { rank: 1, username: "crypto_warrior", wins: 142, winRate: 78, reward: MOCK_STATS.stakingRewards * 0.15 },
      { rank: 2, username: "ton_master", wins: 136, winRate: 75, reward: MOCK_STATS.stakingRewards * 0.075 },
      { rank: 3, username: "blockchain_king", wins: 130, winRate: 72, reward: MOCK_STATS.stakingRewards * 0.075 },
      // ... more players
    ];
    setRankings(mockRankings);

    // Find current user's rank
    const userRanking = mockRankings.find(r => r.username === currentUsername);
    setUserRank(userRanking);
  }, [currentUsername]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 text-white flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Player Rankings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-700/50">
          <div>
            <div className="text-sm text-gray-400">Total Staked TON</div>
            <div className="text-xl font-bold">{statsData.totalStaked.toLocaleString()} TON</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Estimated APY</div>
            <div className="text-xl font-bold text-green-400">{statsData.estimatedApy}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Players</div>
            <div className="text-xl font-bold">{statsData.totalPlayers.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Annual Rewards</div>
            <div className="text-xl font-bold text-yellow-400">{statsData.stakingRewards.toLocaleString()} TON</div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-bold mb-2">Reward Distribution</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-yellow-400">#1</span>
              <span>{REWARD_TIERS.top1.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">#2-3</span>
              <span>{REWARD_TIERS.top3.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">#4-10</span>
              <span>{REWARD_TIERS.top10.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">#11-50</span>
              <span>{REWARD_TIERS.top50.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">#51-100</span>
              <span>{REWARD_TIERS.top100.description}</span>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 sticky top-0">
              <tr>
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Player</th>
                <th className="p-2 text-right">Wins</th>
                <th className="p-2 text-right">Win Rate</th>
                <th className="p-2 text-right">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {rankings.map((player) => (
                <tr 
                  key={player.rank}
                  className={`${
                    player.username === currentUsername 
                      ? 'bg-yellow-500/10' 
                      : 'hover:bg-gray-700/30'
                  }`}
                >
                  <td className="p-2">#{player.rank}</td>
                  <td className="p-2">{player.username}</td>
                  <td className="p-2 text-right">{player.wins}</td>
                  <td className="p-2 text-right">{player.winRate}%</td>
                  <td className="p-2 text-right">{player.reward.toFixed(2)} TON</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User's Current Rank */}
        {userRank && (
          <div className="p-4 bg-gray-700/50 border-t border-gray-600">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-400">Your Rank:</span>
                <span className="ml-2 font-bold">#{userRank.rank}</span>
              </div>
              <div>
                <span className="text-gray-400">Estimated Reward:</span>
                <span className="ml-2 font-bold text-yellow-400">
                  {userRank.reward.toFixed(2)} TON
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}