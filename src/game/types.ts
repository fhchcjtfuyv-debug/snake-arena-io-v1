export const WORLD_SIZE = 3200;
export const FOOD_LIMIT = 220;
export const BOT_COUNT = 14;
export const PLAYER_SPEED = 190;
export const PLAYER_BOOST_SPEED = 320;
export const PLAYER_TURN_RATE = 2.7;
export const PLAYER_BASE_LENGTH = 18;

export const DEFAULT_SETTINGS = {
  sound: 80,
  music: 60,
  graphics: 'medium',
  sensitivity: 100,
  touchSize: 100,
  language: 'en',
  controls: 'mouse',
};

export type GameSettings = typeof DEFAULT_SETTINGS;
