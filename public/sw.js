import Phaser from 'phaser';
import './style.css';
import { GameScene, type GameCallbacks } from './game/GameScene';
import { DEFAULT_SETTINGS, type GameSettings } from './game/config';
import { loadSave, recordMatch, saveSave, updateBestScore } from './game/storage';

const menuOverlay = document.getElementById('menuOverlay');
const settingsOverlay = document.getElementById('settingsOverlay');
const hud = document.getElementById('hud');
const leaderboard = document.getElementById('leaderboard');
const gameOverOverlay = document.getElementById('gameOverOverlay');

const playerNameInput = document.getElementById('playerNameInput') as HTMLInputElement;
const bestScoreValue = document.getElementById('bestScoreValue');
const matchCountValue = document.getElementById('matchCountValue');

const hudScore = document.getElementById('hudScore');
const hudSize = document.getElementById('hudSize');
const hudRank = document.getElementById('hudRank');
const hudBoost = document.getElementById('hudBoost');
const leaderboardList = document.getElementById('leaderboardList');
const finalScoreValue = document.getElementById('finalScoreValue');
const finalBestValue = document.getElementById('finalBestValue');
const finalRankValue = document.getElementById('finalRankValue');
const finalTimeValue = document.getElementById('finalTimeValue');
const finalKillsValue = document.getElementById('finalKillsValue');

const soundSetting = document.getElementById('soundSetting') as HTMLInputElement;
const musicSetting = document.getElementById('musicSetting') as HTMLInputElement;
const graphicsSetting = document.getElementById('graphicsSetting') as HTMLSelectElement;
const sensitivitySetting = document.getElementById('sensitivitySetting') as HTMLInputElement;
const touchSizeSetting = document.getElementById('touchSizeSetting') as HTMLInputElement;
const languageSetting = document.getElementById('languageSetting') as HTMLSelectElement;
const controlsSetting = document.getElementById('controlsSetting') as HTMLSelectElement;

const save = loadSave();
playerNameInput.value = save.playerName;

function syncSaveUi() {
  const values = loadSave();
  bestScoreValue!.textContent = String(values.bestScore);
  matchCountValue!.textContent = String(values.matches);
  soundSetting.value = String(values.settings.sound ?? DEFAULT_SETTINGS.sound);
  musicSetting.value = String(values.settings.music ?? DEFAULT_SETTINGS.music);
  graphicsSetting.value = String(values.settings.graphics ?? DEFAULT_SETTINGS.graphics);
  sensitivitySetting.value = String(values.settings.sensitivity ?? DEFAULT_SETTINGS.sensitivity);
  touchSizeSetting.value = String(values.settings.touchSize ?? DEFAULT_SETTINGS.touchSize);
  languageSetting.value = String(values.settings.language ?? DEFAULT_SETTINGS.language);
  controlsSetting.value = String(values.settings.controls ?? DEFAULT_SETTINGS.controls);
}

syncSaveUi();

const callbacks: GameCallbacks = {
  onGameOver: (data) => {
    finalScoreValue!.textContent = String(data.score);
    finalBestValue!.textContent = String(data.best);
    finalRankValue!.textContent = `#${data.rank}`;
    finalTimeValue!.textContent = formatTime(data.time);
    finalKillsValue!.textContent = String(data.kills);
    gameOverOverlay?.classList.remove('hidden');
    hud?.classList.add('hidden');
    leaderboard?.classList.add('hidden');
    updateBestScore(data.score);
    recordMatch();
  },
  onHudUpdate: (score, size, rank, boost) => {
    hudScore!.textContent = String(score);
    hudSize!.textContent = String(size);
    hudRank!.textContent = `#${rank}`;
    hudBoost!.textContent = `${Math.max(0, Math.round(boost))}%`;
  },
  onLeaderboardUpdate: (entries) => {
    leaderboardList!.innerHTML = entries
      .map((entry, index) => `<li>#${index + 1} ${entry.name} — ${entry.score}</li>`)
      .join('');
  },
  onPauseUpdate: (paused) => {
    if (paused) {
      document.body.style.filter = 'saturate(0.7)';
    } else {
      document.body.style.filter = 'none';
    }
  },
};

const phaserGame = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'app',
  backgroundColor: '#071827',
  scene: [new GameScene(callbacks)],
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'app',
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: true,
    powerPreference: 'high-performance',
  },
});

const gameScene = phaserGame.scene.keys.GameScene as GameScene | undefined;

function startOfflineRound(): void {
  const finalName = playerNameInput.value.trim() || 'Player';
  const saveData = loadSave();
  saveData.playerName = finalName;
  saveSave(saveData);

  menuOverlay?.classList.add('hidden');
  settingsOverlay?.classList.add('hidden');
  gameOverOverlay?.classList.add('hidden');
  hud?.classList.remove('hidden');
  leaderboard?.classList.remove('hidden');

  if (gameScene) {
    gameScene.startRound();
  }
}

function openSettings(): void {
  settingsOverlay?.classList.remove('hidden');
}

function closeSettings(): void {
  settingsOverlay?.classList.add('hidden');

  const current = loadSave();
  current.settings.sound = Number(soundSetting.value);
  current.settings.music = Number(musicSetting.value);
  current.settings.graphics = graphicsSetting.value;
  current.settings.sensitivity = Number(sensitivitySetting.value);
  current.settings.touchSize = Number(touchSizeSetting.value);
  current.settings.language = languageSetting.value;
  current.settings.controls = controlsSetting.value;
  current.playerName = playerNameInput.value.trim() || 'Player';
  saveSave(current);
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setMainMenu() {
  menuOverlay?.classList.remove('hidden');
  gameOverOverlay?.classList.add('hidden');
  hud?.classList.add('hidden');
  leaderboard?.classList.add('hidden');
}

const playOfflineBtn = document.getElementById('playOfflineBtn');
const settingsBtn = document.getElementById('settingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const mainMenuBtn = document.getElementById('mainMenuBtn');
const pauseBtn = document.getElementById('pauseBtn');
const playLocalBtn = document.getElementById('playLocalBtn');

playOfflineBtn?.addEventListener('click', startOfflineRound);
playLocalBtn?.addEventListener('click', startOfflineRound);
settingsBtn?.addEventListener('click', openSettings);
closeSettingsBtn?.addEventListener('click', closeSettings);
playAgainBtn?.addEventListener('click', startOfflineRound);
mainMenuBtn?.addEventListener('click', setMainMenu);
pauseBtn?.addEventListener('click', () => {
  if (gameScene) {
    gameScene.togglePause();
  }
});

playerNameInput.addEventListener('change', () => {
  const data = loadSave();
  data.playerName = playerNameInput.value.trim() || 'Player';
  saveSave(data);
});

window.addEventListener('beforeunload', () => {
  const data = loadSave();
  data.playerName = playerNameInput.value.trim() || 'Player';
  saveSave(data);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration is optional.
    });
  });
}

syncSaveUi();
