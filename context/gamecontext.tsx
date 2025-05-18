import React, { createContext, useContext, ReactNode, useState } from 'react';

interface GameContextType {
  movePlayer: (playerId: string, diceValue: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const movePlayer = (playerId: string, diceValue: number) => {
    
    console.log(`Moving ${playerId} by ${diceValue} spaces`);
    
  };

  return (
    <GameContext.Provider value={{ movePlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
