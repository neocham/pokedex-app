import React from 'react';

export const PokemonStats = ({ pokemon }) => {
  const stats = [
    { name: 'HP', value: 45 + Math.floor(Math.random() * 55), max: 100 },
    { name: 'Attack', value: 35 + Math.floor(Math.random() * 65), max: 100 },
    { name: 'Defense', value: 30 + Math.floor(Math.random() * 70), max: 100 },
    { name: 'Sp. Attack', value: 40 + Math.floor(Math.random() * 60), max: 100 },
    { name: 'Sp. Defense', value: 35 + Math.floor(Math.random() * 65), max: 100 },
    { name: 'Speed', value: 25 + Math.floor(Math.random() * 75), max: 100 },
  ];

  const total = stats.reduce((sum, stat) => sum + stat.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Base Stats</h3>
      <div className="space-y-3">
        {stats.map(stat => (
          <div key={stat.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{stat.name}</span>
              <span className="text-sm font-bold">{stat.value}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stat.value / stat.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
