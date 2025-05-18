import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Player {
  name: string;
  score: number;
  image: any;
}

interface PlayerContextType {
  playerImages: any[];
    setPlayerImages: React.Dispatch<React.SetStateAction<any[]>>;
    currentPlayerName: any;
    setCurrentPlayerName: React.Dispatch<React.SetStateAction<any>>;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPlayerName, setCurrentPlayerName] = useState(null);
  const [playerImages, setPlayerImages] = useState<any[]>([
    require('../assets/User1.png'),
    require('../assets/User2.png'),
    require('../assets/User3.png'),
    require('../assets/User4.png'),
  ]);

  return (
      <PlayerContext.Provider value={{ playerImages, setPlayerImages, currentPlayerName, setCurrentPlayerName }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
