import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ScoreContextType {
  player1Score: number;
  player2Score: number;
  player3Score: number;
  player4Score: number;
  updateScore: (player: 1 | 2 | 3 | 4, score: number) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [player3Score, setPlayer3Score] = useState<number>(0);
  const [player4Score, setPlayer4Score] = useState<number>(0);

  const updateScore = (player: 1 | 2 | 3 | 4, score: number) => {
    switch (player) {
      case 1:
        setPlayer1Score(score);
        break;
      case 2:
        setPlayer2Score(score);
        break;
      case 3:
        setPlayer3Score(score);
        break;
      case 4:
        setPlayer4Score(score);
        break;
      default:
        console.error('Invalid player number');
    }
  };

  const value = {
    player1Score,
    player2Score,
    player3Score,
    player4Score,
    updateScore,
  };

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};