import React, { useState } from 'react';
import { usePokemon } from '../../pokemon/context/PokemonContext';
import { useNotifications } from '../../../shared/context/NotificationContext';

export const BattleSimulator = () => {
  const { pokemon } = usePokemon();
  const { addNotification } = useNotifications();
  const [player1Pokemon, setPlayer1Pokemon] = useState(null);
  const [player2Pokemon, setPlayer2Pokemon] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [battleInProgress, setBattleInProgress] = useState(false);

  const simulateBattle = () => {
    if (!player1Pokemon || !player2Pokemon) {
      addNotification({
        type: 'warning',
        message: 'Please select Pokemon for both players!'
      });
      return;
    }

    setBattleInProgress(true);
    setBattleLog([]);

    const log = [`Battle between ${player1Pokemon.name} and ${player2Pokemon.name} begins!`];
    
    // Simple battle simulation
    const pokemon1HP = 100;
    const pokemon2HP = 100;
    let currentHP1 = pokemon1HP;
    let currentHP2 = pokemon2HP;
    let turn = 1;

    const battleInterval = setInterval(() => {
      if (currentHP1 <= 0 || currentHP2 <= 0) {
        const winner = currentHP1 > 0 ? player1Pokemon : player2Pokemon;
        log.push(`${winner.name} wins the battle! 🏆`);
        setBattleLog([...log]);
        setBattleInProgress(false);
        clearInterval(battleInterval);
        
        addNotification({
          type: 'success',
          title: 'Battle Complete!',
          message: `${winner.name} emerged victorious!`
        });
        return;
      }

      const attacker = turn % 2 === 1 ? player1Pokemon : player2Pokemon;
      const defender = turn % 2 === 1 ? player2Pokemon : player1Pokemon;
      const damage = Math.floor(Math.random() * 30) + 10;

      if (turn % 2 === 1) {
        currentHP2 -= damage;
        currentHP2 = Math.max(0, currentHP2);
      } else {
        currentHP1 -= damage;
        currentHP1 = Math.max(0, currentHP1);
      }

      log.push(`${attacker.name} attacks ${defender.name} for ${damage} damage!`);
      setBattleLog([...log]);
      turn++;
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Battle Simulator ⚔️</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Player 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Player 1</h2>
          {player1Pokemon ? (
            <div className="text-center">
              <img
                src={player1Pokemon.image}
                alt={player1Pokemon.name}
                className="w-32 h-32 mx-auto object-contain mb-2"
              />
              <h3 className="text-lg font-medium capitalize">{player1Pokemon.name}</h3>
              <button
                onClick={() => setPlayer1Pokemon(null)}
                className="mt-2 text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Select Pokemon</span>
              </div>
              <select
                onChange={(e) => {
                  const selected = pokemon.find(p => p.id === parseInt(e.target.value));
                  setPlayer1Pokemon(selected);
                }}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Choose Pokemon...</option>
                {pokemon.slice(0, 20).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* VS */}
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-red-600">VS</div>
        </div>

        {/* Player 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Player 2</h2>
          {player2Pokemon ? (
            <div className="text-center">
              <img
                src={player2Pokemon.image}
                alt={player2Pokemon.name}
                className="w-32 h-32 mx-auto object-contain mb-2"
              />
              <h3 className="text-lg> font-medium capitalize">{player2Pokemon.name}</h3>
              <button
                onClick={() => setPlayer2Pokemon(null)}
                className="mt-2 text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Select Pokemon</span>
              </div>
              <select
                onChange={(e) => {
                  const selected = pokemon.find(p => p.id === parseInt(e.target.value));
                  setPlayer2Pokemon(selected);
                }}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Choose Pokemon...</option>
                {pokemon.slice(0, 20).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>        
      </div>              
      <div className="text-center mb-8">
        <button
          onClick={simulateBattle}
          disabled={!player1Pokemon || !player2Pokemon || battleInProgress}
          className={`px-6 py-3 bg-red-600 text-white rounded-lg font-semibold transition-colors ${
            battleInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
        >
          {battleInProgress ? 'Battle in Progress...' : 'Start Battle'}
        </button>
      </div>

      {battleLog.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Battle Log</h2>
          <ul className="list-disc list-inside">
            {battleLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};  