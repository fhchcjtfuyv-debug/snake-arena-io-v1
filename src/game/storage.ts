export interface Position {
  x: number;
  y: number;
}

export interface FoodItem {
  id: string;
  x: number;
  y: number;
  radius: number;
  value: number;
  rare: boolean;
  hue: number;
}

export interface SnakeState {
  id: string;
  name: string;
  color: number;
  isPlayer: boolean;
  x: number;
  y: number;
  angle: number;
  speed: number;
  direction: Position;
  body: Position[];
  trail: Position[];
  alive: boolean;
  score: number;
  boost: number;
  growth: number;
  kills: number;
}

export interface LeaderEntry {
  name: string;
  score: number;
}

export interface SaveData {
  bestScore: number;
  matches: number;
  playerName: string;
  settings: Record<string, number | string>;
  skin: string;
  unlockedSkins: string[];
  stats: {
    scoreTotal: number;
    gamesPlayed: number;
  };
}
